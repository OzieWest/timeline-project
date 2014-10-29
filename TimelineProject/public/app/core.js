var APP_CORE;
(function (APP_CORE) {
    function Context() {
        return {
            user: {
                username: 'guest',
                role: 'guest'
            }
        };
    }

    angular.module('app.core', [
        'ngRoute',
        'ui.bootstrap',
        'restangular',
        'app.modules',
        'app.modals',
        'app.directives'
    ]).constant('toastr', toastr).config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: GLOBAL.path.modules('dashboard/dashboard.html'),
            controller: 'dashboardCtrl',
            controllerAs: 'ctrl'
        }).when('/login', {
            templateUrl: GLOBAL.path.modules('login/login.html'),
            controller: 'loginCtrl',
            controllerAs: 'ctrl'
        }).otherwise({ redirectTo: '/dashboard' });
    }).config(function (RestangularProvider) {
        RestangularProvider.setBaseUrl('/api/v1/');

        RestangularProvider.setDefaultHeaders({
            auth: function () {
                return window.sessionStorage['token'];
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
    }).factory('Context', Context);
})(APP_CORE || (APP_CORE = {}));
//# sourceMappingURL=core.js.map
