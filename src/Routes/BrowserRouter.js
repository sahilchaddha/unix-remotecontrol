var commandService = require('../Services/CommandService.js')

module.exports.browser_home = function(req, res) {
  res.send('Browser Router')
};

module.exports.browser_googleChromeReset = function(req, res) {
  commandService.execute('browser', 'googleChromeReset', null, function() {})
  res.status(200).send({responseMessage: "Google Chrome Reset"})
};

module.exports.browser_safariClearHistory = function(req, res) {
  commandService.execute('browser', 'safariClearHistory', null, function() {})
  res.status(200).send({responseMessage: "Safari Clear History"})
};
