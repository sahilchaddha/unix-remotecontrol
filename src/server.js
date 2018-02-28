var routes = require('./routes.js')
var routerService = require('./Services/RouterService.js')
var sessionService = require('./Services/SessionService.js')
var express = require('express')

const port = 3000
const app = express()

//Add Routes to app
routerService.addRoutes(app, routes)

app.listen(port, () => console.log('Mac Remote Control Server Running at localhost:' + port + ' . \n Session Token = ' + sessionService.sessionToken))