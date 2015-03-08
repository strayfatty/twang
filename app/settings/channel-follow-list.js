(function (){
	'use strict';

	angular
		.module('app.settings')
		.directive('channelFollowList', channelFollowList);

	function channelFollowList() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/settings/channel-follow-list.html',
			scope: {
			},
			controller: ChannelFollowListController,
			controllerAs: 'viewModel',
			bindToController: true
		};

		return directive;
	};

	ChannelFollowListController.$inject = [ 'userService', 'twitchSearch', 'twitchChannels' ];

	function ChannelFollowListController(userService, twitchSearch, twitchChannels) {
		var viewModel = this;
		viewModel.channels = [];
		viewModel.add = add;
		viewModel.remove = remove;
		viewModel.search = search;

		activate();

		function activate() {
			viewModel.channels = userService.getChannels();
		}

		function add(channel) {
			userService.addChannel(channel.name, channel.display_name, channel.logo);
			activate();
		}

		function remove(channel) {
			userService.removeChannel(channel.name);
			activate();
		}

		function search(query) {
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