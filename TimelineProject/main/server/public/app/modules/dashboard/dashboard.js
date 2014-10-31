var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var APP_DASHBOARD;
(function (APP_DASHBOARD) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector) {
            var _this = this;
            _super.call(this, $injector);
            this.pageTitle = 'Dashboard';
            this.pageDescription = 'all project in one place';
            this.state = 'list';

            this.loadProfile(function () {
                _this.isPageReady = true;

                _this.taskRepository = _this.Restangular.all('tasks');

                _this.initPage();
            });
        }
        Controller.prototype.initPage = function () {
            var _this = this;
            this.taskRepository.getList().then(function (collection) {
                _this.taskList = collection;
                _this.isPageBusy = false;
            }, function (error) {
                return _this.onError(error);
            });
        };

        Controller.prototype.switchState = function (state, task) {
            this.state = state;

            if (state === 'list') {
                this.task = null;
            } else if (state === 'update') {
                this.task = task;
            } else if (state === 'create') {
                this.task = {
                    _created: '',
                    _updated: '',
                    title: '',
                    description: '',
                    section: '',
                    status: 'progress',
                    relations: [],
                    userId: this.Context.user._id
                };
            } else {
                this.show.error('Error');
            }
        };

        Controller.prototype.chain = function (task) {
            var elm = _.find(this.task.relations, function (t) {
                return t === task._id;
            });
            if (!elm) {
                this.task.relations.push(task._id);
                task.relations.push(this.task._id);
            }
        };

        Controller.prototype.setStatus = function (status, task) {
            var _this = this;
            task.status = status;
            task.save().then(function (result) {
                _this.show.success('Success');
            }, function (error) {
                return _this.onError(error);
            });
        };

        Controller.prototype.updateTask = function () {
            var _this = this;
            this.task.save().then(function (result) {
                var index = -1;
                _.each(_this.taskList, function (t, ind) {
                    if (t._id === _this.task._id)
                        index = ind;
                });

                if (index !== -1) {
                    _this.taskList[index] = _this.task;
                    _this.task = null;
                    _this.state = 'list';
                    _this.show.success('Success');
                }
            }, function (error) {
                return _this.onError(error);
            });
        };

        Controller.prototype.createTask = function () {
            var _this = this;
            this.taskRepository.post(this.task).then(function (data) {
                _this.taskList.splice(0, 0, data);
                _this.task = null;
                _this.state = 'list';
                _this.show.success('Success');
            }, function (error) {
                return _this.onError(error);
            });
        };

        Controller.prototype.deleteTask = function () {
            var _this = this;
            this.task.remove().then(function (result) {
                var index = -1;
                _.each(_this.taskList, function (t, ind) {
                    if (t._id === _this.task._id)
                        index = ind;
                });

                if (index !== -1) {
                    _this.taskList.splice(index, 1);
                    _this.task = null;
                    _this.state = 'list';
                    _this.show.success('Success');
                }
            }, function (error) {
                _this.onError(error);
            });
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(PageController);

    angular.module('app.modules').controller('dashboardCtrl', Controller);
})(APP_DASHBOARD || (APP_DASHBOARD = {}));
//# sourceMappingURL=dashboard.js.map
