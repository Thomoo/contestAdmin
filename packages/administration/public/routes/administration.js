'use strict';

angular.module('mean.administration').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('administration example page', {
      url: '/administration/example',
      templateUrl: 'administration/views/index.html'
    });
  }
]);
