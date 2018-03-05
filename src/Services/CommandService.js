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

function clean_data(obj) {
    for (var key in obj) {

        // Delete null, undefined, "", " "
        if (obj[key] === null || obj[key] === undefined || obj[key] === "" || obj[key] === " ") {
            delete obj[key];
        }
        // Delete empty object
        // Note : typeof Array is also object
        if (typeof obj[key] === 'object' && Object.keys(obj[key]).length <= 0) {
            delete obj[key];
        }
        // If non empty object call function again
        if(typeof obj[key] === 'object'){
            clean_data(obj[key]);
        }
    }
    return obj;
}

CommandService.prototype.execute = function(commandType, commandKey, params, callback) {
    var executableCommand = commands[commandType][commandKey]
 
    logger.debug('*********\nExecuting Command\nSudo: '+executableCommand.sudo + ' \nCommand Type : ' + commandType
     + '\nCommand Key : ' + commandKey + '\nCommand : ' + executableCommand.command + '\n*********')

    if (params == null) {
        params = []
    }

    var processResult = function(stdout) {  
     
        var lines = stdout.toString().trim().split('\n');
        lines = clean_data(lines)
        var results = new Array();

        lines.forEach(function(line) {
            var parts = line.split(':');

            //If key value is undefined than return
            if (parts[0] == undefined) {
                return
            }

            //If value is undefined than return key name
            if (parts[1] == undefined) {
                parts[1] = parts[0]
            }

            results[parts[0].trim()] = parts[1].trim();
        });

        return results
    };

    var callCallback = function(error, stdOut, stdErr) {
        if (callback != null) {
            if (stdOut != null) {
                callback(processResult(stdOut))
            } else {
                callback(error)
            }
        }
    }

    var commandToExecute = executableCommand.command.concat(params)

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