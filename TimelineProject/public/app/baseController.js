var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseController = (function () {
    function BaseController($injector) {
        this.$injector = $injector;

        this.initController();
    }
    BaseController.prototype.initController = function () {
        this.$location = this.require('$location');
        this.$timeout = this.require('$timeout');
        this.$q = this.require('$q');
        this.$http = this.require('$http');
        this.$log = this.require('$log');
        this.$route = this.require('$route');
        this.$routeParams = this.require('$routeParams');
        this.show = this.require('toastr');
        this.$modal = this.require('$modal');
        this.Restangular = this.require('Restangular');
        this.Context = this.require('Context');
    };

    BaseController.prototype.require = function (key) {
        return this.$injector.get(key);
    };
    return BaseController;
})();

var PageController = (function (_super) {
    __extends(PageController, _super);
    function PageController($injector) {
        _super.call(this, $injector);
        this.isPageReady = false;
        this.isPageBusy = true;
    }
    PageController.prototype.isAuthenticate = function (cb) {
        if (this.Context.user._id) {
            this.$log.debug('[profile]', this.Context.user);
            cb();
        } else {
            this.$location.path('/login');
        }
    };

    PageController.prototype.isUserInRole = function (role) {
        return this.Context.user.role === role;
    };
    return PageController;
})(BaseController);
//# sourceMappingURL=baseController.js.map
