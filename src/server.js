#!/usr/bin/env node

var routes = require('./routes.js')
var routerService = require('./Services/RouterService.js')
var sessionService = require('./Services/SessionService.js')
var commandService = require('./Services/CommandService.js')
var mylocalip = require('my-local-ip')
var app = require('express')()
var env = require('./environment.js')
var logger = require('./Utilities/logger.js')

if (process.argv[2] == "--config") {
    logger.log("Opening Config ...")
    var configLocation = __dirname + "/environment.js"
    logger.log("Configuration File Location : " + configLocation)
    commandService.execute('application', 'open', [configLocation], function() {
        process.exit()
    })
    return
}

logger.info("Starting Server ...")
//Add Routes to app
routerService.addRoutes(app, routes)

app.listen(env.port, () => logger.log('Remote Control Server Running at ' + mylocalip() + ':' + env.port + '. \nSession Token = ' + sessionService.sessionToken))