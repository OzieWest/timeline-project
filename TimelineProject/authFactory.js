var jwt = require('jwt-simple'), crypto = require('crypto'), moment = require('moment');

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
    },
    'createSalt': function () {
        return crypto.randomBytes(128).toString('base64');
    },
    'hashPasswrod': function (salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
};
//# sourceMappingURL=authFactory.js.map
