(function (){
	'use strict';

	angular
		.module('app.settings')
		.directive('gameFollow', gameFollow);

	function gameFollow() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/settings/game-follow.html',
			scope: {
				game: '=',
				remove: '=',
			},
			controller: GameFollowController,
			controllerAs: 'viewModel',
			bindToController: true
		};

		return directive;
	};

	function GameFollowController() {
		var viewModel = this;
	}
})();