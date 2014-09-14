'use strict';

angular.module('mean.result').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('result enter-result', {
      url: '/result/enter-result',
      templateUrl: 'result/views/enter-result.html'
    });
    $stateProvider.state('result lists', {
      url: '/result/lists',
      templateUrl: 'result/views/lists.html'
    });
  }
]);
