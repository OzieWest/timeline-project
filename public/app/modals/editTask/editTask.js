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
            _super.call(this, $injector);

            this.$modalInstance = $modalInstance;

            this.task = data;
        }
        Controller.prototype.saveChanges = function () {
            this.$modalInstance.close(this.task);
        };

        Controller.prototype.close = function () {
            this.$modalInstance.dismiss('cancel');
        };
        Controller.$inject = ['$injector', '$modalInstance', 'data'];
        return Controller;
    })(BaseController);

    angular.module('app.modals').controller('modalEditTask', Controller);
})(APP_MODAL_EDIT_PROJECT || (APP_MODAL_EDIT_PROJECT = {}));
//# sourceMappingURL=editTask.js.map
