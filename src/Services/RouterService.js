var express = require('express')
var sessionService = require('./SessionService.js')
var bluetoothRouter = require('../Routes/BluetoothRouter.js')

function RouterService() { 
    this.routes = []
    this.router = express.Router()
    initSessionManager.call(this)
}

//Private Method
function initSessionManager() {
    this.router.use(function authenticateSessionToken (req, res, next) { 
        
        if (req.headers['token'] == null) {
            res.status(400).send({responseMessage: "Authentication Failed: token Header Required.", errorCode: 00})
            return
        }

        if (!sessionService.authenticate(req.headers['token'])) {
            // Authentication Failed
            res.status(400).send({responseMessage: "Error: Authentication Failed", errorCode: 01})
            return
        }

        // Continue Routing
        next()
      })
}

//Public Method
RouterService.prototype.addRoutes = function(app, routes) {
    this.routes = routes

    // Adding Routes
    for (var i=0; i < this.routes.length; i++) {
        var route = this.routes[i]
        
        console.log(route.url)

        if (route.type == "GET") {
            app.get(route.url, route.routerClass)
        } else if (route.type == "POST") {
            app.post(route.url, route.routerClass)
        }
    }
}

module.exports = new RouterService()