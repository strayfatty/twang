(function(){
	'use strict';

	angular
		.module('app.dashboard')
		.controller('dashboardController', DashboardController);

	DashboardController.$inject = [ 'userService', 'twitchStreams' ];

	function DashboardController(userService, twitchStreams) {
		var viewModel = this;
		viewModel.games = [];
		viewModel.channels = [];

		activate();

		function activate() {
			var channel = "";
			var channels = userService.getChannels();
			channels.forEach(function (value) {
				channel += value.name + ",";
			});

			twitchStreams.getByChannel(channel, channels.length, 0)
				.then(function (data) {
					viewModel.channels = data.streams;
				});


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