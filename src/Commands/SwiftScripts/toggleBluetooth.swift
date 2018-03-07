//
//  main.swift
//  Bluetooth
//
//  Created by Sumit Chudasama on 06/03/2018.
//  Copyright © 2018 Sumit Chudasama. All rights reserved.
//

import Foundation
import IOBluetooth
import Cocoa

var defaultBluetoothDeviceName : String = ""//"ABC's Macbook Pro"

class BluetoothDeviceInquiryDelegate : IOBluetoothDeviceInquiryDelegate {
    func deviceInquiryStarted(_ sender: IOBluetoothDeviceInquiry) {
    }
    func deviceInquiryDeviceFound(_ sender: IOBluetoothDeviceInquiry, device: IOBluetoothDevice) {
        guard let addressString = device.addressString,
            let deviceName = device.name
            else {
                return
        }
        
        if deviceName.range(of:defaultBluetoothDeviceName) != nil {
            
            let device : IOBluetoothDevice = IOBluetoothDevice(addressString: addressString)            
            toogleConnection(device: device)
        }
    }
    
    func deviceInquiryComplete(_ sender: IOBluetoothDeviceInquiry!, error: IOReturn, aborted: Bool) {
        print("No deviced found matching name : " + defaultBluetoothDeviceName)

        if IOBluetoothDevice.pairedDevices().count == 0 {
            print("No Paired Devices")
        } else {
            IOBluetoothDevice.pairedDevices().forEach({(device) in
                guard let device = device as? IOBluetoothDevice,
                    let addressString = device.addressString,
                    let deviceName = device.name
                    else {
                        return
                }
                
                if deviceName.range(of:defaultBluetoothDeviceName) != nil {
                    let device : IOBluetoothDevice = IOBluetoothDevice(addressString: addressString)
                    toogleConnection(device: device)
                }
                print("\(deviceName) => \(addressString)")
            })
        }
        
        exit(-3)
    }
}

func toogleConnection(device: IOBluetoothDevice) {
    if !device.isPaired() {
        print("Not paired to device")
        exit(-2)
    }
    
    if device.isConnected() {
        print("closed connection")
        device.closeConnection()
    }
    else {
        print("opened connection")
        device.openConnection()
    }
    
    exit(0)
}

let bluetoothDeviceInquiryDelegate = BluetoothDeviceInquiryDelegate()
let ibdi = IOBluetoothDeviceInquiry(delegate: bluetoothDeviceInquiryDelegate)

if (CommandLine.arguments.count == 2 || !defaultBluetoothDeviceName.isEmpty) {
    
    if defaultBluetoothDeviceName.isEmpty {
        defaultBluetoothDeviceName = CommandLine.arguments[1].removingPercentEncoding!
    }

    ibdi?.updateNewDeviceNames = true
    let ibdiStart = ibdi?.start()

    if ibdiStart != kIOReturnSuccess {
        print("Please check bluetooth is enabled or not")
        exit(-1)
    }
}
else {
    print("Please provide bluetooth device name.")
    exit(-1)
}

RunLoop.current.run()

