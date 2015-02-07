(function(){
	'use strict';

	angular
		.module('twangApp')
		.controller('SearchController', SearchController);

	SearchController.$inject = ['$scope', 'TwitchSearch'];

	function SearchController($scope, TwitchSearch) {
		var vm = this;
		vm.query = '';
		vm.results = [];

		activate();

		$scope.$watch(angular.bind(vm, function() {
			return vm.query;
		}), function (query) {
			TwitchSearch.getGames(query)
				.then(function(data) {
				 vm.results = data.games;
			 });
		})

		function activate() {
		}
	}
})();