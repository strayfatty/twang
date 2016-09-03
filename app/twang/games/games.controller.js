(function() {
    'use strict';

    angular
        .module('twang.games')
        .controller('twang.games.controller', GamesController);

    GamesController.$inject = ['blocks.user.service', 'blocks.twitch.search'];

    function GamesController(userService, twitchSearch) {
        var vm = this;
        vm.games = [];
        vm.search = search;
        vm.add = add;
        vm.remove = remove;

        activate();

        function activate() {
            return userService.getGames()
                .then(getGamesCompleted);

            function getGamesCompleted(response) {
                vm.games = response;
            }
        }

        function search(searchText) {
            return twitchSearch.games(searchText);
        }

        function add(game) {
            return userService.addGame(game)
                .then(activate);
        }

        function remove(game) {
            return userService.removeGame(game)
                .then(activate);
        }
    }
}());