'use strict';

angular.module('mean.result').config(['$stateProvider',
  function($stateProvider) {
	// Check if the user is connected and result admin
	var isResultAdmin = function($q, $timeout, $http, $location) {
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is admin
		$http.get('/isResultAdmin').success(function(user) {
			// Is Result Admin
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
  	
    $stateProvider.state('result enter-result', {
      url: '/result/enter-result',
      templateUrl: 'result/views/enter-result.html',
		resolve : {
			loggedin : isResultAdmin
		}
    });
    $stateProvider.state('result select-lists', {
      url: '/result/select-lists',
      templateUrl: 'result/views/select-lists.html',
		resolve : {
			loggedin : isResultAdmin
		}
    });
    $stateProvider.state('result start-lists', {
      url: '/result/start-lists',
      templateUrl: 'result/views/start-lists.html',
		resolve : {
			loggedin : isResultAdmin
		}
    });
    $stateProvider.state('result rankings', {
      url: '/result/rankings',
      templateUrl: 'result/views/rankings.html',
		resolve : {
			loggedin : isResultAdmin
		}
    });
  }
]);
