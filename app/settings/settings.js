(function(){
	'use strict';

	angular
		.module('app.settings')
		.controller('settingsController', SettingsController);

	SettingsController.$inject = [ 'userService', 'twitchSearch', 'twitchChannels' ];

	function SettingsController(userService, twitchSearch, twitchChannels) {
		var viewModel = this;
		viewModel.channels = [];
		viewModel.searchStreams = searchStreams;
		viewModel.addChannel = addChannel;
		viewModel.removeChannel = removeChannel;

		activate();

		function activate() {
			viewModel.games = userService.getGames();
			viewModel.channels = userService.getChannels();
		}

		function addChannel(channel) {
			userService.addChannel(channel.name, channel.display_name, channel.logo);
			activate();
		}

		function removeChannel(channel) {
			userService.removeChannel(channel.name);
			activate();
		}

		function searchStreams(query) {
			return twitchSearch.streams(query)
				.then(searchStreamsCompleted);

			function searchStreamsCompleted(data) {
				if (!data.error && data.streams.length > 0) {
					return data.streams;
				}

				return twitchChannels.getByName(query)
					.then(channelsGetByNameCompleted);
			}

			function channelsGetByNameCompleted(data) {
				if (data.error) {
					return [];
				}

				return [
					{
						channel: data,
						game: 'nothing right now'
					}];
			}
		}
	}
})();