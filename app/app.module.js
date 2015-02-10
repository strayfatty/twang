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
		.run(appRun);

		appRun.$inject = [ '$route' ];

		function appRun($route) {
			$route.reload();
		}
})();