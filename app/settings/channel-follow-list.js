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
			controllerAs: 'model',
			bindToController: true
		};

		return directive;
	};

	ChannelFollowListController.$inject = [ 'userService', 'twitchSearch', 'twitchChannels' ];

	function ChannelFollowListController(userService, twitchSearch, twitchChannels) {
		var model = this;
		model.channels = [];
		model.add = add;
		model.remove = remove;
		model.search = search;

		activate();

		function activate() {
			model.channels = userService.getChannels();
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