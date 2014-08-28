'use strict';

angular.module('mean.result').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('result enterResult', {
      url: '/result/example',
      templateUrl: 'result/views/enterResult.html'
    });
    $stateProvider.state('result chooseList', {
      url: '/result/example',
      templateUrl: 'result/views/chooseList.html'
    });
  }
]);
