var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var APP_TASK;
(function (APP_TASK) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector) {
            var _this = this;
            _super.call(this, $injector);
            this.action = 'update';

            this.loadProfile(function () {
                _this.pageDescription = 'Configurate your task!';
                _this.pageTitle = 'Task settings';

                _this.isPageReady = true;

                _this.taskCollection = _this.Restangular.all('tasks');

                var id = _this.$routeParams.id;
                if (id === 'create') {
                    _this.action = 'create';
                    _this.task = {
                        _created: '',
                        _updated: '',
                        title: '',
                        description: '',
                        section: '',
                        status: 'progress',
                        tasks: [],
                        userId: _this.Context.user._id
                    };
                    _this.isPageBusy = false;
                } else {
                    _this.action = 'update';
                    _this.taskCollection.get(id).then(function (data) {
                        _this.task = data;
                        _this.task.tasks = _this.task.tasks || [];
                        _this.isPageBusy = false;
                    });
                }
            });
        }
        Controller.prototype.createTask = function () {
            var _this = this;
            this.taskCollection.post(this.task).then(function (result) {
                _this.task = result;
                _this.show.success('Success');
            }, function (error) {
                _this.onError(error);
            });
        };

        Controller.prototype.updateTask = function () {
            var _this = this;
            this.task.save().then(function (result) {
                _this.show.success('Success');
            }, function (error) {
                _this.onError(error);
            });
        };

        Controller.prototype.deleteTask = function () {
            var _this = this;
            this.task.remove().then(function (result) {
                _this.show.success('Success');
                _this.$location.path('/dashboard');
            }, function (error) {
                _this.onError(error);
            });
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(PageController);

    angular.module('app.modals').controller('taskCtrl', Controller);
})(APP_TASK || (APP_TASK = {}));
//# sourceMappingURL=task.js.map
