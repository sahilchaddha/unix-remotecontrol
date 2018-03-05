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

module.exports = router