(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.streams', TwitchStreams);

    TwitchStreams.$inject = ['$http'];

    function TwitchStreams($http) {
        return {
            getByGame: getByGame,
            getByChannel: getByChannel
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
                .then(getByGameCompleted);

            function getByGameCompleted(response) {
                return response.data;
            }
        }

        function getByChannel(channel, limit, offset) {
            var url = "https://api.twitch.tv/kraken/streams";
            url += "?callback=JSON_CALLBACK";
            url += "&channel=" + channel;

            if (limit) {
                url += "&limit=" + limit;
            }

            if (offset) {
                url += "&offset=" + offset
            }

            return $http.jsonp(url)
                .then(getByChannelCompleted);

            function getByChannelCompleted(response) {
                return response.data;
            }
        }
    };
}());