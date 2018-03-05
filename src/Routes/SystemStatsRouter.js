var router = require('express').Router()
const si = require('systeminformation');

// define the home page route => /systemStats
router.get('/', function (req, res) {
  res.send('System Statistics')
})

router.get('/temperature', function (req, res) {
    si.cpuTemperature(function(data) {
        res.status(200).send({responseMessage: "CPU Temperature", resonse: data})
    })
})

router.get('/cpuLoad', function (req, res) {
    si.currentLoad(function(data) {
        res.status(200).send({responseMessage: "CPU Stats", resonse: data})
    })
})

router.get('/ram', function (req, res) {
    si.mem(function(data) {
        res.status(200).send({responseMessage: "Ram Stats", resonse: data})
    })
})

router.get('/storage', function (req, res) {
    si.fsSize(function(data) {
        res.status(200).send({responseMessage: "Storage Stats", resonse: data})
    })
})

router.get('/battery', function (req, res) {
    si.battery(function(data) {
        res.status(200).send({responseMessage: "Battery Stats", resonse: data})
    })
})


module.exports = router