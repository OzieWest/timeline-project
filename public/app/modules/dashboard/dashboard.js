/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />
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
            this.loadProfile(function () {
                _this.taskRepository = _this.Restangular.all('tasks');
                _this.initPage();
            });
        }
        Controller.prototype.initPage = function () {
            var _this = this;
            this.newTask = this.clearTask();
            this.taskRepository.getList().then(function (collection) {
                _this.taskList = collection;
                _.each(_this.taskList, function (e) {
                    e.expand = false;
                });
                _this.isPageBusy = false;
            }, function (error) { return _this.onError(error); });
        };
        Controller.prototype.clearTask = function () {
            return {
                expand: false,
                message: '',
                status: 'progress'
            };
        };
        Controller.prototype.setStatus = function (status, task) {
            var _this = this;
            task.status = status;
            task.save().then(function (result) {
                _this.show.success('Updated', 'Success');
            }, function (error) { return _this.onError(error); });
        };
        Controller.prototype.expandTask = function (task) {
            task.expand = !task.expand;
            if (task.expand) {
                if (this.openedTask && this.openedTask._id !== task._id && this.openedTask.expand) {
                    this.openedTask.expand = false;
                }
                this.openedTask = task;
            }
        };
        Controller.prototype.updateTask = function (task) {
            var _this = this;
            task.save().then(function (result) {
                _this.show.success('Updated', 'Success');
                task.expand = false;
            }, function (error) { return _this.onError(error); });
        };
        Controller.prototype.createTask = function () {
            var _this = this;
            this.taskRepository.post(this.newTask).then(function (data) {
                _this.taskList.splice(0, 0, data);
                _this.newTask = _this.clearTask();
                _this.show.success('Created', 'Success');
            }, function (error) { return _this.onError(error); });
        };
        Controller.prototype.deleteTask = function (task) {
            var _this = this;
            task.remove().then(function (result) {
                var index = -1;
                _.each(_this.taskList, function (t, ind) {
                    if (t._id === task._id)
                        index = ind;
                });
                if (index !== -1) {
                    _this.taskList.splice(index, 1);
                    task = null;
                    _this.show.success('Deleted', 'Success');
                }
            }, function (error) { return _this.onError(error); });
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(PageController);
    angular.module('app.dashboard', []).controller('dashboardCtrl', Controller);
})(APP_DASHBOARD || (APP_DASHBOARD = {}));
//# sourceMappingURL=dashboard.js.map