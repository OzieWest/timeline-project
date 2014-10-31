var authHelper = require('./utilities/authFactory');
var mongoScheme = require('./utilities/mongoScheme');
var UserScheme = mongoScheme.Users;
var TaskScheme = mongoScheme.Tasks;

var API_PATH = '/api/v1';

/* Auth --------------------------------------------------------------*/
module.exports = function (app) {
    /* Get All Task */
    app.get(API_PATH + '/tasks', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        TaskScheme.find({ userId: req.userId }, function (error, tasks) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }

            tasks = tasks.sort(function (a, b) {
                return (new Date(b._created)) - (new Date(a._created));
            });

            res.send(tasks);
        });
    });

    /* Get Task */
    app.get(API_PATH + '/tasks/:taskid', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var taskId = req.params.taskid;

        TaskScheme.findOne({ userId: req.userId, _id: taskId }, function (error, task) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send(task);
        });
    });

    /* New Task */
    app.post(API_PATH + '/tasks', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var newTask = req.body;
        newTask._created = new Date();
        newTask._updated = new Date();
        newTask.userId = req.userId;

        TaskScheme.create(newTask, function (error, task) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send(task);
        });
    });

    /* Update Task */
    app.put(API_PATH + '/tasks/:taskid', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var taskId = req.params.taskid;

        var oldTask = req.body;
        oldTask._updated = new Date();
        oldTask.userId = req.userId;

        TaskScheme.update({ userId: req.userId, _id: taskId }, oldTask, function (error, count, row) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send(row);
        });
    });

    /* Delete Task */
    app.delete(API_PATH + '/tasks/:taskid', function (req, res) {
        if (!req.userId)
            return res.status(401).end();

        var taskId = req.params.taskid;

        TaskScheme.remove({ userId: req.userId, _id: taskId }, function (error) {
            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            res.send('success');
        });
    });
};
//# sourceMappingURL=router.js.map
