const si = require('systeminformation');

module.exports.systemStats_home = function(req, res) {
  res.send('System Statistics')
};

module.exports.systemStats_temperature = function(req, res) {
    si.cpuTemperature(function(data) {
        res.status(200).send({responseMessage: "CPU Temperature", resonse: data})
    })
};

module.exports.systemStats_cpuLoad = function(req, res) {
    si.currentLoad(function(data) {
        res.status(200).send({responseMessage: "CPU Stats", resonse: data})
    })
};

module.exports.systemStats_ram = function(req, res) {
    si.mem(function(data) {
        res.status(200).send({responseMessage: "Ram Stats", resonse: data})
    })
};

module.exports.systemStats_storage = function(req, res) {
    si.fsSize(function(data) {
        res.status(200).send({responseMessage: "Storage Stats", resonse: data})
    })
};

module.exports.systemStats_battery = function(req, res) {
    si.battery(function(data) {
        res.status(200).send({responseMessage: "Battery Stats", resonse: data})
    })
};
