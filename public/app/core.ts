﻿module APP_CORE {

	angular
		.module('app.core', [
			'ngRoute',
			'ui.bootstrap',
			'restangular',

			'app.modules',
			'app.modals'
		])
		.constant('toastr', toastr)
		.config(($routeProvider) => {
			$routeProvider
				.when('/', {
					templateUrl: GLOBAL.path.modules('dashboard/dashboard.html'),
					controller: 'dashboardCtrl',
					controllerAs: 'ctrl'
				})
				.when('/login', {
					templateUrl: GLOBAL.path.modules('login/login.html'),
					controller: 'loginCtrl',
					controllerAs: 'ctrl'
				});
		})
		.config((RestangularProvider) => {
			RestangularProvider.setBaseUrl('/api/v1/');

			RestangularProvider.setRestangularFields({
				id: "_id",
			});
		});

}