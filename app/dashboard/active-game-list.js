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
			controllerAs: 'model',
			bindToController: true
		};

		return directive;
	};

	ActiveGameListController.$inject = [ 'userService' ];

	function ActiveGameListController(userService) {
		var model = this;
		model.games = [];

		activate();

		function activate() {
			model.games = userService.getGames();
		}
	}
})();