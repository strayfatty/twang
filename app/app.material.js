(function() {
    'use strict';

    angular
        .module('app')
        .config(materialConfig);

    materialConfig.$inject = ['$mdThemingProvider'];

    function materialConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal');
    }
}());