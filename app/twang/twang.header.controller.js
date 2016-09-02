(function() {
    'use strict';

    angular
        .module('twang')
        .controller('twang.header.controller', HeaderController);

    HeaderController.$inject = ['$mdSidenav', '$state'];

    function HeaderController($mdSidenav, $state) {
        var vm = this;
        vm.state = $state;
        
        vm.toggleNavigation = toggleNavigation;

        function toggleNavigation() {
            $mdSidenav('navigation').toggle();
        }
    }
}());