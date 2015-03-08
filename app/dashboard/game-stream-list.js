(function (){
	'use strict';

	angular
		.module('app.dashboard')
		.directive('gameStreamList', gameStreamList);

	function gameStreamList() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/dashboard/game-stream-list.html',
			scope: {
				game: '='
			},
			controller: GameStreamListController,
			controllerAs: 'viewModel',
			bindToController: true
		};

		return directive;
	};

	GameStreamListController.$inject = [ 'twitchStreams' ];

	function GameStreamListController(twitchStreams) {
		var viewModel = this;
		viewModel.streams = [];

		activate();

		function activate() {
			twitchStreams.getByGame(viewModel.game, 4, 0)
				.then(function (data) {
					viewModel.streams = data.streams;
				});
		}
	}
})();