(function (){
	'use strict';

	angular
		.module('app.dashboard')
		.directive('channelStream', channelStream);

	function channelStream() {
		var directive = {
			restrict: 'EA',
			replace: true,
			templateUrl: 'app/dashboard/channel-stream.html',
			scope: {
				stream: '='
			},
			controller: ChannelStreamController,
			controllerAs: 'model',
			bindToController: true
		};

		return directive;
	};

	function ChannelStreamController() {
		var model = this;
	}
})();