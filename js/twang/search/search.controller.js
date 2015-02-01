(function(){
	'use strict';

	angular
		.module('twangApp')
		.controller('SearchController', SearchController);

	SearchController.$inject = ['$scope', 'SearchService'];

	function SearchController($scope, SearchService) {
		var vm = this;
		vm.query = '';
		vm.results = [];

		activate();

		$scope.$watch(angular.bind(vm, function() {
			return vm.query;
		}), function (query) {
			console.log('Name change to ' + query);
			SearchService.getGames(query)
				.then(function(data) {
				 vm.results = data.games;
			 });
		})

		function activate() {
		}
	}
})();