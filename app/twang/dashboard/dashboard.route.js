(function () {
    'use strict';

    angular
        .module('twang.dashboard')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.dashboard',
            {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/dashboard/dashboard.html',
                        controller: 'twang.dashboard.controller',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: 'Dashboard'
                }
            });
    }
}());