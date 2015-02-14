(function() {
	'use strict';

	angular
		.module('app')
		.config(routeConfig);

	routeConfig.$inject = [ '$routeProvider' ];

	function routeConfig($routeProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/settings'
			});
	}
})();