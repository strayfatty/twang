(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.channels', TwitchChannels);

    TwitchChannels.$inject = ['blocks.twitch.client'];

    function TwitchChannels(twitchClient) {
        return {
            getByName: getByName,
        };

        function getByName(name) {
            return twitchClient.get('channels/' + name);
        }
    };
}());