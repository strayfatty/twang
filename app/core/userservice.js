(function(window) {
	'use strict';

	angular
		.module('app.core')
		.factory('userService', UserService);

	UserService.$inject = [];

	function UserService() {
		var service = {};
		service.addGame = addGame;
		service.removeGame = removeGame;
		service.addChannel = addChannel;
		service.removeChannel = removeChannel;
		service.getGames = getGames;
		service.getChannels = getChannels;

		return service;

		function addGame(name, image) {
			var games = service.getGames();
			if (games.map(function(value) { return value.name; }).indexOf(name) >= 0) {
				return;
			}

			games.push({ name: name, image: image });
			window.localStorage['twang.games'] = JSON.stringify(games);
		}

		function removeGame(name) {
			var games = service.getGames();
			var index = games.map(function(value) { return value.name; }).indexOf(name);
			if (index < 0) {
				return;
			}

			games.splice(index, 1);
			window.localStorage['twang.games'] = JSON.stringify(games);
		}

		function addChannel(name, display_name, image) {
			var channels = service.getChannels();
			if (channels.map(function(value) { return value.name; }).indexOf(name) >= 0) {
				return;
			}

			channels.push({ name: name, display_name: display_name, image: image});
			window.localStorage['twang.channels']= JSON.stringify(channels);
		}

		function removeChannel(name) {
			var channels = service.getChannels();
			var index = channels.map(function(value) { return value.name }).indexOf(name);
			if (index < 0) {
				return;
			}

			channels.splice(index, 1);
			window.localStorage['twang.channels']= JSON.stringify(channels);
		}

		function getGames() {
			var games = window.localStorage['twang.games'] || '[]';
			return JSON.parse(games);
		}

		function getChannels() {
			var channels = window.localStorage['twang.channels'] || '[]';
			return JSON.parse(channels);
		}
	}
})(window);