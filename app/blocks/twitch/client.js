(function () {
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.client', TwitchClient);

    TwitchClient.$inject = ['$http', 'twitchConfig'];

    function TwitchClient($http, twitchConfig) {
        return {
            get: get
        }

        function get(api, params) {
            var queryParams = angular.copy(params || {});

            queryParams.callback = 'JSON_CALLBACK';
            queryParams.client_id = twitchConfig.client_id;

            return $http.jsonp(createUrl(api, queryParams))
                .then(completed);

            function completed(response) {
                return response.data;
            }
        }

        function createUrl(api, queryParams) {
            var url = 'https://api.twitch.tv/kraken/' + api;
            return url + createQuery(queryParams);
        }

        function createQuery(queryParams) {
            return '?' + Object.keys(queryParams)
                .map(function (key) { return toQueryParam(key, queryParams[key]); })
                .filter(function (element) { return !!element; })
                .join('&');
        }

        function toQueryParam(key, value) {
            if (!key || !value) {
                return null;
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
    }
}());