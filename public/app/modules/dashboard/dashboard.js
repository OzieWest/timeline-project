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
            _super.call(this, $injector);
            this.pageTitle = 'Timeline';
            this.pageDescription = 'all project in one place';

            this.taskCollection = this.Restangular.all('544e179dad83406df93f98ec/tasks');

            this.initPage();
        }
        Controller.prototype.initPage = function () {
            // v0/544e179dad83406df93f98ec/tasks/544e38c89738e46847191550
            var _this = this;
            this.taskCollection.getList().then(function (collection) {
                _this.tasks = collection;
                console.log(collection);
            });
        };

        Controller.prototype.editTask = function (id) {
            var _this = this;
            var modalInstance = this.$modal.open({
                templateUrl: GLOBAL.path.modals('editTask/editTask.html'),
                controller: 'modalEditTask',
                controllerAs: 'modalCtrl',
                resolve: {
                    data: function () {
                        var elm = _.find(_this.tasks, function (t) {
                            return t._id === id;
                        });
                        return angular.copy(elm);
                    }
                }
            });

            modalInstance.result.then(function (task) {
                var index = null;
                _.find(_this.tasks, function (t, i) {
                    if (t._id === task._id) {
                        index = i;
                        return true;
                    }
                    return false;
                });

                task.save().then(function (result) {
                    _this.tasks[index] = task;
                    _this.show.success('Update complete!', 'DEBUG');
                });
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
                            _created: new Date()
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                _this.tasks.push(data);

                _this.taskCollection.post(data).then(function (result) {
                    console.log(result);
                });
            });
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(BaseController);

    angular.module('app.modules').controller('dashboardCtrl', Controller);
})(APP_DASHBOARD || (APP_DASHBOARD = {}));
//# sourceMappingURL=dashboard.js.map
