declare var module;
declare var require;

var jwt = require('jwt-simple'),
	crypto = require('crypto'),
	moment = require('moment');

interface ITokenModel {
	iss: string;
	exp: number;
}

module.exports = {
	'secret': 'test-app',
	'decodeToken': function (token): ITokenModel {
		return jwt.decode(token, this.secret);
	},
	'encodeToken': function (userId: string, cb) {
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
	'hashPasswrod': function (salt: string, pwd: string) {
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(pwd).digest('hex');
	}
};