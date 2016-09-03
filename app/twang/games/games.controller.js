(function() {
    'use strict';

    angular
        .module('twang.games')
        .controller('twang.games.controller', GamesController);

    GamesController.$inject = ['blocks.user.service'];

    function GamesController(userService) {
        var vm = this;
        vm.games = [];

        activate();

        function activate() {
            return userService.getGames()
                .then(getGamesCompleted);

            function getGamesCompleted(response) {
                vm.games = response;
            }
        }
    }
}());