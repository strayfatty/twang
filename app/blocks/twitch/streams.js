(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.streams', TwitchStreams);

    TwitchStreams.$inject = ['blocks.twitch.client'];

    function TwitchStreams(twitchClient) {
        return {
            getByGame: getByGame,
            getByChannel: getByChannel
        };

        function getByGame(game, limit, offset) {
            var params = {
                game: game,
                limit: limit,
                offset: offset
            };

            return twitchClient.get('streams', params);
        }

        function getByChannel(channel, limit, offset) {
            var params = {
                channel: channel,
                limit: limit,
                offset: offset
            };

            return twitchClient.get('streams', params);
        }
    };
}());