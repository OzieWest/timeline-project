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
        function Controller($injector, $modalInstance, project) {
            _super.call(this, $injector);

            this.project = project;
            this.$modalInstance = $modalInstance;
        }
        Controller.$inject = ['$injector', '$modalInstance', 'project'];
        return Controller;
    })(BaseController);

    angular.module('app.modals').controller('modal_edit_project', Controller);
})(APP_MODAL_EDIT_PROJECT || (APP_MODAL_EDIT_PROJECT = {}));
//# sourceMappingURL=modal.js.map
