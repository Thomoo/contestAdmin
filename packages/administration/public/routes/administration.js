'use strict';

angular.module('mean.administration').config(['$stateProvider',
function($stateProvider) {
	// Check if the user is connected and admin
	var isAdmin = function($q, $timeout, $http, $location) {
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is admin
		$http.get('/isAdmin').success(function(user) {
			// Is Admin
			if (user !== '0'){
				$timeout(deferred.resolve);
			// Not Authenticated
			}else {
				$timeout(deferred.reject);
				$location.url('/login');
			}
		});

		return deferred.promise;
	};

	$stateProvider.state('admin start', {
		url : '/administration',
		templateUrl : 'administration/views/index.html',
		resolve : {
			loggedin : isAdmin
		}
	});

}]);
