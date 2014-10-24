module GLOBAL {
	var _modules = 'app/modules/';
	var _modals = 'app/modals/';

	export var path = {
		modules: function (htmlPath) {
			return _modules + htmlPath + '?' + TIME_STAMP;
		},
		modals: function (htmlPath) {
			return _modals + htmlPath + '?' + TIME_STAMP;
		}
	}; 

	export var TIME_STAMP = new Date().toLocaleTimeString();
}