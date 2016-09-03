(function() {
    'use strict';

    angular
        .module('twang.channels')
        .controller('twang.channels.controller', ChannelsController);

    ChannelsController.$inject = ['$q', '$mdToast', 'blocks.user.service', 'blocks.twitch.search', 'blocks.twitch.channels'];

    function ChannelsController($q, $mdToast, userService, twitchSearch, twitchChannels) {
        var vm = this;
        vm.channels = [];
        vm.search = search;
        vm.add = add;
        vm.remove = remove;

        activate();

        function activate() {
            return userService.getChannels()
                .then(setChannels);
        }

        function setChannels(channels) {
            vm.channels = channels;
        }

        function search(searchText) {
            var promises = [
                twitchChannels.getByName(searchText),
                twitchSearch.streams(searchText)
            ];

            return $q.all(promises)
                .then(combine);

            function combine(responses) {
                var channel = responses[0];
                var channels = responses[1].map(function (stream) { return stream.channel; });

                if (channel && channel._id) {
                    channels = channels.filter(function (element) { return element.name != channel.name; });
                    channels.unshift(channel);
                }

                return channels;
            }
        }

        function add(channel) {
            if (!channel) {
                return;
            }

            return userService.addChannel(channel)
                .then(setChannels)
                .then(function () { return $mdToast.showSimple(channel.display_name + " added"); });
        }

        function remove(channel) {
            if (!channel) {
                return;
            }

            return userService.removeChannel(channel)
                .then(setChannels)
                .then(function () { return $mdToast.showSimple(channel.display_name + " removed"); })
        }
    }
}());