(function() {
    'use strict';

    angular
        .module('twang.games')
        .controller('twang.games.controller', GamesController);

    GamesController.$inject = ['$mdToast', 'blocks.user.service', 'blocks.twitch.search'];

    function GamesController($mdToast, userService, twitchSearch) {
        var vm = this;
        vm.games = [];
        vm.search = search;
        vm.add = add;
        vm.remove = remove;

        activate();

        function activate() {
            return userService.getGames()
                .then(setGames);
        }

        function setGames(games) {
            vm.games = games;
        }

        function search(searchText) {
            return twitchSearch.games(searchText);
        }

        function add(game) {
            return userService.addGame(game)
                .then(setGames)
                .then(function () { return $mdToast.showSimple(game.name + " added"); });
        }

        function remove(game) {
            return userService.removeGame(game)
                .then(setGames)
                .then(function () { return $mdToast.showSimple(game.name + " removed"); })
        }
    }
}());