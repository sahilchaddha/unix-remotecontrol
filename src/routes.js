var powerRouter = require('./Routes/PowerRouter.js')
var systemStatsRouter = require('./Routes/SystemStatsRouter.js')

var routes = [
    {
        url: '/power',
        routerClass: powerRouter
    },
    {
        url: '/systemStats',
        routerClass: systemStatsRouter
    }
]

module.exports = routes