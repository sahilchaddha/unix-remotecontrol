var commandService = require('../Services/CommandService.js')

module.exports.bluetooth_status = function(req, res) {
    commandService.execute('bluetooth', 'status', null, function(response) {

    if (Object.values(response)[0] == 1) {
      res.status(200).send({responseMessage: "Bluetooth Status : ON", response: {bluetoothStatus: true}})
      return
    }

    res.status(200).send({responseMessage: "Bluetooth Status : OFF", response: {bluetoothStatus: false}})
  })
};

module.exports.bluetooth_home = function(req, res) {
  res.send('Bluetooth Router')
};

module.exports.bluetooth_on = function(req, res) {
  commandService.execute('bluetooth', 'on', null, function() {})
  res.status(200).send({responseMessage: "Bluetooth on"})
};

module.exports.bluetooth_off = function(req, res) {
  commandService.execute('bluetooth', 'off', null, function() {})
  res.status(200).send({responseMessage: "Bluetooth off"})
};
