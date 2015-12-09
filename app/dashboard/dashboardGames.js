(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('dashboardGames', dashboardGames);

    function dashboardGames() {
        var directive = {
            restrict: 'A',
            replace: false,
            templateUrl: 'app/dashboard/dashboardGames.html',
            scope: { },
            controller: DashboardGamesController,
            controllerAs: 'model',
            bindToController: true
        };

        return directive;
    }

    DashboardGamesController.$inject = [
        'blocks.user.service'];

    function DashboardGamesController(user) {
        var model = this;
        model.games = [];

        activate();

        function activate() {
            return user.getGames()
                .then(setGames);
        }

        function setGames(games) {
            model.games = games;
        }
    }
}());