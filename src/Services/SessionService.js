var env = require('../environment.js')

function SessionService() {
    this.sessionToken = env.sessionToken
}

SessionService.prototype.authenticate = function(sessionToken) {
    return (sessionToken == this.sessionToken)
}

module.exports = new SessionService()