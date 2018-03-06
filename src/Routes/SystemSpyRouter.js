var router = require('express').Router()
var fs = require('fs')
var path = require('path')
var commandService = require('../Services/CommandService.js')
var imagesnapjs = require('imagesnapjs');


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

router.post('/webcamCapture', function (req, res) {
    var imageFilePath = homeDir + '/' + screenShotDirectory + '/' + Date.now().toString() + '.jpg'
    var retryCount = 0
    var getCameraImage = function() {
        retryCount++
        imagesnapjs.capture(imageFilePath, { cliflags: '-w 2'}, function(err) {
            if (err != null && retryCount < 3) {
                commandService.execute('spyCommands', 'resetiSightCamera', null, function() {
                    commandService.execute('spyCommands', 'resetCameraAssistant', null, function() {
                        getCameraImage()
                    })    
                })
            } else {
                respondWithImage()
            }
          });
    }
    
    var respondWithImage = function() {
        res.status(200).sendFile(imageFilePath)
    }

    getCameraImage()

})

router.post('/alert', function (req, res) {
    var options = []
    if (req.query.message != null) {
      options.push(""+req.query.message)
    } else {
      options.push('Alert')
    }

    commandService.execute('spyCommands', 'alert', options, function(){
        res.status(200).send({responseMessage: "Alert Displayed"})
    })
})

router.post('/notify', function (req, res) {
    var options = []
    if (req.query.message != null) {
      options.push(""+req.query.message)
    } else {
      options.push('Alert')
    }

    if (req.query.title != null) {
        options.push(""+req.query.title)
      } else {
        options.push('Notification')
      }

    commandService.execute('spyCommands', 'notify', options, function(){
        res.status(200).send({responseMessage: "Notification Displayed"})
    })
})

router.post('/screenRecord', function (req, res) {
    
})

router.post('/camRecord', function (req, res) {
    
})

router.get('/isRecording', function (req, res) {
    
})


module.exports = router