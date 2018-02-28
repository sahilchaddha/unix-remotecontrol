var env = require('../environment.js')

function Logger() { 

}

Logger.prototype.error = function(log, shouldExit = true) {
    console.log(log)
    if (shouldExit) {
        process.exit()
    }
}

Logger.prototype.info = function(log) {
    if (env.logLevel == 'info') {
        console.log(log)
    }
}

Logger.prototype.debug = function(log) {
    if (env.logLevel == 'debug' || env.logLevel == 'info') {
        console.log(log)
    }
}

Logger.prototype.log = function(log) {
    console.log(log)
}

module.exports = new Logger()