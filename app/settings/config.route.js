(function() {
	'use strict';

	angular
		.module('app.settings')
		.config(routeConfig);

	routeConfig.$inject = [ '$routeProvider' ];

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/settings', {
				templateUrl: 'app/settings/settings.html',
				controller: "settingsController",
				controllerAs: "viewModel"
			});
	}
})();