var router = require('../Services/RouterService').router

// define the home page route => /systemSpy
router.get('/', function (req, res) {
  res.send('System Spy')
})

router.post('/screenshot', function (req, res) {
    
})

router.post('/screenRecord', function (req, res) {
    
})

router.post('/camRecord', function (req, res) {
    
})

router.post('/alert', function (req, res) {
    
})

router.get('/isRecording', function (req, res) {
    
})


module.exports = router