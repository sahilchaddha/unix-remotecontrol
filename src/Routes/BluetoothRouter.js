var router = require('express').Router()
var commandService = require('../Services/CommandService.js')

router.get('/', function (req, res) {
  res.send('Bluetooth Router')
})

router.post('/on', function (req, res) {
  commandService.execute('bluetooth', 'on', null, function() {})
  res.status(200).send({responseMessage: "Bluetooth on"})
})

router.post('/off', function (req, res) {
  commandService.execute('bluetooth', 'off', null, function() {})
  res.status(200).send({responseMessage: "Bluetooth off"})
})

router.get('/status', function (req, res) {
    commandService.execute('bluetooth', 'status', null, function(response) {

    if (Object.values(response)[0] == 1) {
      res.status(200).send({responseMessage: "Bluetooth Status : ON", response: {bluetoothStatus: true}})
      return
    }

    res.status(200).send({responseMessage: "Bluetooth Status : OFF", response: {bluetoothStatus: false}})
  })
})

router.post('/showPairingAlert', function (req, res) {
  if (req.body.deviceName != null) {
      commandService.execute('bluetooth', 'showPairingAlert', [req.body.deviceName], function(data, error, stdErr) {
        var responseMessage = "Pairing alert presented successfully." 

        if (error) {
          res.status(404).send({responseMessage: "No devices found." })
        } else {
          res.status(200).send({responseMessage: "Pairing alert presented successfully." })
        }
      })
  } else {
    res.status(400).send({responseMessage: "Please provide valid bluetooth device name"})
  }
})

router.post('/toggle', function (req, res) {
  if (req.body.deviceName != null) {
      commandService.execute('bluetooth', 'toggle', [req.body.deviceName], function(data, error, stdErr) {
        if (error) {
          res.status(404).send({responseMessage: "If failed than please check following scenarios:\
            - Please check bluetooth is enabled or not\
            - Please device is paired or not.\
            - If Paired please check device is discovarable or not" })
        } else {
          res.status(200).send({responseMessage: "Connection toggled successfully." })
        }
    })
  } else {
    res.status(400).send({responseMessage: "Please provide valid bluetooth device name"})
  }
})

module.exports = router