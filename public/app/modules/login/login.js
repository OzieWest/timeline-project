var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var APP_LOGIN;
(function (APP_LOGIN) {
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller($injector) {
            _super.call(this, $injector);
            this.email = '';
            this.password = '';

            this.initPage();
        }
        Controller.prototype.initPage = function () {
        };

        Controller.prototype.login = function () {
            if (this.login && this.password) {
                this.show.success('send', 'DEBUG');
                this.email = '';
                this.password = '';
            } else {
                this.show.error('Login or Password empty', 'DEBUG');
            }
        };
        Controller.$inject = ['$injector'];
        return Controller;
    })(BaseController);

    angular.module('app.modules').controller('loginCtrl', Controller);
})(APP_LOGIN || (APP_LOGIN = {}));
//# sourceMappingURL=login.js.map
