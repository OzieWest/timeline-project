var GLOBAL;
(function (GLOBAL) {
    var _modules = 'app/modules/';
    var _modals = 'app/modals/';
    var _directives = 'app/directives/';

    GLOBAL.path = {
        modules: function (htmlPath) {
            return _modules + htmlPath + '?' + GLOBAL.TIME_STAMP;
        },
        modals: function (htmlPath) {
            return _modals + htmlPath + '?' + GLOBAL.TIME_STAMP;
        },
        directives: function (htmlPath) {
            return _directives + htmlPath + '?' + GLOBAL.TIME_STAMP;
        }
    };

    GLOBAL.TIME_STAMP = new Date().toLocaleTimeString();
})(GLOBAL || (GLOBAL = {}));
//# sourceMappingURL=global.js.map
