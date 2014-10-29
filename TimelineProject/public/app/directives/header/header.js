var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var APP_HEADER;
(function (APP_HEADER) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector) {
            _super.call(this, $injector);
        }
        Controller.prototype.logout = function () {
            this.clearAuth();
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(PageController);

    function Directive() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: GLOBAL.path.directives('header/header.html'),
            controller: Controller,
            controllerAs: 'headerBarCtrl'
        };
    }

    angular.module('app.directives').directive('headerBar', Directive);
})(APP_HEADER || (APP_HEADER = {}));
//# sourceMappingURL=header.js.map
