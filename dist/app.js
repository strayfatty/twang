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
        .module('twang.channels', [
            'blocks.user',
            'blocks.twitch'
        ]);
}());
(function () {
    'use strict';

    angular
        .module('twang.dashboard', [
            'blocks.user',
            'blocks.twitch'
        ]);
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
(function () {
    'use strict';

    angular
        .module('app')
        .constant('twitchConfig', {
            client_id: '7ikopbkspr7556owm9krqmalvr2w0i4'
        });
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

    TwitchChannels.$inject = ['blocks.twitch.client'];

    function TwitchChannels(twitchClient) {
        return {
            getByName: getByName,
        };

        function getByName(name) {
            return twitchClient.get('channels/' + name);
        }
    };
}());
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
(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.search', TwitchSearch);

    TwitchSearch.$inject = ['blocks.twitch.client'];

    function TwitchSearch(twitchClient) {
        return {
            streams: streams,
            games: games
        };

        function streams(query, limit, offset) {
            var params = {
                q: query,
                limit: limit,
                offset: offset
            };

            return twitchClient.get('search/streams', params)
              .then(getCompleted);

            function getCompleted(response) {
                return response.streams;
            }
        }

        function games(query, live) {
            var params = {
                type: 'suggest',
                q: query,
                live: live
            };

            return twitchClient.get('search/games', params)
                .then(getCompleted);

            function getCompleted(response) {
                return response.games;
            }
        };
    };
}());
(function(){
    'use strict';

    angular
        .module('blocks.twitch')
        .factory('blocks.twitch.streams', TwitchStreams);

    TwitchStreams.$inject = ['blocks.twitch.client'];

    function TwitchStreams(twitchClient) {
        return {
            getByGame: getByGame,
            getByChannel: getByChannel
        };

        function getByGame(game, limit, offset) {
            var params = {
                game: game,
                limit: limit,
                offset: offset
            };

            return twitchClient.get('streams', params);
        }

        function getByChannel(channel, limit, offset) {
            var params = {
                channel: channel,
                limit: limit,
                offset: offset
            };

            return twitchClient.get('streams', params);
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
(function() {
    'use strict';

    angular
        .module('twang.channels')
        .controller('twang.channels.controller', ChannelsController);

    ChannelsController.$inject = ['$q', '$mdToast', 'blocks.user.service', 'blocks.twitch.search', 'blocks.twitch.channels'];

    function ChannelsController($q, $mdToast, userService, twitchSearch, twitchChannels) {
        var vm = this;
        vm.channels = [];
        vm.search = search;
        vm.add = add;
        vm.remove = remove;

        activate();

        function activate() {
            return userService.getChannels()
                .then(setChannels);
        }

        function setChannels(channels) {
            vm.channels = channels;
        }

        function search(searchText) {
            var promises = [
                twitchChannels.getByName(searchText),
                twitchSearch.streams(searchText)
            ];

            return $q.all(promises)
                .then(combine);

            function combine(responses) {
                var channel = responses[0];
                var channels = responses[1].map(function (stream) { return stream.channel; });

                if (channel && channel._id) {
                    channels = channels.filter(function (element) { return element.name != channel.name; });
                    channels.unshift(channel);
                }

                return channels;
            }
        }

        function add(channel) {
            if (!channel) {
                return;
            }

            return userService.addChannel(channel)
                .then(setChannels)
                .then(function () { return $mdToast.showSimple(channel.display_name + " added"); });
        }

        function remove(channel) {
            if (!channel) {
                return;
            }

            return userService.removeChannel(channel)
                .then(setChannels)
                .then(function () { return $mdToast.showSimple(channel.display_name + " removed"); })
        }
    }
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
                        templateUrl: 'app/twang/channels/channels.html',
                        controller: 'twang.channels.controller',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: 'Channels'
                }
            });
    }
}());
(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardChannelList', dashboardChannelList);

    function dashboardChannelList() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: { },
            templateUrl: 'app/twang/dashboard/dashboard.channel.list.html',
            controller: DashboardChannelListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardChannelListController.$inject = ['blocks.user.service', 'blocks.twitch.streams'];

    function DashboardChannelListController(userService, twitchStreams) {
        var vm = this;
        vm.streams = [];

        activate();

        function activate() {
            return userService.getChannels()
                .then(getStreams);
        }

        function getStreams(channels) {
            var channel = "";
            channels.forEach(function (element) {
                channel += element.name + ',';
            });

            return twitchStreams.getByChannel(channel, channels.length, 0)
                .then(setStreams);
        }

        function setStreams(response) {
            vm.streams = response.streams;
        }
    }
}());
(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .controller('twang.dashboard.controller', DashboardController);

    DashboardController.$inject = ['blocks.user.service'];

    function DashboardController(userService) {
        var vm = this;
        vm.channels = [];
        vm.games = [];

        activate();

        function activate() {
            return userService.getGames()
                .then(function (games) { vm.games = games; });
        }
    }
}());
(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardGame', dashboardGame);

    function dashboardGame() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: {
                game: '='
            },
            templateUrl: 'app/twang/dashboard/dashboard.game.html',
            controller: DashboardGameController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardGameController.$inject = ['blocks.twitch.streams'];

    function DashboardGameController(twitchStreams) {
        var vm = this;
        vm.streams = [];

        activate();

        function activate() {
            return twitchStreams.getByGame(vm.game.name, 4, 0)
                .then(setStreams);
        }

        function setStreams(response) {
            vm.streams = response.streams;
        }
    }
}());
(function() {
    'use strict';

    angular
        .module('twang.dashboard')
        .directive('dashboardGameList', dashboardGameList);

    function dashboardGameList() {
        var directive = {
            restrict: 'E',
            replace: false,
            scope: { },
            templateUrl: 'app/twang/dashboard/dashboard.game.list.html',
            controller: DashboardGameListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    DashboardGameListController.$inject = ['blocks.user.service'];

    function DashboardGameListController(userService) {
        var vm = this;
        vm.games = [];

        activate();

        function activate() {
            return userService.getGames()
                .then(setGames);
        }

        function setGames(games) {
            vm.games = games;
        }
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
                        templateUrl: 'app/twang/dashboard/dashboard.html',
                        controller: 'twang.dashboard.controller',
                        controllerAs: 'vm'
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
(function() {
    'use strict';

    angular
        .module('twang.games')
        .controller('twang.games.controller', GamesController);

    GamesController.$inject = ['$mdToast', 'blocks.user.service', 'blocks.twitch.search'];

    function GamesController($mdToast, userService, twitchSearch) {
        var vm = this;
        vm.games = [];
        vm.search = search;
        vm.add = add;
        vm.remove = remove;

        activate();

        function activate() {
            return userService.getGames()
                .then(setGames);
        }

        function setGames(games) {
            vm.games = games;
        }

        function search(searchText) {
            return twitchSearch.games(searchText);
        }

        function add(game) {
            if (!game) {
                return;
            }

            return userService.addGame(game)
                .then(setGames)
                .then(function () { return $mdToast.showSimple(game.name + " added"); });
        }

        function remove(game) {
            if (!game) {
                return;
            }

            return userService.removeGame(game)
                .then(setGames)
                .then(function () { return $mdToast.showSimple(game.name + " removed"); })
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
angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('app/twang/channels/channels.html','<div layout="row" layout-sm="column" layout-xs="column" layout-wrap>\r\n    <md-autocomplete flex="100"\r\n                     md-search-text="searchText"\r\n                     md-selected-item="selectedItem"\r\n                     md-item-text="item.name"\r\n                     md-items="item in vm.search(searchText)"\r\n                     md-delay="200"\r\n                     md-autoselect="true"\r\n                     md-selected-item-change="vm.add(selectedItem); searchText = \'\'; selectedItem = null"\r\n                     placeholder="Add a channel">\r\n        <md-item-template>{{ item.display_name }}</md-item-template>\r\n    </md-autocomplete>\r\n    <div flex flex-gt-sm="50" flex-gt-md="33" ng-repeat="channel in vm.channels | orderBy:\'display_name\'">\r\n        <md-card>\r\n            <md-card-title>\r\n                <md-card-title-text>\r\n                    <span class="md-headline">{{ channel.display_name }}</span>\r\n                </md-card-title-text>\r\n                <md-card-title-media>\r\n                    <img class="md-media-md" ng-src="{{ channel.logo }}">\r\n                </md-card-title-media>\r\n            </md-card-title>\r\n            <md-card-actions layout="row" layout-align="end center">\r\n                <md-button href="{{ channel.url }}" target="_blank">View</md-button>\r\n                <md-button ng-click="vm.remove(channel)">Remove</md-button>\r\n            </md-card-actions>\r\n        </md-card>\r\n    </div>\r\n</div>');
$templateCache.put('app/twang/dashboard/dashboard.channel.list.html','<h3 class="heading">Channels</h3>\r\n<md-divider></md-divider>\r\n<dashboard-stream stream="stream" show-game-title="true" ng-repeat="stream in vm.streams"></dashboard-stream>\r\n');
$templateCache.put('app/twang/dashboard/dashboard.game.html','<h3 class="heading" ng-class="{ \'ng-hide\': vm.streams.length == 0 }">{{ vm.game.name }}</h3>\r\n<md-divider ng-class="{ \'ng-hide\': vm.streams.length == 0 }"></md-divider>\r\n<div ng-class="{ \'ng-hide\': vm.streams.length == 0 }" layout="row" layout-sm="column" layout-xs="column">\r\n    <div flex flex-gt-sm="50" flex-gt-md="25" ng-repeat="stream in vm.streams">\r\n        <dashboard-stream stream="stream" show-game-title="false"></dashboard-stream>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('app/twang/dashboard/dashboard.game.list.html','<dashboard-game game="game" ng-repeat="game in vm.games | orderBy:\'name\'">\r\n</dashboard-game>\r\n\r\n');
$templateCache.put('app/twang/dashboard/dashboard.html','<div layout="row" layout-sm="column" layout-xs="column">\r\n    <div flex flex-gt-sm="25" layout="column" layout-padding>\r\n        <dashboard-channel-list></dashboard-channel-list>\r\n    </div>\r\n    <div flex flex-gt-sm="75" layout="column" layout-padding>\r\n        <dashboard-game-list></dashboard-game-list>\r\n    </div>\r\n</div>');
$templateCache.put('app/twang/dashboard/dashboard.stream.html','<md-card class="stream">\r\n    <img class="md-card-image" ng-src="{{ vm.stream.preview.medium }}" ng-click="vm.showPreview()">\r\n    <md-card-header>\r\n        <md-card-avatar>\r\n            <img ng-src="{{ vm.stream.channel.logo }}">\r\n        </md-card-avatar>\r\n        <md-card-header-text>\r\n            <span class="md-title">{{ vm.stream.channel.display_name }}</span>\r\n            <span class="md-subhead">{{ vm.stream.viewers }} viewers</span>\r\n        </md-card-header-text>\r\n    </md-card-header>\r\n    <md-card-title ng-if="vm.showGameTitle">\r\n        <md-card-title-text>\r\n            <span class="md-headline">{{ vm.stream.game }}</span>\r\n        </md-card-title-text>\r\n    </md-card-title>\r\n    <md-card-content><span>{{ vm.stream.channel.status }}</span></md-card-content>\r\n    <md-card-actions layout="row" layout-align="end center">\r\n        <md-button href="{{ vm.stream.channel.url }}" target="_blank">Watch</md-button>\r\n    </md-card-actions>\r\n</md-card>');
$templateCache.put('app/twang/games/games.html','<div layout="row" layout-sm="column" layout-xs="column" layout-wrap>\r\n    <md-autocomplete flex="100"\r\n                     md-search-text="searchText"\r\n                     md-selected-item="selectedItem"\r\n                     md-item-text="item.name"\r\n                     md-items="item in vm.search(searchText)"\r\n                     md-delay="200"\r\n                     md-autoselect="true"\r\n                     md-selected-item-change="vm.add(selectedItem); searchText = \'\'; selectedItem = null"\r\n                     placeholder="Add a game">\r\n        <md-item-template>{{ item.name }}</md-item-template>\r\n    </md-autocomplete>\r\n    <div flex flex-gt-sm="50" flex-gt-md="33" ng-repeat="game in vm.games | orderBy:\'name\'">\r\n        <md-card>\r\n            <md-card-title>\r\n                <md-card-title-text>\r\n                    <span class="md-headline">{{ game.name }}</span>\r\n                </md-card-title-text>\r\n                <md-card-title-media>\r\n                    <img class="md-media-md" ng-src="{{ game.box.medium }}">\r\n                </md-card-title-media>\r\n            </md-card-title>\r\n            <md-card-actions layout="row" layout-align="end center">\r\n                <md-button href="https://www.twitch.tv/directory/game/{{ game.name }}" target="_blank">View</md-button>\r\n                <md-button ng-click="vm.remove(game)">Remove</md-button>\r\n            </md-card-actions>\r\n        </md-card>\r\n    </div>\r\n</div>');
$templateCache.put('app/twang/twang.header.html','<md-toolbar class="md-hue-1" layout="row">\r\n    <div class="md-toolbar-tools">\r\n        <md-button class="md-icon-button menu" aria-label="menu" hide-gt-sm ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-icon="menu"></md-icon>\r\n        </md-button>\r\n        <h2>{{ vm.state.current.data.title }}</h2>\r\n    </div>\r\n</md-toolbar>\r\n');
$templateCache.put('app/twang/twang.navigation.html','<md-toolbar class="md-hue-3">\r\n    <h3 class="title">TWANG</h3>\r\n</md-toolbar>\r\n<md-divider></md-divider>\r\n<md-list>\r\n    <md-list-item>\r\n        <md-button ui-sref="twang.dashboard" ui-sref-active-eq="selected" ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n            Dashboard\r\n        </md-button>\r\n    </md-list-item>\r\n    <md-list-item>\r\n        <md-button ui-sref="twang.channels" ui-sref-active-eq="selected" ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n            Channels\r\n        </md-button>\r\n    </md-list-item>\r\n    <md-list-item>\r\n        <md-button ui-sref="twang.games" ui-sref-active-eq="selected" ng-click="vm.toggleNavigation()">\r\n            <md-icon md-svg-src="images/menu.svg"></md-icon>\r\n            Games\r\n        </md-button>\r\n    </md-list-item>\r\n</md-list>\r\n');}]);
//# sourceMappingURL=app.js.map
