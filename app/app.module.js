(function(){
	'use strict';

	angular
		.module('app', [
			'ngRoute',

			'blocks.twitch',

			'app.games',
			'app.layout',
			'app.streams'
		])
		.config(routeConfig)
		.run(appRun);

		routeConfig.$inject = [ '$routeProvider' ];
		appRun.$inject = [ '$route' ];

		function routeConfig($routeProvider) {
			$routeProvider
				.otherwise({
					redirectTo: '/games'
				});
		}

		function appRun($route) {
			$route.reload();
		}
})();