var router = require('../Services/RouterService').router
var commandService = require('../Services/CommandService.js')

// define the home page route => /power
router.get('/', function (req, res) {
  res.send('Power Router')
})

router.get('/shutdown', function (req, res) {
  var options = []
  if (req.query.time != null) {
    options.push('+'+req.query.time)
  } else {
    options.push('now')
  }

  commandService.execute('power', 'shutdown', options, function(){})
  res.status(200).send({responseMessage: "Shutting Down"})
})

router.get('/restart', function (req, res) {
  var options = []
  if (req.query.time != null) {
    options.push('+'+req.query.time)
  } else {
    options.push('now')
  }
  commandService.execute('power', 'restart', options, function() {})
  res.status(200).send({responseMessage: "Restarting"})
})

router.get('/halt', function (req, res) {
  commandService.execute('power', 'halt', null, function() {})
  res.status(200).send({responseMessage: "System Halt"})
})

router.get('/logout', function (req, res) {
  commandService.execute('power', 'logout', null, function() {})
  res.status(200).send({responseMessage: "Logging out in 60 secs"})
})

router.get('/sleep', function (req, res) {
  commandService.execute('power', 'sleep', null, function() {})
  res.status(200).send({responseMessage: "Sleeping"})
})

router.get('/displaySleep', function (req, res) {
  commandService.execute('power', 'displaySleep', null, function() {})
  res.status(200).send({responseMessage: "Display Sleep"})
})

router.get('/ping', function (req, res) {
  res.status(200).send({responseMessage: "Pong"})
})

module.exports = router