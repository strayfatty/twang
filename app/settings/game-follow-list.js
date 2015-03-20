(function (){
	'use strict';

	angular
		.module('app.settings')
		.directive('gameFollowList', gameFollowList);

	function gameFollowList() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/settings/game-follow-list.html',
			scope: {
			},
			controller: GameFollowListController,
			controllerAs: 'model',
			bindToController: true
		};

		return directive;
	};

	GameFollowListController.$inject = [ 'userService', 'twitchSearch' ];

	function GameFollowListController(userService, twitchSearch) {
		var model = this;
		model.games = [];
		model.add = add;
		model.remove = remove;
		model.search = search;

		activate();

		function activate() {
			model.games = userService.getGames();
		}

		function add(game) {
			userService.addGame(game.name, game.box.small);
			activate();
		}

		function remove(game) {
			userService.removeGame(game.name);
			activate();
		}

		function search(query) {
			return twitchSearch.games(query)
				.then(searchGamesCompleted);

			function searchGamesCompleted(data) {
				return data.games;
			}
		}
	}
})();