(function(){
	'use strict';

	angular
		.module('blocks.twitch')
		.factory('twitchSearch', TwitchSearch);

	TwitchSearch.$inject = ['$http'];

	function TwitchSearch($http) {
		return {
			streams: streams,
			games: games
		};

		function streams(query, limit, offset) {
			var url = "https://api.twitch.tv/kraken/search/streams";
			url += "?callback=JSON_CALLBACK";
			url += "&q=" + query;

			if (limit) {
				streamsUrl += "&limit=" + limit;
			}

			if (offset) {
				url += "&offset=" + offset
			}

			return $htpp.jsonp(url)
				.then(streamsCompleted);

			function streamsCompleted(response) {
				return response.data;
			}
		}

		function games(query, live) {
			var url = "https://api.twitch.tv/kraken/search/games";
			url += "?callback=JSON_CALLBACK";
			url += "&type=suggest"
			url += "&q=" + query;

			if (live) {
				url += "&live=true";
			}

			return $http.jsonp(url)
				.then(gamesCompleted);

			function gamesCompleted(response) {
				return response.data;
			}
		};
	};
})();