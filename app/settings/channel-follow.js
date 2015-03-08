(function (){
	'use strict';

	angular
		.module('app.settings')
		.directive('channelFollow', channelFollow);

	function channelFollow() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/settings/channel-follow.html',
			scope: {
				channel: '=',
				remove: '=',
			},
			controller: ChannelFollowController,
			controllerAs: 'viewModel',
			bindToController: true
		};

		return directive;
	};

	function ChannelFollowController() {
		var viewModel = this;
	}
})();