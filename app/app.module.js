(function(){
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ui.bootstrap',

            'app.dashboard',
            'app.settings'
        ]);
}());