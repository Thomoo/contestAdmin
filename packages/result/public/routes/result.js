'use strict';

angular.module('mean.result').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('result enter-result', {
      url: '/result/enter-result',
      templateUrl: 'result/views/enter-result.html'
    });
    $stateProvider.state('result select-lists', {
      url: '/result/select-lists',
      templateUrl: 'result/views/select-lists.html'
    });
    $stateProvider.state('result start-lists', {
      url: '/result/start-lists',
      templateUrl: 'result/views/start-lists.html'
    });
    $stateProvider.state('result rankings', {
      url: '/result/rankings',
      templateUrl: 'result/views/rankings.html'
    });
  }
]);
