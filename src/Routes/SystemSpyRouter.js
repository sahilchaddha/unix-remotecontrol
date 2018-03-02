var router = require('../Services/RouterService').router
var fs = require('fs')
var path = require('path')
var commandService = require('../Services/CommandService.js')
const homeDir = require('os').homedir();
const screenShotDirectory = 'Screenshots_remotecontrol'
const imagesDirectory = path.join(homeDir, screenShotDirectory)

// define the home page route => /systemSpy
router.get('/', function (req, res) {
  res.send('System Spy')
})

router.post('/screenshot', function (req, res) {

    if (!fs.existsSync(imagesDirectory)){
        fs.mkdirSync(imagesDirectory);
    }

    var imageFilePath = homeDir + '/' + screenShotDirectory + '/' + Date.now().toString() + '.jpg'
    var options = [imageFilePath]

  commandService.execute('spyCommands', 'screenshot', options, function(){
      res.status(200).sendFile(imageFilePath)
  })
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