var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var taskStatus = {
    //open: () => { return 'open'; },
    progress: function () {
        return 'progress';
    },
    success: function () {
        return 'success';
    }
};

var tasks = [
    { _id: '1', section: 'NodeJS', title: 'bower', description: 'bower', action: 'Inspect', date: new Date(), status: taskStatus.success() },
    { _id: '2', section: 'NodeJS', title: 'supervisor', description: 'supervisor', action: 'Inspect', date: new Date(), status: taskStatus.progress() },
    { _id: '3', section: 'NodeJS', title: 'node-inspector', description: 'node-inspector', action: 'Inspect', date: new Date(), status: taskStatus.progress() },
    { _id: '4', section: 'NodeJS', title: 'mongoose', description: 'mongoose', action: 'Inspect', date: new Date(), status: taskStatus.progress() }
];

var APP_DASHBOARD;
(function (APP_DASHBOARD) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector) {
            _super.call(this, $injector);
            this.pageTitle = 'Timeline';
            this.pageDescription = 'all project in one place';
            this.tasks = tasks;

            this.initPage();
        }
        Controller.prototype.initPage = function () {
            var _this = this;
            this.loadTaskList().then(function (result) {
                _this.tasks = result;
            });
        };

        // debug
        Controller.prototype.loadTaskList = function () {
            var def = this.$q.defer();
            def.resolve(tasks);
            return def.promise;
        };

        Controller.prototype.editTask = function (id) {
            var _this = this;
            var modalInstance = this.$modal.open({
                templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
                controller: 'modalEditTask',
                controllerAs: 'modalCtrl',
                resolve: {
                    data: function () {
                        var task = _.find(_this.tasks, function (t) {
                            return t._id === id;
                        });
                        return angular.copy(task);
                    }
                }
            });

            modalInstance.result.then(function (data) {
                var index = null;
                var task = _.find(_this.tasks, function (t, i) {
                    if (t._id === data._id) {
                        index = i;
                        return true;
                    }
                    return false;
                });

                _this.tasks[index] = data;
                // DB update!
            });
        };

        Controller.prototype.addTask = function () {
            var _this = this;
            var modalInstance = this.$modal.open({
                templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
                controller: 'modalEditTask',
                controllerAs: 'modalCtrl',
                resolve: {
                    data: function () {
                        return {
                            status: 'progress',
                            date: new Date()
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                _this.tasks.push(data);
                // DB update!
            });
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(BaseController);

    angular.module('app.modules').controller('dashboardCtrl', Controller);
})(APP_DASHBOARD || (APP_DASHBOARD = {}));
//# sourceMappingURL=dashboard.js.map
