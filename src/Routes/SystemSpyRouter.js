var fs = require('fs')
var path = require('path')
var commandService = require('../Services/CommandService.js')
var imagesnapjs = require('imagesnapjs');


const homeDir = require('os').homedir();
const screenShotDirectory = 'Screenshots_remotecontrol'
const imagesDirectory = path.join(homeDir, screenShotDirectory)

module.exports.systemSpy_home = function(req, res) {
  res.send('System Spy')
};

module.exports.systemSpy_screenshot = function(req, res) {
    if (!fs.existsSync(imagesDirectory)){
        fs.mkdirSync(imagesDirectory);
    }

    var imageFilePath = homeDir + '/' + screenShotDirectory + '/' + Date.now().toString() + '.jpg'
    var options = [imageFilePath]

  commandService.execute('spyCommands', 'screenshot', options, function(){
      res.status(200).sendFile(imageFilePath)
  })
};

module.exports.systemSpy_webcamCapture = function(req, res) {
    var imageFilePath = homeDir + '/' + screenShotDirectory + '/' + Date.now().toString() + '.jpg'

    imagesnapjs.capture(imageFilePath, { cliflags: '-w 2'}, function(err) {
        res.status(200).sendFile(imageFilePath)
      });
};

module.exports.systemSpy_screenRecord = function(req, res) {
  res.send('System Spy screenRecord')
};

module.exports.systemSpy_camRecord = function(req, res) {
  res.send('System Spy camRecord')
};

module.exports.systemSpy_alert = function(req, res) {
  res.send('System Spy alert')
};

module.exports.systemSpy_isRecording = function(req, res) {
  res.send('System Spy isRecording')
};
