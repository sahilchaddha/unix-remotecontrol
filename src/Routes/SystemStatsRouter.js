var router = require('../Services/RouterService').router

// define the home page route => /systemStats
router.get('/', function (req, res) {
  res.send('System Statistics')
})

router.get('/temperature', function (req, res) {
  res.status(200).send({responseMessage: "Shutting Down"})
})

router.get('/cpu', function (req, res) {
    res.status(200).send({responseMessage: "Shutting Down"})
})

router.get('/ram', function (req, res) {
    res.status(200).send({responseMessage: "Shutting Down"})
})

router.get('/storage', function (req, res) {
    res.status(200).send({responseMessage: "Shutting Down"})
})

router.get('/cpu', function (req, res) {
    res.status(200).send({responseMessage: "Shutting Down"})
})

router.get('/battery', function (req, res) {
    res.status(200).send({responseMessage: "Shutting Down"})
})


module.exports = router