(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardChannelList', dashboardChannelList);

    function dashboardChannelList() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: { },
            templateUrl: 'app/twang/dashboard/dashboard.channel.list.html',
            controller: DashboardChannelListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardChannelListController.$inject = ['blocks.user.service', 'blocks.twitch.streams'];

    function DashboardChannelListController(userService, twitchStreams) {
        var vm = this;
        vm.streams = [];

        activate();

        function activate() {
            return userService.getChannels()
                .then(getStreams);
        }

        function getStreams(channels) {
            if (!channels || channels.length === 0) {
                return [];
            }

            var channel = "";
            channels.forEach(function (element) {
                channel += element._id + ',';
            });

            return twitchStreams.getByChannel(channel, channels.length, 0)
                .then(setStreams);
        }

        function setStreams(response) {
            vm.streams = response.streams;
        }
    }
}());