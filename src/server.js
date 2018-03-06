#!/usr/bin/env node

var routes = require('./routes.js')
var routerService = require('./Services/RouterService.js')
var sessionService = require('./Services/SessionService.js')
var commandService = require('./Services/CommandService.js')
var app = require('express')()
var env = require('./environment.js')
var logger = require('./Utilities/logger.js')

if (process.argv[2] == "--config") {
    logger.log("Opening Config ...")
    commandService.execute('application', 'config', null, function() {
        process.exit()
    })
    return
}

logger.info("Starting Server ...")
//Add Routes to app
routerService.addRoutes(app, routes)

app.listen(env.port, () => logger.log('Remote Control Server Running at localhost:' + env.port + '. \nSession Token = ' + sessionService.sessionToken))