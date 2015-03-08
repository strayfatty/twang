(function() {
	'use strict';

	angular
		.module('app.dashboard')
		.config(routeConfig);

	routeConfig.$inject = [ '$routeProvider' ];

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/dashboard/dashboard.html',
			});
	}
})();