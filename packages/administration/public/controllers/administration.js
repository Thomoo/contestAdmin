'use strict';

angular.module('mean.administration').controller('AdministrationController', ['$scope', '$location', '$log', 'Global', 'Wettkampf',
function($scope, $location, $log, Global, Wettkampf) {
	$scope.global = Global;
	$scope.package = {
		name : 'administration'
	};
	$scope.hasAuthorization = function() {
		return $scope.global.isAdmin;
	};

	$scope.save = function(isValid) {
		if (isValid) {
			var wettkampf = new Wettkampf({
				title : $scope.wettkampf.title,
				infoText : $scope.wettkampf.infoText,
				anmeldungActive : $scope.wettkampf.anmeldungActive
			});
			wettkampf.$save(function(response) {
				$log.info('saved');
			});
		} else {
			$scope.submitted = true;
		}
	};

	$scope.update = function(isValid) {
		if (isValid) {
			var wettkampf = $scope.wettkampf;
			if (!wettkampf.updated) {
				wettkampf.updated = [];
			}

			wettkampf.$update(function() {
				$log.info('updated');
			});
		} else {
			$scope.submitted = true;
		}
	};

	$scope.loadConfig = function() {
		Wettkampf.get({
		}, function(wettkampf) {
			$scope.wettkampf = wettkampf;
		});
	};
}]);
