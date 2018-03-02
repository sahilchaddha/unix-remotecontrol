var router = require('../Services/RouterService').router
var commandService = require('../Services/CommandService.js')

router.get('/', function (req, res) {
  res.send('Browser Router')
})

router.get('/googleChromeReset', function (req, res) {
  commandService.execute('browser', 'googleChromeReset', null, function() {})
  res.status(200).send({responseMessage: "Google Chrome Reset"})
})

module.exports = router