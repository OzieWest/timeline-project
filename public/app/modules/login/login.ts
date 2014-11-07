/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />

module APP_LOGIN {

    class Controller extends PageController {
        email = '';
        password = '';

        static $inject = ['$injector'];

        constructor($injector) {
            super($injector);

            if (this.isAuthenticate())
                this.$location.path('/dashboard');
            else
                this.initPage();
        }

        initPage() {
            this.isPageReady = true;
            this.isPageBusy = false;
        }

        login() {
            if (this.email && this.password) {

                this.isPageBusy = true;

                var query = {
                    username: this.email,
                    password: this.password
                };

                this.$http.post('./api/v1/login', query).then(
                    (result:any) => {
                        this.Context.user = result.data.user;
                        this.$window.localStorage.token = result.data.token;
                        this.$window.localStorage.expires = result.data.expires;

                        this.show.success('Success');
                        this.$location.path('/dashboard');
                    },
                    (error:any) => {
                        this.show.error('Failure');
                        this.$log.error(error);
                    });
            }
            else {
                this.show.error('Login or Password empty', 'DEBUG');
            }
        }
    }

    angular
        .module('app.login', [])
        .controller('loginCtrl', Controller);
}