(function(){
	'use strict';

	angular
		.module('blocks.twitch')
		.factory('twitchChannels', TwitchChannels);

	TwitchChannels.$inject = ['$http'];

	function TwitchChannels($http) {
		return {
			getByName: getByName,
		};

		function getByName(name) {
			var url = "https://api.twitch.tv/kraken/channels/" + name;
			url += "?callback=JSON_CALLBACK";

			return $http.jsonp(url)
				.then(getCompleted);

			function getCompleted(response) {
				return response.data;
			}
		}
	};
})();