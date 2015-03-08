(function(){
	'use strict';

	angular
		.module('app', [
			'ngRoute',
			'ui.bootstrap',

			'blocks.twitch',

			'app.core',
			'app.dashboard',
			'app.layout',
			'app.settings'
		])
		.run(appRun);

	appRun.$inject = [ '$route' ];

	function appRun($route) {
		$route.reload();
	}
})();