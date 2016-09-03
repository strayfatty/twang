(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardGame', dashboardGame);

    function dashboardGame() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: {
                game: '='
            },
            templateUrl: 'app/twang/dashboard/dashboard.game.html',
            controller: DashboardGameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardGameController.$inject = ['blocks.twitch.streams'];

    function DashboardGameController(twitchStreams) {
        var vm = this;
        vm.streams = [];

        activate();

        function activate() {
            return twitchStreams.getByGame(vm.game.name, 4, 0)
                .then(setStreams);
        }

        function setStreams(response) {
            vm.streams = response.streams;
        }
    }
}());