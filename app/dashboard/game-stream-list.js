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
			controllerAs: 'model',
			bindToController: true
		};

		return directive;
	};

	GameStreamListController.$inject = [ 'twitchStreams' ];

	function GameStreamListController(twitchStreams) {
		var model = this;
		model.streams = [];

		activate();

		function activate() {
			twitchStreams.getByGame(model.game, 4, 0)
				.then(function (data) {
					model.streams = data.streams;
				});
		}
	}
})();