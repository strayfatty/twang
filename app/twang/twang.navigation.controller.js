(function() {
    'use strict';

    angular
        .module('twang')
        .controller('twang.navigation.controller', NavigationController);

    NavigationController.$inject = ['$mdMedia', '$mdSidenav'];

    function NavigationController($mdMedia, $mdSidenav) {
        var vm = this;
        vm.isLockedOpen = isLockedOpen;
        vm.toggleNavigation = toggleNavigation;

        function isLockedOpen() {
            return $mdMedia('gt-sm');
        }

        function toggleNavigation(b) {
            if (!vm.isLockedOpen()) {
                $mdSidenav('navigation').toggle();
            }
        }
    }
}());