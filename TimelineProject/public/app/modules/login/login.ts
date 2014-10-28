module APP_LOGIN {

	class Controller extends PageController {
		email = '';
		password = '';

		static $inject = ['$injector'];
		constructor($injector) {
			super($injector);

			this.initPage();
		}

		initPage() {
			this.isPageReady = true;
			this.isPageBusy = false;
		}

		login() {
			if (this.login && this.password) {

				this.isPageBusy = true;

				var query = {
					username: this.email,
					password: this.password
				};

				this.$http.post('./api/v1/auth', query).then(
					(result) => {
						this.Context.user = result.data;
						this.$location.path('/dashboard');
					});
			}
			else {
				this.show.error('Login or Password empty', 'DEBUG');
			}
		}
	}

	angular
		.module('app.modules')
		.controller('loginCtrl', Controller);
}