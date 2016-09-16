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

    DashboardStreamController.$inject = ['$mdDialog'];

    function DashboardStreamController($mdDialog) {
        var vm = this;
        vm.showPreview = showPreview;

        function showPreview() {
            var url = vm.stream.preview.template
                .replace("{width}", "1280")
                .replace("{height}", "720");

            $mdDialog.show({
                clickOutsideToClose: true,
                template: '<md-dialog aria-label="preview"><md-dialog-content><img src="' + url + '"></md-dialog-content></md-dialog>'
            });
        }
    }
}());