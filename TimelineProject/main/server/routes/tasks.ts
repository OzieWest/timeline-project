var TaskScheme = require('mongoose').model('Task');

/* Get All Task */
module.exports.list = (req, res) => {
	if (!req.userId) return res.status(401).end();

	TaskScheme.find({ userId: req.userId }, (error, tasks) => {
		if (error) {
			console.log(error);
			return res.status(400).send(error);
		}

		tasks = tasks.sort((a, b) => {
			return <any>(new Date(b._created)) - <any>(new Date(a._created));
		});

		res.send(tasks);
	});
};

/* Get Task */
module.exports.get = (req, res) => {
	if (!req.userId) return res.status(401).end();

	var id = req.params.taskid;

	TaskScheme.findOne({ userId: req.userId, _id: id }, (error, task) => {
		if (error) {
			console.log(error);
			return res.status(400).send(error);
		}
		res.send(task);
	});
};

/* New Task */
module.exports.create = (req, res) => {
	if (!req.userId) return res.status(401).end();

	var newTask = req.body;
	newTask._created = new Date();
	newTask._updated = new Date();
	newTask.userId = req.userId;

	TaskScheme.create(newTask, (error, task) => {
		if (error) {
			console.log(error);
			return res.status(400).send(error);
		}
		res.send(task);
	});
};

/* Update Task */
module.exports.update = (req, res) => {
	if (!req.userId) return res.status(401).end();

	var id = req.params.id;

	var oldTask = req.body;
	oldTask._updated = new Date();
	oldTask.userId = req.userId;

	TaskScheme.update({ userId: req.userId, _id: id }, oldTask, (error, count, row) => {
		if (error) {
			console.log(error);
			return res.status(400).send(error);
		}
		res.send(row);
	});
};

/* Delete Task */
module.exports.delete = (req, res) => {
	if (!req.userId) return res.status(401).end();

	var id = req.params.id;

	TaskScheme.remove({ userId: req.userId, _id: id }, (error) => {
		if (error) {
			console.log(error);
			return res.status(400).send(error);
		}
		res.send('success');
	});
};