/// <reference path="../nodeTypes/serverTypes.ts" />
var jwt = require('jwt-simple'), crypto = require('crypto'), moment = require('moment');
var AuthFactory = (function () {
    function AuthFactory() {
        this._secret = 'test-app';
    }
    AuthFactory.prototype.decodeToken = function (token) {
        return jwt.decode(token, this._secret);
    };
    AuthFactory.prototype.encodeToken = function (userId, cb) {
        var expires = moment().add('days', 7).valueOf();
        var token = jwt.encode({
            iss: userId,
            exp: expires
        }, this._secret);
        cb(token, expires);
    };
    AuthFactory.prototype.createSalt = function () {
        return crypto.randomBytes(128).toString('base64');
    };
    AuthFactory.prototype.hashPassword = function (salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    };
    return AuthFactory;
})();
module.exports = new AuthFactory();
//# sourceMappingURL=authFactory.js.map