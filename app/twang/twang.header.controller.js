(function() {
    'use strict';

    angular
        .module('twang')
        .controller('twang.header.controller', HeaderController);

    HeaderController.$inject = ['$mdSidenav'];

    function HeaderController($mdSidenav) {
        var vm = this;
        vm.toggleNavigation = toggleNavigation;

        function toggleNavigation() {
            $mdSidenav('navigation').toggle();
        }
    }
}());