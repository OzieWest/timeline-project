/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />

module APP_REGISTRATION {

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

        registration() {
            if (this.email && this.password) {
                this.isPageBusy = true;

                var query = {
                    username: this.email,
                    password: this.password
                };

                this.$http.post('./api/v1/registration', query).then(
                    (result:any) => {
                        this.show.success('Success');
                        this.$location.path('/login');
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
        .module('app.registration', [])
        .controller('registrationCtrl', Controller);
}