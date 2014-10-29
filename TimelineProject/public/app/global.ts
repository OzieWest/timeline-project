module GLOBAL {
	var _modules = 'app/modules/';
	var _modals = 'app/modals/';
	var _directives = 'app/directives/';

	export var path = {
		modules: function (htmlPath) {
			return _modules + htmlPath + '?' + TIME_STAMP;
		},
		modals: function (htmlPath) {
			return _modals + htmlPath + '?' + TIME_STAMP;
		},
		directives: function (htmlPath) {
			return _directives + htmlPath + '?' + TIME_STAMP;
		}
	}; 

	export var TIME_STAMP = new Date().toLocaleTimeString();
}