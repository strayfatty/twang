(function(){
    'use strict';

    angular
        .module('app', [
            'ngMaterial',

            'blocks.router',

            'twang'
        ]);
}());
(function() {
    'use strict';

    angular
        .module('blocks.router', [
            'ui.router'
        ]);
}());
(function() {
    'use strict';

    angular
        .module('blocks.twitch', []);
}());
(function() {
    'use strict';

    angular
        .module('blocks.user', []);
}());
(function () {
    'use strict';

    angular
        .module('twang.channels', []);
}());
(function () {
    'use strict';

    angular
        .module('twang.dashboard', []);
}());
(function () {
    'use strict';

    angular
        .module('twang.games', [
            'blocks.user',
            'blocks.twitch'
        ]);
}());
(function() {
    'use strict';

    angular
        .module('twang', [
            'twang.dashboard',
            'twang.channels',
            'twang.games'
        ]);
}());
(function() {
    'use strict';

    angular
        .module('app')
        .config(iconConfig);

    iconConfig.$inject = ['$mdIconProvider'];

    function iconConfig($mdIconProvider) {
        $mdIconProvider.icon('menu', 'images/menu.svg', 24);
    }
}());
(function() {
    'use strict';

    angular
        .module('app')
        .config(materialConfig);

    materialConfig.$inject = ['$mdThemingProvider'];

    function materialConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey');
    }
}());
(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$urlRouterProvider'];

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    }
}());
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .config(routeConfig);

    routeConfig.$inject = ['$urlMatcherFactoryProvider'];

    function routeConfig($urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);
    }
}());
(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.channels', TwitchChannels);

    TwitchChannels.$inject = ['$http'];

    function TwitchChannels($http) {
        return {
            getByName: getByName,
        };

        function getByName(name) {
            var url = "https://api.twitch.tv/kraken/channels/" + name;
            url += "?callback=JSON_CALLBACK";

            return $http.jsonp(url)
                .then(getCompleted);

            function getCompleted(response) {
                return response.data;
            }
        }
    };
}());
(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.search', TwitchSearch);

    TwitchSearch.$inject = ['$http'];

    function TwitchSearch($http) {
        return {
            streams: streams,
            games: games
        };

        function streams(query, limit, offset) {
            var url = "https://api.twitch.tv/kraken/search/streams";
            url += "?callback=JSON_CALLBACK";
            url += "&q=" + query;

            if (limit) {
                url += "&limit=" + limit;
            }

            if (offset) {
                url += "&offset=" + offset
            }

            return $http.jsonp(url)
                .then(streamsCompleted);

            function streamsCompleted(response) {
                return response.data;
            }
        }

        function games(query, live) {
            var url = "https://api.twitch.tv/kraken/search/games";
            url += "?callback=JSON_CALLBACK";
            url += "&type=suggest"
            url += "&q=" + query;

            if (live) {
                url += "&live=true";
            }

            return $http.jsonp(url)
                .then(gamesCompleted);

            function gamesCompleted(response) {
                return response.data;
            }
        };
    };
}());
(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.streams', TwitchStreams);

    TwitchStreams.$inject = ['$http'];

    function TwitchStreams($http) {
        return {
            getByGame: getByGame,
            getByChannel: getByChannel
        };

        function getByGame(game, limit, offset) {
            var url = "https://api.twitch.tv/kraken/streams";
            url += "?callback=JSON_CALLBACK";
            url += "&game=" + game;

            if (limit) {
                url += "&limit=" + limit;
            }

            if (offset) {
                url += "&offset=" + offset
            }

            return $http.jsonp(url)
                .then(getByGameCompleted);

            function getByGameCompleted(response) {
                return response.data;
            }
        }

        function getByChannel(channel, limit, offset) {
            var url = "https://api.twitch.tv/kraken/streams";
            url += "?callback=JSON_CALLBACK";
            url += "&channel=" + channel;

            if (limit) {
                url += "&limit=" + limit;
            }

            if (offset) {
                url += "&offset=" + offset
            }

            return $http.jsonp(url)
                .then(getByChannelCompleted);

            function getByChannelCompleted(response) {
                return response.data;
            }
        }
    };
}());
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
(function () {
    'use strict';

    angular
        .module('twang.channels')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.channels',
            {
                url: '/channels',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/channels/channels.html'
                    }
                },
                data: {
                    title: 'Channels'
                }
            });
    }
}());
(function () {
    'use strict';

    angular
        .module('twang.dashboard')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.dashboard',
            {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/dashboard/dashboard.html'
                    }
                },
                data: {
                    title: 'Dashboard'
                }
            });
    }
}());
(function() {
    'use strict';

    angular
        .module('twang.games')
        .controller('twang.games.controller', GamesController);

    GamesController.$inject = ['blocks.user.service', 'blocks.twitch.search'];

    function GamesController(userService, twitchSearch) {
        var vm = this;
        vm.games = [];
        vm.search = search;
        vm.add = add;
        vm.remove = remove;

        activate();

        function activate() {
            return userService.getGames()
                .then(getGamesCompleted);

            function getGamesCompleted(response) {
                vm.games = response;
            }
        }

        function search(searchText) {
            return twitchSearch.games(searchText)
                .then(function (response) {
                    return response.games;
                });
        }

        function add(game) {
            return userService.addGame(game)
                .then(activate);
        }

        function remove(game) {
            return userService.removeGame(game)
                .then(activate);
        }
    }
}());
(function () {
    'use strict';

    angular
        .module('twang.games')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.games',
            {
                url: '/games',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/games/games.html',
                        controller: 'twang.games.controller',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: 'Games'
                }
            });
    }
}());
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
(function() {
    'use strict';

    angular
        .module('twang')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang',
            {
                abstract: true,
                views: {
                    'header@': {
                        templateUrl: 'app/twang/twang.header.html',
                        controller: 'twang.header.controller',
                        controllerAs: 'vm'
                    },
                    'navigation@': {
                        templateUrl: 'app/twang/twang.navigation.html',
                        controller: 'twang.navigation.controller',
                        controllerAs: 'vm'
                    }
                }
            });
    }
}());
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('app/twang/channels/channels.html','');
$templateCache.put('app/twang/dashboard/dashboard.html','');
$templateCache.put('app/twang/games/games.html','<div layout="row" layout-sm="column" layout-xs="column" layout-wrap>\r\n    <md-autocomplete flex="100"\r\n                     md-search-text="searchText"\r\n                     md-selected-item="selectedItem"\r\n                     md-item-text="item.name"\r\n                     md-items="item in vm.search(searchText)"\r\n                     md-delay="200"\r\n                     md-selected-item-change="vm.add(selectedItem); searchText = \'\'; selectedItem = null"\r\n                     placeholder="Add a game">\r\n        <md-item-template>{{ item.name }}</md-item-template>\r\n    </md-autocomplete>\r\n    <div flex flex-gt-sm="50" flex-gt-md="33" ng-repeat="game in vm.games | orderBy:\'name\'">\r\n        <md-card>\r\n            <md-card-title>\r\n                <md-card-title-text>\r\n                    <span class="md-headline">{{ game.name }}</span>\r\n                </md-card-title-text>\r\n                <md-card-title-media>\r\n                    <img class="md-media-md" ng-src="{{ game.box.medium }}">\r\n                </md-card-title-media>\r\n            </md-card-title>\r\n            <md-card-actions layout="row" layout-align="end center">\r\n                <md-button href="https://www.twitch.tv/directory/game/{{ game.name }}" target="_blank">View</md-button>\r\n                <md-button ng-click="vm.remove(game)">Remove</md-button>\r\n            </md-card-actions>\r\n        </md-card>\r\n    </div>\r\n</div>');
$templateCache.put('app/twang/twang.header.html','<md-toolbar class="md-hue-1" layout="row">\r\n    <md-button class="menu" aria-label="menu" hide-gt-sm ng-click="vm.toggleNavigation()">\r\n        <md-icon md-svg-icon="menu"></md-icon>\r\n    </md-button>\r\n    <h3>{{ vm.state.current.data.title }}</h3>\r\n</md-toolbar>\r\n');
$templateCache.put('app/twang/twang.navigation.html','<md-toolbar class="md-hue-3">\r\n    <h3>TWANG</h3>\r\n</md-toolbar>\r\n<md-divider></md-divider>\r\n<md-list>\r\n    <md-list-item>\r\n        <md-button ui-sref="twang.dashboard" ui-sref-active-eq="selected" ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n            Dashboard\r\n        </md-button>\r\n    </md-list-item>\r\n    <md-list-item>\r\n        <md-button ui-sref="twang.channels" ui-sref-active-eq="selected" ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n            Channels\r\n        </md-button>\r\n    </md-list-item>\r\n    <md-list-item>\r\n        <md-button ui-sref="twang.games" ui-sref-active-eq="selected" ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n            Games\r\n        </md-button>\r\n    </md-list-item>\r\n</md-list>\r\n');}]);
//# sourceMappingURL=app.js.map
