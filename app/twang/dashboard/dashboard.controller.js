(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .controller('twang.dashboard.controller', DashboardController);

    DashboardController.$inject = ['blocks.user.service'];

    function DashboardController(userService) {
        var vm = this;
        vm.channels = [];
        vm.games = [];

        activate();

        function activate() {
            return userService.getGames()
                .then(function (games) { vm.games = games; });
        }
    }
}());