var powerRouter = require('./Routes/PowerRouter.js')
var systemStatsRouter = require('./Routes/SystemStatsRouter.js')
var browserRouter = require('./Routes/BrowserRouter.js')
var systemSpyRouter = require('./Routes/SystemSpyRouter.js')
var wifiRouter = require('./Routes/WifiRouter.js')
var musicRouter = require('./Routes/MusicRouter.js')
var bluetoothRouter = require('./Routes/BluetoothRouter.js')

var routes = [
    { url: '/power/', routerClass: powerRouter.power_home, type: 'GET' }
    , { url: '/power/shutdown', routerClass: powerRouter.power_shutdown, type: 'POST' }
    , { url: '/power/restart', routerClass: powerRouter.power_restart, type: 'POST' }
    , { url: '/power/halt', routerClass: powerRouter.power_halt, type: 'POST' }
    , { url: '/power/logout', routerClass: powerRouter.power_logout, type: 'POST' }
    , { url: '/power/sleep', routerClass: powerRouter.power_sleep, type: 'POST' }
    , { url: '/power/displaySleep', routerClass: powerRouter.power_displaySleep, type: 'POST' }
    , { url: '/power/cancelShutdown', routerClass: powerRouter.power_cancelShutdown, type: 'POST' }
    , { url: '/power/ping', routerClass: powerRouter.power_ping, type: 'GET' }

    , { url: '/browser/', routerClass: browserRouter.browser_home, type: 'GET' }
    , { url: '/browser/googleChromeReset', routerClass: browserRouter.browser_googleChromeReset, type: 'POST' }
    , { url: '/browser/safariClearHistory', routerClass: browserRouter.browser_safariClearHistory, type: 'POST' }
    
    , { url: '/systemSpy/', routerClass: systemSpyRouter.systemSpy_home, type: 'GET' }
    , { url: '/systemSpy/screenshot', routerClass: systemSpyRouter.systemSpy_screenshot, type: 'POST' }
    , { url: '/systemSpy/webcamCapture', routerClass: systemSpyRouter.systemSpy_webcamCapture, type: 'POST' }
    , { url: '/systemSpy/screenRecord', routerClass: systemSpyRouter.systemSpy_screenRecord, type: 'POST' }
    , { url: '/systemSpy/camRecord', routerClass: systemSpyRouter.systemSpy_camRecord, type: 'POST' }
    , { url: '/systemSpy/alert', routerClass: systemSpyRouter.systemSpy_alert, type: 'POST' }
    , { url: '/systemSpy/isRecording', routerClass: systemSpyRouter.systemSpy_isRecording, type: 'GET' }
    
    , { url: '/systemStats/', routerClass: systemStatsRouter.systemStats_home, type: 'GET' }
    , { url: '/systemStats/battery', routerClass: systemStatsRouter.systemStats_battery, type: 'GET' }
    , { url: '/systemStats/storage', routerClass: systemStatsRouter.systemStats_storage, type: 'GET' }
    , { url: '/systemStats/ram', routerClass: systemStatsRouter.systemStats_ram, type: 'GET' }
    , { url: '/systemStats/cpuLoad', routerClass: systemStatsRouter.systemStats_cpuLoad, type: 'GET' }
    , { url: '/systemStats/temperature', routerClass: systemStatsRouter.systemStats_temperature, type: 'GET' }
    
    , { url: '/bluetooth/status', routerClass: bluetoothRouter.bluetooth_status, type: 'GET' }
    , { url: '/bluetooth/', routerClass: bluetoothRouter.bluetooth_home, type: 'GET' }
    , { url: '/bluetooth/on', routerClass: bluetoothRouter.bluetooth_on, type: 'POST' }
    , { url: '/bluetooth/off', routerClass: bluetoothRouter.bluetooth_off, type: 'POST' }

    , { url: '/wifi/', routerClass: wifiRouter.wifi_home, type: 'GET' }
    , { url: '/wifi/on', routerClass: wifiRouter.wifi_on, type: 'POST' }
    , { url: '/wifi/off', routerClass: wifiRouter.wifi_off, type: 'POST' }
    , { url: '/wifi/status', routerClass: wifiRouter.wifi_status, type: 'GET' }

    , { url: '/music/', routerClass: musicRouter.music_home, type: 'GET' }
    , { url: '/music/youtubePlaylist', routerClass: musicRouter.music_youtubePlaylist, type: 'POST' }
    , { url: '/music/itunesPlaylist', routerClass: musicRouter.music_itunesPlaylist, type: 'POST' }
    , { url: '/music/setVolume', routerClass: musicRouter.music_setVolume, type: 'POST' }
    , { url: '/music/getVolume', routerClass: musicRouter.music_getVolume, type: 'GET' }
    , { url: '/music/mute', routerClass: musicRouter.music_mute, type: 'POST' }
    , { url: '/music/unmute', routerClass: musicRouter.music_unmute, type: 'POST' }
    , { url: '/music/isMuted', routerClass: musicRouter.music_isMuted, type: 'GET' }
]

module.exports = routes