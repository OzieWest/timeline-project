/// <reference path="types/clientTypes.d.ts" />

class BaseController {
    $injector:any;

    $location:ng.ILocationService;
    $timeout:ng.ITimeoutService;
    $q:ng.IQService;
    $http:ng.IHttpService;
    $log:ng.ILogService;
    $route:any;
    $routeParams:any;
    $modal:any;
    $window:any;

    show:Toastr;
    Restangular:any;
    Context:any;

    constructor($injector) {
        this.$injector = $injector;

        this.initController();
    }

    private initController():void {
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
    }

    require(key:string):any {
        return this.$injector.get(key);
    }
}

class PageController extends BaseController {
    isPageReady = false;
    isPageBusy = true;
    pageTitle:string;
    pageDescription:string;

    constructor($injector) {
        super($injector);
    }

    clearAuth() {
        delete this.$window.sessionStorage.expires;
        delete this.$window.sessionStorage.token;
        return this.$location.path('/login');
    }

    isAuthenticate():boolean {
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
    }

    loadProfile(cb) {
        if (!this.isAuthenticate()) return this.clearAuth();

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
            this.$http(query).then(
                (result) => {
                    this.Context.user = result.data;
                    this.isPageReady = true;
                    cb();
                },
                (error) => {
                    return this.clearAuth();
                });
        }
    }

    isUserInRole(role:string):boolean {
        return this.Context.user.role === role;
    }

    onError(error):void {
        if (error.status === 401) {
            this.show.error('Unauthorized');
            this.clearAuth();
        }
        else {
            this.show.error(error);
        }
    }
}