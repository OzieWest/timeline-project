module APP_CORE {

	function Context() {
		return {
			user: {
				username: 'guest',
				role: 'guest'
			}
		}
	}

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
				.when('/dashboard', {
					templateUrl: GLOBAL.path.modules('dashboard/dashboard.html'),
					controller: 'dashboardCtrl',
					controllerAs: 'ctrl'
				})
				.when('/login', {
					templateUrl: GLOBAL.path.modules('login/login.html'),
					controller: 'loginCtrl',
					controllerAs: 'ctrl'
				})
				.otherwise({ redirectTo: '/dashboard' });
		})
		.config((RestangularProvider) => {
			RestangularProvider.setBaseUrl('/api/v1/');

			RestangularProvider.setRestangularFields({
				id: "_id",
			});
		})
		.factory('Context', Context);
}