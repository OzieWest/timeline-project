/// <reference path="types/clientTypes.d.ts" />
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
        this.$window = this.require('$window');
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
    PageController.prototype.clearAuth = function () {
        delete this.$window.sessionStorage.expires;
        delete this.$window.sessionStorage.token;
        return this.$location.path('/login');
    };
    PageController.prototype.isAuthenticate = function () {
        var expires = this.$window.sessionStorage.expires;
        var token = this.$window.sessionStorage.token;
        if (!expires && !token) {
            return false;
        }
        var date = new Date(expires);
        if (new Date() >= date) {
            return false;
        }
        return true;
    };
    PageController.prototype.loadProfile = function (cb) {
        var _this = this;
        if (!this.isAuthenticate())
            return this.clearAuth();
        if (this.Context.user._id) {
            this.isPageReady = true;
            cb();
        }
        else {
            var query = {
                method: 'get',
                url: './api/v1/profile',
                headers: {
                    Auth: this.$window.sessionStorage.token
                }
            };
            this.$http(query).then(function (result) {
                _this.Context.user = result.data;
                _this.isPageReady = true;
                cb();
            }, function (error) {
                return _this.clearAuth();
            });
        }
    };
    PageController.prototype.isUserInRole = function (role) {
        return this.Context.user.role === role;
    };
    PageController.prototype.onError = function (error) {
        if (error.status === 401) {
            this.show.error('Unauthorized');
            this.clearAuth();
        }
        else {
            this.show.error(error);
        }
    };
    return PageController;
})(BaseController);
//# sourceMappingURL=baseController.js.map