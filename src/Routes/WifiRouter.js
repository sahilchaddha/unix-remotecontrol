var router = require('../Services/RouterService').router
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

router.get('/status', function (req, res) {
  commandService.execute('wifi', 'status', null, function(response) {
    if (response['\tstatus'] != null && response['\tstatus'] == " active") {
      res.status(200).send({responseMessage: "Wifi off", response: {wifiStatus: true}})
      return
    }

    res.status(200).send({responseMessage: "Wifi off", response: {wifiStatus: false}})
  })
})


module.exports = router