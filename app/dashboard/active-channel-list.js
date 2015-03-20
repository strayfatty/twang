(function (){
	'use strict';

	angular
		.module('app.dashboard')
		.directive('activeChannelList', activeChannelList);

	function activeChannelList() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/dashboard/active-channel-list.html',
			scope: {
			},
			controller: ActiveChannelListController,
			controllerAs: 'model',
			bindToController: true
		};

		return directive;
	};

	ActiveChannelListController.$inject = [ 'userService', 'twitchStreams' ];

	function ActiveChannelListController(userService, twitchStreams) {
		var model = this;
		model.channels = [];

		activate();

		function activate() {
			var channel = "";
			var channels = userService.getChannels();
			channels.forEach(function (value) {
				channel += value.name + ",";
			});

			twitchStreams.getByChannel(channel, channels.length, 0)
				.then(function (data) {
					model.channels = data.streams;
				});
		}
	}
})();