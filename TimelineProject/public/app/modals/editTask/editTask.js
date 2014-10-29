var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var APP_MODAL_EDIT_PROJECT;
(function (APP_MODAL_EDIT_PROJECT) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector, $modalInstance, data) {
            var _this = this;
            _super.call(this, $injector);
            this.action = 'update';

            this.loadProfile(function () {
                _this.taskCollection = _this.Restangular.all('tasks');
                _this.$modalInstance = $modalInstance;

                _this.action = data._id ? 'update' : 'create';

                _this.task = data;
            });
        }
        Controller.prototype.createTask = function () {
            var _this = this;
            this.taskCollection.post(this.task).then(function (result) {
                _this.$modalInstance.close(result);
            }, function (error) {
                _this.close();
                _this.onError(error);
            });
        };

        Controller.prototype.updateTask = function () {
            var _this = this;
            console.log(this.task);
            this.task.save().then(function (result) {
                _this.$modalInstance.close(_this.task);
            }, function (error) {
                _this.close();
                _this.onError(error);
            });
        };

        Controller.prototype.deleteTask = function () {
            var _this = this;
            this.task.remove().then(function (result) {
                _this.$modalInstance.close(result);
            }, function (error) {
                _this.close();
                _this.onError(error);
            });
        };

        Controller.prototype.close = function () {
            this.$modalInstance.dismiss('cancel');
        };
        Controller.$inject = ['$injector', '$modalInstance', 'data'];
        return Controller;
    })(PageController);

    angular.module('app.modals').controller('modalEditTask', Controller);
})(APP_MODAL_EDIT_PROJECT || (APP_MODAL_EDIT_PROJECT = {}));
//# sourceMappingURL=editTask.js.map
