(function(){
	'use strict';

	angular
		.module('app.games')
		.config(routeConfig);

	routeConfig.$inject = [ '$routeProvider' ];

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/games', {
				templateUrl: 'app/games/games.html',
				controller: "gamesController",
				controllerAs: "viewModel"
			});
	}
})();