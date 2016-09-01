(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$urlRouterProvider'];

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/feed');
    }
}());