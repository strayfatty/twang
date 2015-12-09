(function() {
    'use strict';

    angular
        .module('app.settings')
        .directive('settingsChannels', settingsChannels);

    function settingsChannels() {
        var directive = {
            restrict: 'A',
            replace: false,
            templateUrl: 'app/settings/settingsChannels.html',
            scope: { },
            controller: SettingsChannelsController,
            controllerAs: 'model',
            bindToController: true
        };

        return directive;
    }

    SettingsChannelsController.$inject = [
        'blocks.user.service',
        'blocks.twitch.search',
        'blocks.twitch.channels'];

    function SettingsChannelsController(user, twitchSearch, twitchChannels) {
        var model = this;
        model.channels = [];

        model.addChannel = addChannel;
        model.removeChannel = removeChannel;
        model.searchChannels = searchChannels;

        activate();

        function activate() {
            return user.getChannels()
                .then(setChannels);
        }

        function addChannel(channel) {
            return user.addChannel(channel)
                .then(setChannels);
        }

        function removeChannel(channel) {
            return user.removeChannel(channel)
                .then(setChannels);
        }

        function searchChannels(query) {
            return twitchSearch.streams(query)
                .then(streamsCompleted);

            function streamsCompleted(response) {
                if (!response.error && response.streams.length > 0) {
                    return response.streams;
                }

                return twitchChannels.getByName(query)
                    .then(getByNameCompleted);

                function getByNameCompleted(response) {
                    if (response.error) {
                        return [];
                    }

                    return [ { channel: response, game: 'nothing right now' }];
                }
            }
        }

        function setChannels(channels) {
            model.channels = channels;
        }
    }
}());