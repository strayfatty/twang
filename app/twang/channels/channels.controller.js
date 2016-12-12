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
            return twitchSearch.channels(searchText);
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