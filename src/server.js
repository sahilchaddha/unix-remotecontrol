var routes = require('./routes.js')
var routerService = require('./Services/RouterService.js')
var sessionService = require('./Services/SessionService.js')
var app = require('express')()
var env = require('./environment.js')
var logger = require('./Utilities/logger.js')

//Add Routes to app
routerService.addRoutes(app, routes)

app.listen(env.port, () => logger.log('Remote Control Server Running at localhost:' + env.port + '. \nSession Token = ' + sessionService.sessionToken))