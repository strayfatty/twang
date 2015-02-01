(function(){
	'use strict';

	angular
		.module('twangApp')
		.factory('SearchService', SearchService);

	SearchService.$inject = ['$http'];

	function SearchService($http) {
		return {
			getGames: getGames
		};

		function getGames(query) {
			return $http.jsonp("https://api.twitch.tv/kraken/search/games?type=suggest&callback=JSON_CALLBACK&q=" + query)
				.then(getGamesCompleted);

			function getGamesCompleted(response) {
				return response.data;
			}
		};
	};
})();