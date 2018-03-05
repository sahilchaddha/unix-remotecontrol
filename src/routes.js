var powerRouter = require('./Routes/PowerRouter.js')
var systemStatsRouter = require('./Routes/SystemStatsRouter.js')
var browserRouter = require('./Routes/BrowserRouter.js')
var systemSpyRouter = require('./Routes/SystemSpyRouter.js')
var wifiRouter = require('./Routes/WifiRouter.js')
var bluetoothRouter = require('./Routes/BluetoothRouter.js')

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
    },
    {
        url: '/wifi',
        routerClass: wifiRouter
    },
    {
        url: '/bluetooth',
        routerClass: bluetoothRouter
    }
]

module.exports = routes