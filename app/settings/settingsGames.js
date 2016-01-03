(function (){
    'use strict';

    angular
        .module('app.settings')
        .directive('settingsGames', settingsGames);

    function settingsGames() {
        var directive = {
            restrict: 'A',
            replace: false,
            templateUrl: 'app/settings/settingsGames.html',
            scope: { },
            controller: SettingsGamesController,
            controllerAs: 'model',
            bindToController: true
        };

        return directive;
    }

    SettingsGamesController.$inject = [
        'blocks.user.service',
        'blocks.twitch.search'];

    function SettingsGamesController(user, twitchSearch) {
        var model = this;
        model.games = [];

        model.addGame = addGame;
        model.removeGame = removeGame;
        model.searchGames = searchGames;

        activate();

        function activate() {
            return user.getGames()
                .then(setGames);
        }

        function addGame(game) {
            return user.addGame(game)
                .then(setGames);
        }

        function removeGame(game) {
            return user.removeGame(game)
                .then(setGames);
        }

        function searchGames(query) {
            return twitchSearch.games(query)
                .then(gamesCompleted);

            function gamesCompleted(response) {
                return response.games;
            }
        }

        function setGames(games) {
            model.games = games;
        }
    }
}());