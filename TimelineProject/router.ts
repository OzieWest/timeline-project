declare var module;

/* Mongo */
var mongoose = require('mongoose'),
	crypto = require('crypto');

var createSalt = (): string => {
	return crypto.randomBytes(128).toString('base64');
};

var hashPasswrod = (salt: string, pwd: string): string => {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}

mongoose.connect('mongodb://localhost/timeline');

interface IBaseModel {
	_id: string;
	_created: string;
	_update: string;
}

interface IUser extends IBaseModel {
	username: string;
	password: string;
	salt: string;
	role: string;
}

var Users = mongoose.model('User', {
	username: { type: String, index: { unique: true } },
	password: String,
	salt: String,
	role: String,
	_created: Date,
	_updated: Date,
});

var Tasks = mongoose.model('Task', {
	userId: String,
	section: String,
	title: String,
	description: String,
	action: String,
	status: String,
	_created: Date,
	_updated: Date,
});

var API_PATH = '/api/v1';


/* Auth --------------------------------------------------------------*/
var authRoute = (router) => {
	router.post(API_PATH + '/auth', (req, res) => {
		var data = req.body;

		if (data && data.username && data.password) {
			Users.findOne({ username: data.username }, (error, user: IUser) => {
				if (error) {
					return res.send(401);
				}

				if (!user) {
					return res.send(401);
				}

				var hash = hashPasswrod(user.salt, data.password);

				if (user.password !== hash) {
					return res.send(401);
				}

				res.send(user);
			});
		}
		else
			res.status(400).send('Bad request');
	});
};


/* Users --------------------------------------------------------------*/
var userRoute = (router) => {
	router.get(API_PATH + '/users', (req, res) => {
		Users.find({}, (error, users) => {
			if (error) {
				return res.send(400);
			}

			if (!users.length) {
				var pass = 'soramusoka';
				var us = 'soramusoka@gmail.com';
				var salt = createSalt();
				var hash = hashPasswrod(salt, pass);

				var newUser = {
					username: us,
					password: hash,
					salt: salt
				};

				Users.create(newUser, (err, user) => {
					if (error) {
						return res.send(400);
					}
					users.push(user);
					res.json(users);
				});
			}
		});
	});
};

/* Tasks --------------------------------------------------------------*/
module.exports = (app) => {

	authRoute(app);

	userRoute(app);

	app.get(API_PATH + '/:userid', (req, res) => {
		var id = req.params.userid;

		Users.findOne({ _id: id }, (error, user) => {
			if (error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}
			res.send(user);
		});
	});

	app.get(API_PATH + '/:userid/tasks', (req, res) => {
		var id = req.params.userid;

		Users.findOne({ _id: id }, (error, user) => {
			if (error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}

			Tasks.find({ userId: user._id }, (error, tasks) => {
				if (error) {
					res.status(400).send(error);
					console.log(error);
					return;
				}

				//tasks = tasks.sort((a, b) => {
				//	return <any>(new Date(b._created)) - <any>(new Date(a._created));
				//});

				res.send(tasks);
			});
		});
	});

	app.get(API_PATH + '/:userid/tasks/:taskid', (req, res) => {
		var userId = req.params.userid;
		var taskId = req.params.taskid;

		Users.findOne({ _id: userId }, (error, user) => {
			if (error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}

			Tasks.findOne({ userId: user._id, _id: taskId }, (error, tasks) => {
				if (error) {
					res.status(400).send(error);
					console.log(error);
					return;
				}
				res.send(tasks);
			});
		});
	});

	app.post(API_PATH + '/:userid/tasks', (req, res) => {
		var userId = req.params.userid;

		// config
		var newTask = req.body;
		newTask._created = new Date();
		newTask._updated = new Date();
		newTask.userId = userId;

		// db
		Users.findOne({ _id: userId }, (error, user) => {
			if (error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}
			Tasks.create(newTask, (err, task) => {
				if (error) {
					res.status(400).send(error);
					console.log(error);
					return;
				}
				res.send(task);
			});
		});
	});

	app.put(API_PATH + '/:userid/tasks/:taskid', (req, res) => {
		var userId = req.params.userid;
		var taskId = req.params.taskid;

		// config
		var oldTask = req.body;
		oldTask._updated = new Date();
		oldTask.userId = userId;

		// db
		Users.findOne({ _id: userId }, (error, user) => {
			if (error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}
			Tasks.update({ userId: user._id, _id: taskId }, oldTask, (err, count, row) => {
				if (error) {
					res.status(400).send(error);
					console.log(error);
					return;
				}
				res.send(row);
			});
		});
	});

	app.delete(API_PATH + '/:userid/tasks/:taskid', (req, res) => {
		var userId = req.params.userid;
		var taskId = req.params.taskid;

		Users.findOne({ _id: userId }, (error, user) => {
			if (error) {
				res.status(400).send(error);
				console.log(error);
				return;
			}
			Tasks.remove({ userId: user._id, _id: taskId }, (err) => {
				if (error) {
					res.status(400).send(error);
					console.log(error);
					return;
				}
				res.send('success');
			});
		});
	});
}