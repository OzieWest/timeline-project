var BaseController = (function () {
    function BaseController($injector) {
        this.$injector = $injector;

        this.initController();
    }
    BaseController.prototype.initController = function () {
        this.$location = this.require('$location');
        this.$timeout = this.require('$timeout');
        this.$q = this.require('$q');
        this.$http = this.require('$http');
        this.$log = this.require('$log');
        this.$route = this.require('$route');
        this.$routeParams = this.require('$routeParams');
        this.show = this.require('toastr');
        this.$modal = this.require('$modal');
    };

    BaseController.prototype.require = function (key) {
        return this.$injector.get(key);
    };
    return BaseController;
})();
//# sourceMappingURL=baseController.js.map
