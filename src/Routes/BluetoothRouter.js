var router = require('../Services/RouterService').router
var commandService = require('../Services/CommandService.js')

router.get('/', function (req, res) {
  console.log(req)
  res.send('Bluetooth Router')
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