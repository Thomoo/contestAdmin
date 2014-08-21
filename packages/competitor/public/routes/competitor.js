'use strict';

angular.module('mean.competitor').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('competitor example page', {
      url: '/competitor/example',
      templateUrl: 'competitor/views/index.html'
    });
  }
]);
