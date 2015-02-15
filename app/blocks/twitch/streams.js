(function(){
	'use strict';

	angular
		.module('blocks.twitch')
		.factory('twitchStreams', TwitchStreams);

	TwitchStreams.$inject = ['$http'];

	function TwitchStreams($http) {
		return {
			getByGame: getByGame,
		};

		function getByGame(game, limit, offset) {
			var url = "https://api.twitch.tv/kraken/streams";
			url += "?callback=JSON_CALLBACK";
			url += "&game=" + game;

			if (limit) {
				url += "&limit=" + limit;
			}

			if (offset) {
				url += "&offset=" + offset
			}

			return $http.jsonp(url)
				.then(getByGamesCompleted);

			function getByGamesCompleted(response) {
				return response.data;
			}
		}
	};
})();