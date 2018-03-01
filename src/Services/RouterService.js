var express = require('express')
var sessionService = require('./SessionService.js')

function RouterService() { 
    this.routes = []
    this.router = express.Router()
    initSessionManager.call(this)
}

//Private Method
function initSessionManager() {
    this.router.use(function authenticateSessionToken (req, res, next) { 
        
        if (req.headers['token'] == null) {
            res.send('Authentication Failed: token Header Required.')
            return
        }

        if (!sessionService.authenticate(req.headers['token'])) {
            // Authentication Failed
            res.send('Error: Authentication Failed')
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
        app.use(route.url, route.routerClass)
    }
}

module.exports = new RouterService()