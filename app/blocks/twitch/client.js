(function () {
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.client', TwitchClient);

    TwitchClient.$inject = ['$http', 'twitchConfig'];

    function TwitchClient($http, twitchConfig) {
        var httpConfig = {
            'headers': {
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID': twitchConfig['Client-ID']
            }
        }

        return {
            get: get
        }

        function get(api, params) {
            return $http.get(createUrl(api, params), httpConfig)
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
            var keys = Object.keys(queryParams || {});
            if (keys.length === 0) {
                return '';
            }

            return '?' + keys
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