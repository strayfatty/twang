(function() {
    'use strict';

    angular
        .module('blocks.router')
        .config(routeConfig);

    routeConfig.$inject = ['$urlMatcherFactoryProvider'];

    function routeConfig($urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);
    }
}());