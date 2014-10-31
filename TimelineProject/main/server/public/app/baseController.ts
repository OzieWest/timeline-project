class BaseController {
	$injector: any;

	$location: ng.ILocationService;
	$timeout: ng.ITimeoutService;
	$q: ng.IQService;
	$http: ng.IHttpService;
	$log: ng.ILogService;
	$route: any;
	$routeParams: any;
	$modal: any;
	$window: any;

	show: Toastr;
	Restangular: any;
	Context: any;

	constructor($injector) {
		this.$injector = $injector;

		this.initController();
	}

	private initController() {
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

	require(key: string) {
		return this.$injector.get(key);
	}
}

class PageController extends BaseController {
	isPageReady = false;
	isPageBusy = true;

	constructor($injector) {
		super($injector);
	}

	clearAuth() {
		delete this.$window.sessionStorage.expires;
		delete this.$window.sessionStorage.token;
		return this.$location.path('/login');
	}

	isAuthenticate() {
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
					cb();
				},
				(error) => {
					return this.clearAuth();
				});
		}
	}

	isUserInRole(role: string) {
		return this.Context.user.role === role;
	}

	onError(error) {
		if (error.status === 401) {
			this.show.error('Unauthorized');
			this.clearAuth();
		}
	}
}