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
    
    if (executableCommand == null) {
        logger.info("Command Not Found : " + commandType + " : " + commandKey)
        return
    }

    var commandToExecute = executableCommand.command.concat(params)
 
    logger.debug('*********\nExecuting Command\nSudo: '+executableCommand.sudo + ' \nCommand Type : ' + commandType
     + '\nCommand Key : ' + commandKey + '\nCommand : ' + commandToExecute + '\n*********')

    if (params == null) {
        params = []
    }

    var processResult = function(stdout) {  
        var lines = stdout.toString().split('\n');
        var results = new Array();
        lines.forEach(function(line) {
            if (line.indexOf(":") !== -1) {
                var parts = line.split(':');
                results[parts[0]] = parts[1];
            } else {
                results.push(line)
            }            
        });

        return results
    };

    var callCallback = function(error, stdOut, stdErr) {
        logger.error(error, false)
        logger.info(stdOut)
        if (callback != null) {
            callback(processResult(stdOut), error, stdErr)
        }
    }

    if (executableCommand.sudo) {
        sudo.exec(commandToExecute, function(err, pid, result) {
            callCallback(error, stdOut, stdErr)
        });
    } else {
        //Run Shell without sudo
        exec(commandToExecute.join(' '), function(error, stdOut, stdErr) {
            callCallback(error, stdOut, stdErr)
        })
    }
}

module.exports = new CommandService()