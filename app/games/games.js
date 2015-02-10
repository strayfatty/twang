(function(){
	'use strict';

	angular
		.module('app.games')
		.controller('gamesController', GamesController);

	GamesController.$inject = ['$scope', 'twitchSearch'];

	function GamesController($scope, twitchSearch) {
		var vm = this;
		vm.query = undefined;
		vm.games = [];

		$scope.$watch(angular.bind(vm, function() { return vm.query; }), search)

		activate();

		function activate() {
		}

		function search() {
			return twitchSearch.games(vm.query)
				.then(searchComplete);

			function searchComplete(data) {
				vm.games = data.games;
			}
		}
	}
})();