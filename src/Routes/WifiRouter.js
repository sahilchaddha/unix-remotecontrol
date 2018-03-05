var commandService = require('../Services/CommandService.js')

module.exports.wifi_home = function(req, res) {
  res.send('Wifi Router')
};

module.exports.wifi_on = function(req, res) {
  commandService.execute('wifi', 'on', null, function() {})
  res.status(200).send({responseMessage: "Wifi on"})
};

module.exports.wifi_off = function(req, res) {
  commandService.execute('wifi', 'off', null, function() {})
  res.status(200).send({responseMessage: "Wifi off"})
};

module.exports.wifi_status = function(req, res) {
  commandService.execute('wifi', 'status', null, function(response) {

    if (response['status'] != null && response['status'] == "active") {
      res.status(200).send({responseMessage: "Wifi Status : ON", response: {wifiStatus: true}})
      return
    }

    res.status(200).send({responseMessage: "Wifi Status : OFF", response: {wifiStatus: false}})
  })
};
