var commandService = require('../Services/CommandService.js')
var env = require('../environment.js')
const youtubeUrl = 'https://www.youtube.com/watch?v='

module.exports.music_home = function(req, res) {
  res.send('Music Router')
};

module.exports.music_youtubePlaylist = function(req, res) {
    var options = []
    if (env.youtubePlaylistUrl != null) {
        options.push(youtubeUrl + env.youtubePlaylistUrl)
      } else {
        res.status(400).send({responseMessage: "Youtube Playlist Name missing in environment.js"})
        return
    }

    commandService.execute('application', 'open', options, function() {
        res.status(200).send({responseMessage: "Youtube Playlist Started"})
    })
};

module.exports.music_itunesPlaylist = function(req, res) {
    var options = []
    if (env.itunesPlaylist != null) {
        options.push(env.itunesPlaylist)
    } else {
        res.status(400).send({responseMessage: "iTunes Playlist Name missing in environment.js"})
        return
    }
    commandService.execute('music', 'itunesPlaylist', options, function() {
        res.status(200).send({responseMessage: "iTunes Playlist Started"})
    })
};

module.exports.music_setVolume = function(req, res) {
   var options = []
   if (req.query.volume != null) {
        options.push(req.query.volume)
   } else {
        res.status(400).send({responseMessage: "Volume Query Parameter Missing"})
        return
    }
    commandService.execute('music', 'setVolume', options, function() {
        res.status(200).send({responseMessage: "Volume Changed to " + req.query.volume})
    })
};

module.exports.music_getVolume = function(req, res) {
    commandService.execute('music', 'getVolume', null, function(data) {
        res.status(200).send({responseMessage: "Volume Status", response: {outputVolume: Object.values(data)[0]}})
    })
};

module.exports.music_mute = function(req, res) {
    commandService.execute('music', 'mute', null, function() {
      res.status(200).send({responseMessage: "Muted"})
    })
};

module.exports.music_unmute = function(req, res) {
     commandService.execute('music', 'unmute', null, function() {
        res.status(200).send({responseMessage: "UnMuted"})
     })
};

module.exports.music_isMuted = function(req, res) {
    commandService.execute('music', 'isMute', null, function(data) {
        res.status(200).send({responseMessage: "Mute Status", response: {outputMuted: Object.values(data)[0]}})
    })
};
