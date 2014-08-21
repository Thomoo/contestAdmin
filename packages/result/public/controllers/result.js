'use strict';

angular.module('mean.result').controller('ResultController', ['$scope', 'Global', 'Result',
  function($scope, Global, Result) {
    $scope.global = Global;
    $scope.package = {
      name: 'result'
    };
  }
]);
