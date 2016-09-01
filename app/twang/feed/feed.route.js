(function () {
    'use strict';

    angular
        .module('twang.feed')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.feed',
            {
                url: '/feed',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/feed/feed.html'
                    }
                }
            });
    }
}());