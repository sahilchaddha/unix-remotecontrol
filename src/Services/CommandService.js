var env = require('../environment.js')
var logger = require('../Utilities/logger.js')
var sudo = require('sudo-js');

function CommandService() { 
    sudo.setPassword(env.pass)
    checkSudoPassword()
}

function checkSudoPassword() {
    sudo.check(function(valid) {
        if (!valid) {
            logger.error('Invalid Sudo Password. Check environment.js')
        }
    })
}

module.exports = new CommandService()