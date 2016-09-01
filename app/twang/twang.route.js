(function() {
    'use strict';

    angular
        .module('twang')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang',
            {
                abstract: true,
                views: {
                    'header@': {
                        templateUrl: 'app/twang/twang.header.html',
                        controller: 'twang.header.controller',
                        controllerAs: 'vm'
                    },
                    'navigation@': {
                        templateUrl: 'app/twang/twang.navigation.html',
                        controller: 'twang.navigation.controller',
                        controllerAs: 'vm'
                    }
                }
            });
    }
}());