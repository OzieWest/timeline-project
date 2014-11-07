module GLOBAL {
    export var TIME_STAMP = new Date().toLocaleTimeString();

    var _modules = 'app/modules/';
    var _modals = 'app/modals/';
    var _directives = 'app/directives/';

    export var path = {
        modules: function (htmlPath:string):string {
            return _modules + htmlPath + '?' + TIME_STAMP;
        },
        modals: function (htmlPath:string):string {
            return _modals + htmlPath + '?' + TIME_STAMP;
        },
        directives: function (htmlPath:string):string {
            return _directives + htmlPath + '?' + TIME_STAMP;
        }
    };
}