var powerCommands = {
    halt: {
        command: ['halt'],
        sudo: true
    },
    shutdown: {
        command: ['shutdown', '-h'],
        sudo: true
    },
    restart: {
        command: ['shutdown', '-r'],
        sudo: true
    }, 
    sleep: {
        command: ['pmset', 'sleepnow'],
        sudo: false
    },
    displaySleep: {
        command: ['pmset', 'displaysleepnow'],
        sudo: false
    },
    logout: {
        command: ['osascript', 'src/Commands/AppleScripts/logout.scpt'],
        sudo: false
    },
    killShutdown: {
        command: ['killall', 'shutdown'],
        sudo: true
    }
}

var browserCommands = {
    googleChromeReset : {
        command: ['osascript', 'src/Commands/AppleScripts/browser_googlechrome_reset.scpt'],
        sudo: false
    },
    safariClearHistory : {
        command: ['osascript', 'src/Commands/AppleScripts/browser_safari_clearHistory.scpt'],
        sudo: false
    }
}

var wifiCommands = {
    on : {
        command : ['networksetup', '-setairportpower en0 on'],
        sudo: false
    },
    off : {
        command : ['networksetup', '-setairportpower en0 off'],
        sudo: false
    },
    status : {
        command : ['ifconfig', 'en0'],
        sudo: false
    }
}

var spyCommands = {
    screenshot: {
        command: ['screencapture', '-x'],
        sudo: false
    },
    resetiSightCamera: {
        command: ['killall', 'VDCAssistant'],
        sudo: true
    }
}

module.exports = {
    power: powerCommands,
    browser: browserCommands,
    spyCommands: spyCommands,
    wifi: wifiCommands
}