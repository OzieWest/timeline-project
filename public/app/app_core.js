﻿var APP_CORE;
(function (APP_CORE) {
    angular.module('app.core', [
        'ngRoute',
        'ui.bootstrap',
        'app.modules',
        'app.modals'
    ]).constant('toastr', toastr).config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: GLOBAL.path.modules('dashboard/dashboard.html'),
            controller: 'dashboard_controller',
            controllerAs: 'ctrl'
        });
    });
})(APP_CORE || (APP_CORE = {}));
//# sourceMappingURL=app_core.js.map
