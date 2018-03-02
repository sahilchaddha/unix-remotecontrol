var env = require('../environment.js')
var logger = require('../Utilities/logger.js')
var sudo = require('sudo-js');
var exec = require('child_process').exec;
var commands = require('../Commands/commands.js')
var logger = require('../Utilities/logger.js')

function CommandService() { 
    sudo.setPassword(env.pass)
    checkSudoPassword()
}

function checkSudoPassword() {
    sudo.check(function(valid) {
        if (!valid) {
            logger.error('Invalid Sudo Password. Check environment.js . Some commands wont work properly. Please provide correct sudo password', false)
        }
    })
}

CommandService.prototype.execute = function(commandType, commandKey, params, callback) {
    var executableCommand = commands[commandType][commandKey]
 
    logger.debug('*********\nExecuting Command\nSudo: '+executableCommand.sudo + ' \nCommand Type : ' + commandType
     + '\nCommand Key : ' + commandKey + '\nCommand : ' + executableCommand.command + '\n*********')

    if (params == null) {
        params = []
    }

    var commandToExecute = executableCommand.command.concat(params)

    if (executableCommand.sudo) {
        sudo.exec(commandToExecute, function(err, pid, result) {
            logger.info(result)
            if (err) {
                callback(false)
                return
            }
            callback(true)
        });
    } else {
        //Run Shell without sudo
        exec(commandToExecute.join(' '), function(error, stdOut, stdErr) {
            logger.info(stdOut)
            logger.info(stdErr)
            if (error) {
                callback(false)
                return
            }
            callback(true)
        })
    }
}

module.exports = new CommandService()