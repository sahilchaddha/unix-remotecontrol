var router = require('express').Router()
var commandService = require('../Services/CommandService.js')

router.get('/', function (req, res) {
  res.send('Wifi Router')
})

router.post('/on', function (req, res) {
  commandService.execute('wifi', 'on', null, function() {})
  res.status(200).send({responseMessage: "Wifi on"})
})

router.post('/off', function (req, res) {
  commandService.execute('wifi', 'off', null, function() {})
  res.status(200).send({responseMessage: "Wifi off"})
})

router.post('/connect', function (req, res) {
  if (req.body.name != null && req.body.password != null) {
    commandService.execute('wifi', 'connect', [req.body.name, req.body.password], function(data) {
      var responseMessage = "Wifi Connected Successfully" 

      if (data[0]) {
        responseMessage = data[0]
      }

      res.status(200).send({responseMessage: responseMessage})
    })
  } else {
    res.status(400).send({responseMessage: "Please provide valid wifi data"})
  }
})

router.get('/status', function (req, res) {
  commandService.execute('wifi', 'status', null, function(response) {
    if (response['\tstatus'] != null && response['\tstatus'] == " active") {
      res.status(200).send({responseMessage: "Wifi Status : ON", response: {wifiStatus: true}})
      return
    }

    res.status(200).send({responseMessage: "Wifi Status : OFF", response: {wifiStatus: false}})
  })
})


module.exports = router