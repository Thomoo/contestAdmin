'use strict';

angular.module('mean.result').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('result example page', {
      url: '/result/example',
      templateUrl: 'result/views/index.html'
    });
  }
]);
