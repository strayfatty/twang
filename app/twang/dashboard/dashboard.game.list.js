(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardGameList', dashboardGameList);

    function dashboardGameList() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: { },
            templateUrl: 'app/twang/dashboard/dashboard.game.list.html',
            controller: DashboardGameListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardGameListController.$inject = ['blocks.user.service'];

    function DashboardGameListController(userService) {
        var vm = this;
        vm.games = [];

        activate();

        function activate() {
            return userService.getGames()
                .then(setGames);
        }

        function setGames(games) {
            vm.games = games;
        }
    }
}());