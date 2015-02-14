(function(){
	'use strict';

	angular
		.module('app.settings')
		.controller('settingsController', SettingsController);

	SettingsController.$inject = [ 'userService', 'twitchSearch' ];

	function SettingsController(userService, twitchSearch) {
		var viewModel = this;
		viewModel.results = [];
		viewModel.games = [];
		viewModel.searchGames = searchGames;
		viewModel.addGame = addGame;
		viewModel.removeGame = removeGame;

		activate();

		function activate() {
			viewModel.games = userService.getGames();
		}

		function searchGames(query) {
			return twitchSearch.games(query)
				.then(searchGamesCompleted);

			function searchGamesCompleted(data) {
				return data.games;
			}
		}

		function addGame(game) {
			userService.addGame(game.name, game.box.small);
			activate();
		}

		function removeGame(game) {
			userService.removeGame(game.name);
			activate();
		}
	}
})();