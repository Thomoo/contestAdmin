'use strict';

angular.module('mean.competitor').config(['$stateProvider',
function($stateProvider) {
	// Check if the user is connected and a Competitor admin
	var isCompetitorAdmin = function($q, $timeout, $http, $location) {
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is admin
		$http.get('/isCompetitorAdmin').success(function(user) {
			// Is Competitor Admin
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
		
    $stateProvider.state('anmeldung', {
        url : '/competitor/anmeldung',
        templateUrl : 'competitor/views/anmeldung.html',
		resolve : {
			loggedin : isCompetitorAdmin
		}
    }).state('verwaltung', {
        url : '/competitor/verwaltung',
        templateUrl : 'competitor/views/verwaltung.html',
		resolve : {
			loggedin : isCompetitorAdmin
		}
    }).state('edit competitor by id', {
        url : '/competitor/:competitorId',
        templateUrl : 'competitor/views/edit-competitor.html',
		resolve : {
			loggedin : isCompetitorAdmin
		}
    }).state('confirm competitor by id', {
        url : '/competitor/bestaetigung/:competitorId',
        templateUrl : 'competitor/views/subscription-confirmation.html',
		resolve : {
			loggedin : isCompetitorAdmin
		}
    });
}]);
