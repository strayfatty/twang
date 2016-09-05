(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardStream', dashboardStream);

    function dashboardStream() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: {
                stream: '=',
                showGameTitle: '='
            },
            templateUrl: 'app/twang/dashboard/dashboard.stream.html',
            controller: DashboardStreamController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardStreamController.$inject = [];

    function DashboardStreamController() {
        var vm = this;
    }
}());