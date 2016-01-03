(function(){
    'use strict';

    angular
        .module('app.dashboard')
        .directive('dashboardChannels', dashboardChannels);

    function dashboardChannels() {
        var directive = {
            restrict: 'A',
            replace: false,
            templateUrl: 'app/dashboard/dashboardChannels.html',
            scope: { },
            controller: DashboardChannelsController,
            controllerAs: 'model',
            bindToController: true
        };

        return directive;
    }

    DashboardChannelsController.$inject = [
        'blocks.user.service',
        'blocks.twitch.streams'];

    function DashboardChannelsController(user, twitchStreams) {
        var model = this;
        model.streams = [];

        activate();

        function activate() {
            return user.getChannels()
                .then(getStreams);
        }

        function getStreams(channels) {
            var channel = "";
            channels.forEach(function (value) {
                channel += value.name + ",";
            });

            return twitchStreams.getByChannel(channel, channels.length, 0)
                .then(getByChannelCompleted);

            function getByChannelCompleted(response) {
                model.streams = response.streams;
            }
        }
    }
}());