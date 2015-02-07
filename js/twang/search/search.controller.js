(function(){
	'use strict';

	angular
		.module('twangApp')
		.controller('SearchController', SearchController);

	SearchController.$inject = ['$scope', 'TwitchSearch'];

	function SearchController($scope, TwitchSearch) {
		var vm = this;
		vm.query = undefined;
		vm.live = false;
		vm.results = [];

		activate();

		$scope.$watch(angular.bind(vm, function() { return vm.query; }), activate)
		$scope.$watch(angular.bind(vm, function() { return vm.live; }), activate)

		function activate() {
			return search();
		}

		function search() {
			return TwitchSearch.games(vm.query, vm.live)
				.then(searchComplete);

			function searchComplete(data) {
				vm.results = data.games;
			}
		}
	}
})();