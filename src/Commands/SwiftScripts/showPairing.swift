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

var defaultBluetoothDeviceAddress : String = ""//"12-34-56-78-90-ab"
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
            let pair : IOBluetoothDevicePair = IOBluetoothDevicePair.init(device: device)
            pair.replyUserConfirmation(true)
            let deviceReturn : IOReturn = pair.start()
            
            if deviceReturn == kIOReturnSuccess {
                print("Pairing alert presented successfully.")
                exit(0)
            } else {
                print("Please try again.")
                exit(-2)
            }
        }
    }
    
    func deviceInquiryComplete(_ sender: IOBluetoothDeviceInquiry!, error: IOReturn, aborted: Bool) {
        print("No deviced found matching name : " + defaultBluetoothDeviceName)
        exit(-3)
    }
}

let bluetoothDeviceInquiryDelegate = BluetoothDeviceInquiryDelegate()
let ibdi = IOBluetoothDeviceInquiry(delegate: bluetoothDeviceInquiryDelegate)

if (CommandLine.arguments.count == 2 || !defaultBluetoothDeviceAddress.isEmpty) {
    
    defaultBluetoothDeviceName = CommandLine.arguments[1].removingPercentEncoding!
    
    ibdi?.updateNewDeviceNames = true
    ibdi?.start()
}
else {
    print("Please provide bluetooth device name.")
    exit(-1)
}

RunLoop.current.run()


