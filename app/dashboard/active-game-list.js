(function (){
	'use strict';

	angular
		.module('app.dashboard')
		.directive('activeGameList', activeGameList);

	function activeGameList() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/dashboard/active-game-list.html',
			scope: {
			},
			controller: ActiveGameListController,
			controllerAs: 'viewModel',
			bindToController: true
		};

		return directive;
	};

	ActiveGameListController.$inject = [ 'userService' ];

	function ActiveGameListController(userService) {
		var viewModel = this;
		viewModel.games = [];

		activate();

		function activate() {
			viewModel.games = userService.getGames();
		}
	}
})();