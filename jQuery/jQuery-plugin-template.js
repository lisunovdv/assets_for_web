;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS для Browserify
		module.exports = factory;
	} else {
		// Используя глобальные переменные браузера
		factory(jQuery);
	}
}(function ($) {
    'use script';
    // код плагина
}));
