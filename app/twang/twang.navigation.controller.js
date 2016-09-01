(function() {
    'use strict';

    angular
        .module('twang')
        .controller('twang.navigation.controller', NavigationController);

    NavigationController.$inject = ['$mdSidenav'];

    function NavigationController($mdSidenav) {
        var vm = this;
        vm.toggleNavigation = toggleNavigation;

        function toggleNavigation() {
            $mdSidenav('navigation').toggle();
        }
    }
}());