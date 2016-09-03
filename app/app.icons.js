(function() {
    'use strict';

    angular
        .module('app')
        .config(iconConfig);

    iconConfig.$inject = ['$mdIconProvider'];

    function iconConfig($mdIconProvider) {
        $mdIconProvider.icon('menu', 'images/menu.svg', 24);
    }
}());