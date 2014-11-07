/// <reference path="types/clientTypes.d.ts" />
/// <reference path="global.ts" />
var APP_CORE;
(function (APP_CORE) {
    toastr.options.closeButton = true;
    /* Context factory */
    function Context() {
        return {
            user: {
                username: 'guest',
                role: 'guest'
            }
        };
    }
    /* Routing */
    function routeConfig($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: GLOBAL.path.modules('login/login.html'),
            controller: 'loginCtrl',
            controllerAs: 'ctrl'
        }).when('/dashboard', {
            templateUrl: GLOBAL.path.modules('dashboard/dashboard.html'),
            controller: 'dashboardCtrl',
            controllerAs: 'ctrl'
        }).when('/registration', {
            templateUrl: GLOBAL.path.modules('registration/registration.html'),
            controller: 'registrationCtrl',
            controllerAs: 'ctrl'
        }).otherwise({ redirectTo: '/dashboard' });
    }
    routeConfig.$inject = ['$routeProvider'];
    /* Restangular */
    function restangularConfig(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api/v1/');
        RestangularProvider.setDefaultHeaders({
            auth: function () {
                return window.localStorage['token'];
            }
        });
        RestangularProvider.addRequestInterceptor(function (element, operation, route, url) {
            console.info(['REQ', operation, url, element]);
            return element;
        });
        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            console.info(['RESP', operation, url, data]);
            return data;
        });
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
    }
    restangularConfig.$inject = ['RestangularProvider'];
    /* App */
    angular.module('app.core', [
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'restangular',
        'monospaced.elastic',
        'app.headerBar',
        'app.linkerFilter',
        'app.dashboard',
        'app.login',
        'app.registration'
    ]).config(routeConfig).config(restangularConfig).constant('toastr', toastr).factory('Context', Context);
})(APP_CORE || (APP_CORE = {}));
//# sourceMappingURL=core.js.map