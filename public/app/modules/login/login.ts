module APP_LOGIN {

	class Controller extends BaseController {

		email = '';
		password = '';

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);

			this.initPage();
		}

		initPage() {

		}

		login() {
			if (this.login && this.password) {
				this.show.success('send', 'DEBUG');
				this.email = '';
				this.password = '';
			}
			else {
				this.show.error('Login or Password empty','DEBUG');
			}
		}
	}

	angular
		.module('app.modules')
		.controller('loginCtrl', Controller);
}