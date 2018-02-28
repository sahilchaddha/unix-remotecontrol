var powerRouter = require('./Routes/PowerRouter.js')

var routes = [
    {
        url: '/power',
        routerClass: powerRouter // Power -> Shutdown, Restart, Log Out
    }
]

module.exports = routes