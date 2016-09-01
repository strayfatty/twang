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
        .module('twang.feed', []);
}());
(function() {
    'use strict';

    angular
        .module('twang', [
            'twang.feed'
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
            .primaryPalette('teal');
    }
}());
(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$urlRouterProvider'];

    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/feed');
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
        .module('twang.feed')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('twang.feed',
            {
                url: '/feed',
                views: {
                    'content@': {
                        templateUrl: 'app/twang/feed/feed.html'
                    }
                }
            });
    }
}());
(function() {
    'use strict';

    angular
        .module('twang')
        .controller('twang.header.controller', HeaderController);

    HeaderController.$inject = ['$mdSidenav'];

    function HeaderController($mdSidenav) {
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
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('app/twang/feed/feed.html','<h1>FEED</h1>');
$templateCache.put('app/twang/twang.header.html','<md-toolbar layout="row">\r\n    <md-button class="menu" aria-label="menu" hide-gt-sm ng-click="vm.toggleNavigation()">\r\n        <md-icon md-svg-icon="menu"></md-icon>\r\n    </md-button>\r\n    <h3>TWANG</h3>\r\n</md-toolbar>\r\n');
$templateCache.put('app/twang/twang.navigation.html','<md-sidenav class="md-whiteframe-z2"\r\n            md-component-id="navigation"\r\n            md-is-locked-open="$mdMedia(\'gt-sm\')"\r\n            ng-click="vm.toggleNavigation()">\r\n    <md-list>\r\n        <md-list-item>\r\n            <md-button ui-sref="twang.feed" ui-sref-active-eq="selected">\r\n                <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n                Feed\r\n            </md-button>\r\n        </md-list-item>\r\n        <md-list-item>\r\n            <md-button ui-sref="twang.calendar" ui-sref-active-eq="selected">\r\n                <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n                Calendar\r\n            </md-button>\r\n        </md-list-item>\r\n        <md-list-item>\r\n            <md-button ui-sref="twang.shows" ui-sref-active-eq="selected">\r\n                <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n                Shows\r\n            </md-button>\r\n        </md-list-item>\r\n    </md-list>\r\n</md-sidenav>\r\n');}]);
//# sourceMappingURL=app.js.map
