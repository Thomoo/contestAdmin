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
    $stateProvider.state('verwaltung', {
      url: '/competitor/verwaltung',
      templateUrl: 'competitor/views/verwaltung.html'
    });
  }
]);
