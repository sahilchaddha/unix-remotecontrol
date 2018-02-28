var uuidv1 = require('uuid/v1')

function SessionService() {
    this.sessionToken = uuidv1()
}

SessionService.prototype.authenticate = function(sessionToken) {
    return (sessionToken == this.sessionToken)
}

module.exports = new SessionService()