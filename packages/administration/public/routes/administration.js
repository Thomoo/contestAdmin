'use strict';

angular.module('mean.administration').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('admin start', {
      url: '/administration',
      templateUrl: 'administration/views/index.html'
    });
  }
]);
