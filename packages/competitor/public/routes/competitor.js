'use strict';

angular.module('mean.competitor').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('anmeldung', {
            url: '/competitor/anmeldung',
            templateUrl: 'competitor/views/anmeldung.html'
        });
    }
]);

angular.module('mean.competitor').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('bearbeiten', {
            url: '/competitor/bearbeiten/:id',
            templateUrl: 'competitor/views/edit-competitor.html'
        });
    }
]);

angular.module('mean.competitor').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('verwaltung', {
      url: '/competitor/verwaltung',
      templateUrl: 'competitor/views/verwaltung.html'
    });
  }
]);
