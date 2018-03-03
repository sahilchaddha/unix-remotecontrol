var router = require('../Services/RouterService').router
var commandService = require('../Services/CommandService.js')

router.get('/', function (req, res) {
  res.send('Browser Router')
})

router.post('/googleChromeReset', function (req, res) {
  commandService.execute('browser', 'googleChromeReset', null, function() {})
  res.status(200).send({responseMessage: "Google Chrome Reset"})
})

router.post('/safariClearHistory', function (req, res) {
  commandService.execute('browser', 'safariClearHistory', null, function() {})
  res.status(200).send({responseMessage: "Safari Clear History"})
})


module.exports = router