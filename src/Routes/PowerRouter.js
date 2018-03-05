var commandService = require('../Services/CommandService.js')

module.exports.power_home = function(req, res) {
  res.send('Power Router')
};

module.exports.power_shutdown = function(req, res) {
  var options = []
  if (req.query.time != null) {
    options.push('+'+req.query.time)
  } else {
    options.push('now')
  }

  commandService.execute('power', 'shutdown', options, function(){})
  res.status(200).send({responseMessage: "Shutting Down"})
};

module.exports.power_restart = function(req, res) {
  var options = []
  if (req.query.time != null) {
    options.push('+'+req.query.time)
  } else {
    options.push('now')
  }
  commandService.execute('power', 'restart', options, function() {})
  res.status(200).send({responseMessage: "Restarting"})
};

module.exports.power_halt = function(req, res) {
  commandService.execute('power', 'halt', null, function() {})
  res.status(200).send({responseMessage: "System Halt"})
};

module.exports.power_logout = function(req, res) {
  commandService.execute('power', 'logout', null, function() {})
  res.status(200).send({responseMessage: "Logging out in 60 secs"})
};

module.exports.power_sleep = function(req, res) {
  commandService.execute('power', 'sleep', null, function() {})
  res.status(200).send({responseMessage: "Sleeping"})
};

module.exports.power_displaySleep = function(req, res) {
  commandService.execute('power', 'displaySleep', null, function() {})
  res.status(200).send({responseMessage: "Display Sleep"})
};

module.exports.power_cancelShutdown = function(req, res) {
  commandService.execute('power', 'killShutdown', null, function() {})
  res.status(200).send({responseMessage: "Shutdown/Restart Cancelled"})
};

module.exports.power_ping = function(req, res) {
  res.status(200).send({responseMessage: "Pong"})
};
