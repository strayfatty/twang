(function () {
    'use strict';

    angular
        .module('twang.channels')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.channels',
            {
                url: '/channels',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/channels/channels.html'
                    }
                },
                data: {
                    title: 'Channels'
                }
            });
    }
}());