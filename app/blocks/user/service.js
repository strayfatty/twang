(function(){
    'use strict';

    angular
        .module('blocks.user')
        .factory('blocks.user.service', UserSearch);

    UserSearch.$inject = ['$window', '$q'];

    function UserSearch($window, $q) {
        var channelsKey = 'twang.channels';
        var gamesKey = 'twang.games';
        var idKey = 'name';

        return {
            getChannels: getChannels,
            addChannel: addChannel,
            removeChannel: removeChannel,
            getGames: getGames,
            addGame: addGame,
            removeGame: removeGame,
        };

        function getChannels() {
            return resolve(getArray(channelsKey));
        }

        function addChannel(channel) {
            return add(channelsKey, idKey, channel);
        }

        function removeChannel(channel) {
            return remove(channelsKey, idKey, channel);
        }

        function getGames() {
            return resolve(getArray(gamesKey));
        }

        function addGame(game) {
            return add(gamesKey, idKey, game);
        }

        function removeGame(game) {
            return remove(gamesKey, idKey, game);
        }

        function add(storageKey, idKey, value) {
            var values = getArray(storageKey);
            if (indexOf(values, value, idKey) < 0) {
                values.push(value);
                setArray(storageKey, values);
            }

            return resolve(values);
        }

        function remove(storageKey, idKey, value) {
            var values = getArray(storageKey);
            var index = indexOf(values, value, idKey);
            if (index >= 0) {
                values.splice(index, 1);
                setArray(storageKey, values);
            }

            return resolve(values);
        }

        function indexOf(values, value, idKey) {
            var ids = values.map(function(element) { return element[idKey]; });
            return ids.indexOf(value[idKey]);
        }

        function getArray(key) {
            var value = $window.localStorage[key] || '[]';
            return JSON.parse(value);
        }

        function setArray(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        function resolve(data) {
            var deferred = $q.defer();
            deferred.resolve(data);
            return deferred.promise;
        }
    };
}());