var powerRouter = require('./Routes/PowerRouter.js')
var systemStatsRouter = require('./Routes/SystemStatsRouter.js')
var browserRouter = require('./Routes/BrowserRouter.js')
var systemSpyRouter = require('./Routes/SystemSpyRouter.js')

var routes = [
    {
        url: '/power',
        routerClass: powerRouter
    },
    {
        url: '/systemStats',
        routerClass: systemStatsRouter
    },
    { 
    	url: '/browser',
    	routerClass: browserRouter
    },
    {
        url: '/systemSpy',
    	routerClass: systemSpyRouter
    }
]

module.exports = routes