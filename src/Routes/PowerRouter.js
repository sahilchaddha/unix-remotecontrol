var router = require('../Services/RouterService').router

// define the home page route => /power
router.get('/', function (req, res) {
  res.send('Power Router')
})

module.exports = router