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

	isAuthenticate(cb) {
		if (this.Context.user._id) {
			this.$log.debug('[profile]', this.Context.user);
			cb();
		}
		else {
			this.$location.path('/login');
		}
	}

	isUserInRole(role: string) {
		return this.Context.user.role === role;
	}
}