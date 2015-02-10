(function(){
	'use strict';

	angular
		.module('app.streams')
		.config(routeConfig);

	routeConfig.$inject = [ '$routeProvider' ];

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/streams', {
				templateUrl: 'app/streams/streams.html',
				controller: "streamsController",
				controllerAs: "viewModel"
			});
	}
})();