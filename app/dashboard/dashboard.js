(function(){
	'use strict';

	angular
		.module('app.dashboard')
		.controller('dashboardController', DashboardController);

	DashboardController.$inject = [ 'userService', 'twitchStreams' ];

	function DashboardController(userService, twitchStreams) {
		var viewModel = this;
		viewModel.games = [];

		activate();

		function activate() {
			viewModel.games = userService.getGames();

			viewModel.games.forEach(function(game) {
				game.streams = [];

				twitchStreams.getByGame(game.name, 4, 0)
					.then(function (data) {
						game.streams = data.streams;
					});
			});
		}
	}
})();