(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.search', TwitchSearch);

    TwitchSearch.$inject = ['blocks.twitch.client'];

    function TwitchSearch(twitchClient) {
        return {
            streams: streams,
            games: games
        };

        function streams(query, limit, offset) {
            var params = {
                q: query,
                limit: limit,
                offset: offset
            };

            return twitchClient.get('search/streams', params)
              .then(getCompleted);

            function getCompleted(response) {
                return response.streams;
            }
        }

        function games(query, live) {
            var params = {
                type: 'suggest',
                q: query,
                live: live
            };

            return twitchClient.get('search/games', params)
                .then(getCompleted);

            function getCompleted(response) {
                return response.games;
            }
        };
    };
}());