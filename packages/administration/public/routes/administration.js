'use strict';

angular.module('mean.administration').config(['$stateProvider',
function($stateProvider) {
	// Check if the user is connected and admin
	var checkLoggedin = function($q, $timeout, $http, $location) {
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is logged in
		$http.get('/isAdmin').success(function(user) {
			// Authenticated
			console.log('User: ' + JSON.stringify(user));
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
			loggedin : checkLoggedin
		}
	});

}]);
