var jwt = require('jwt-simple'), moment = require('moment');

module.exports = {
    'secret': 'test-app',
    'decodeToken': function (token) {
        return jwt.decode(token, this.secret);
    },
    'encodeToken': function (userId, cb) {
        var expires = moment().add('days', 7).valueOf();
        var token = jwt.encode({
            iss: userId,
            exp: expires
        }, this.secret);

        cb(token, expires);
    }
};
//# sourceMappingURL=tokenFactory.js.map
