/// <reference path="../nodeTypes/serverTypes.ts" />

var jwt = require('jwt-simple'),
	crypto = require('crypto'),
	moment = require('moment');

interface ITokenModel {
	iss: string;
	exp: number;
}

class AuthFactory {
	_secret = 'test-app';

	decodeToken(token): ITokenModel {
		return jwt.decode(token, this._secret);
	}

	encodeToken(userId: string, cb): void {
		var expires = moment().add('days', 7).valueOf();
		var token = jwt.encode({
			iss: userId,
			exp: expires
		}, this._secret);

		cb(token, expires);
	}

	createSalt(): string {
		return crypto.randomBytes(128).toString('base64');
	}

	hashPassword(salt: string, pwd: string): string {
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(pwd).digest('hex');
	}
}

module.exports = new AuthFactory();