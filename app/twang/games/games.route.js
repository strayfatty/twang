(function () {
    'use strict';

    angular
        .module('twang.games')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.games',
            {
                url: '/games',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/games/games.html',
                        controller: 'twang.games.controller',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: 'Games'
                }
            });
    }
}());