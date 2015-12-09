(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('dashboardGameStreams', dashboardGameStreams);

    function dashboardGameStreams() {
        var directive = {
            restrict: 'A',
            replace: false,
            templateUrl: 'app/dashboard/dashboardGameStreams.html',
            scope: {
                game: '=dashboardGameStreams'
            },
            controller: DashboardGameStreamsController,
            controllerAs: 'model',
            bindToController: true
        };

        return directive;
    }

    DashboardGameStreamsController.$inject = [
        'blocks.twitch.streams'];

    function DashboardGameStreamsController(twitchStreams) {
        var model = this;
        model.streams = [];

        activate();

        function activate() {
            return twitchStreams.getByGame(model.game.name, 4, 0)
                .then(setStreams);
        }

        function setStreams(response) {
            model.streams = response.streams;
        }
    }
}());