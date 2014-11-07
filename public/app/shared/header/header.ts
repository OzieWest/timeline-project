/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />
/// <reference path="../../global.ts" />

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

	export function Directive() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: GLOBAL.path.directives('header/header.html'),
			controller: Controller,
			controllerAs: 'headerBarCtrl'
		};
	}

	angular
		.module('app.headerBar', [])
		.directive('headerBar', Directive);
}