(function (){
	'use strict';

	angular
		.module('app.dashboard')
		.directive('gameStream', gameStream);

	function gameStream() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/dashboard/game-stream.html',
			scope: {
				stream: '='
			},
			controller: GameStreamController,
			controllerAs: 'viewModel',
			bindToController: true
		};

		return directive;
	};

	function GameStreamController() {
		var viewModel = this;
	}
})();