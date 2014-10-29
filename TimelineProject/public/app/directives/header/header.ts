module APP_HEADER {

	class Controller extends PageController {

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);
		}

		logout() {
			this.clearAuth();
		}
	}

	function Directive() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: GLOBAL.path.directives('header/header.html'),
			controller: Controller,
			controllerAs: 'headerBarCtrl'
		};
	}

	angular
		.module('app.directives')
		.directive('headerBar', Directive);
} 