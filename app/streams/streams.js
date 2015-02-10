(function(){
	'use strict';

	angular
		.module('app.games')
		.controller('streamsController', StreamsController);

	StreamsController.$inject = ['$scope', 'twitchSearch'];

	function StreamsController($scope, twitchSearch) {
		var vm = this;
		vm.query = undefined;
		vm.streams = [];

		$scope.$watch(angular.bind(vm, function() { return vm.query; }), search)

		activate();

		function activate() {
		}

		function search() {
			return twitchSearch.streams(vm.query)
				.then(searchComplete);

			function searchComplete(data) {
				vm.streams = data.streams;
			}
		}
	}
})();