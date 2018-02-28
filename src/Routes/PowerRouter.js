var router = require('../Services/RouterService').router
var commandService = require('../Services/CommandService.js')

// Power -> Shutdown, Restart, Log Out

// define the home page route => /power
router.get('/', function (req, res) {
  res.send('Power Router')
})

router.get('/shutdown', function (req, res) {
  var options = []
  if (req.query.time != null) {
    options.push('+'+req.query.time)
  }

  commandService.execute('power', 'shutdown', options, function(){})
  res.status(200).send('Shutting Down')
})

router.get('/restart', function (req, res) {
  var options = []
  if (req.query.time != null) {
    options.push('+'+req.query.time)
  }
  commandService.execute('power', 'restart', options, function() {})
  res.status(200).send('Restarting')
})

router.get('/sleep', function (req, res) {
  commandService.execute('power', 'sleep', null, function() {})
  res.status(200).send('Sleeping')
})

router.get('/displaySleep', function (req, res) {
  commandService.execute('power', 'displaySleep', null, function() {})
  res.status(200).send('Display Sleeping')
})

module.exports = router