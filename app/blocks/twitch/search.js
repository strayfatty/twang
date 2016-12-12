(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.search', TwitchSearch);

    TwitchSearch.$inject = ['blocks.twitch.client'];

    function TwitchSearch(twitchClient) {
        return {
            channels: channels,
            streams: streams,
            games: games
        };

        function channels(query, limit, offset) {
            return search('search/channels', query, limit, offset);
        }

        function streams(query, limit, offset) {
            return search('search/streams', query, limit, offset);
        }

        function games(query, limit, offset) {
            return search('search/games', query, limit, offset);
        };

        function search(api, query, limit, offset) {
            var params = {
                query: query,
                limit: limit,
                offset: offset
            };

            return twitchClient.get(api, params)
                .then(getCompleted);

            function getCompleted(response) {
                return response.channels || response.streams || response.games;
            }
        }
    };
}());