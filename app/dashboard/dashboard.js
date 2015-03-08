(function(){
	'use strict';

	angular
		.module('app.dashboard')
		.controller('dashboardController', DashboardController);

	DashboardController.$inject = [ 'userService' ];

	function DashboardController(userService) {
		var viewModel = this;
		viewModel.games = [];

		activate();

		function activate() {
			viewModel.games = userService.getGames();
		}
	}
})();