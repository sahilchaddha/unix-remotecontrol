//
//  main.swift
//  Recorder
//
//  Created by Sumit Chudasama on 07/03/2018.
//  Copyright © 2018 Sumit Chudasama. All rights reserved.
//

import Foundation
import AVFoundation
import CoreMediaIO

var cameraSession: AVCaptureSession = {
    let s = AVCaptureSession()
    if (s.canSetSessionPreset(AVCaptureSession.Preset.low)) {
        s.sessionPreset = AVCaptureSession.Preset.low
    } else {
        print("session error")
        exit(-1)
    }
    return s
}()

let videoSettings = [AVVideoCodecKey: AVVideoCodecType.h264,
                     AVVideoWidthKey: NSNumber(value: 750),
                     AVVideoHeightKey: NSNumber(value: 1334)] as [String : Any]

let devices = AVCaptureDevice.devices(for: AVMediaType.video)
let _fileOutput = AVCaptureMovieFileOutput()

var httpService: HLSService = HLSService(
    domain: "local", type: HTTPService.type, name: "", port: HTTPService.defaultPort
)
var httpStream: HTTPStream = HTTPStream()

let cameras: [Any]! = AVCaptureDevice.devices(for: AVMediaType.video)
for camera in cameras {
    if let camera: AVCaptureDevice = camera as? AVCaptureDevice, camera.localizedName == "FaceTime HD Camera" {
        httpStream.attachCamera(AVCaptureDevice(uniqueID: camera.uniqueID))
        break
    }
}

let audios: [Any]! = AVCaptureDevice.devices(for: AVMediaType.audio)
for audio in audios {
    if let audio: AVCaptureDevice = audio as? AVCaptureDevice, audio.localizedName == "Built-in Microphone" {
        httpStream.attachAudio(AVCaptureDevice(uniqueID: audio.uniqueID))
        break
    }
}

print("http://localhost:8080/camRecord/playlist.m3u8")

if devices.count != 0 {
    
    let input = try AVCaptureDeviceInput.init(device: devices[0])
    
    if cameraSession.canAddInput(input) {
        cameraSession.addInput(input)
    } else {
        print("no input")
        exit(-2)
    }
    
    if cameraSession.canAddOutput(_fileOutput) {
        cameraSession.addOutput(_fileOutput)
        _fileOutput.setOutputSettings(videoSettings, for: _fileOutput.connections[0])
    } else {
        print("no output")
        exit(-3)
    }
    
    cameraSession.startRunning()
}

class Service {
    @objc func stopService() {
        httpService.removeHTTPStream(httpStream)
        httpService.stopRunning()
        httpStream.publish(nil)
        print("Service Stopped")
    }

    func startService() {
        httpStream.publish("camRecord")
        httpService.addHTTPStream(httpStream)
        httpService.startRunning()
        print("Service Started")
    }
}

let service = Service()

if (CommandLine.arguments.count >= 2) {
    
    if CommandLine.arguments[1] == "start" {
        service.startService()
    }
    
    if CommandLine.arguments.count >= 3 {
        let minute = (CommandLine.arguments[2] as NSString).floatValue
        let date = Date().addingTimeInterval(TimeInterval( minute * 60.0 ))
        RunLoop.current.run(until: date)
        RunLoop.current.perform(#selector(service.stopService), with: nil, afterDelay: TimeInterval( minute * 60.0 ))
    } else {
        RunLoop.current.run()
    }
}
else {
    print("please provide valid arguments")
    exit(0)
}
