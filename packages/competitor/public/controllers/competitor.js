'use strict';

angular.module('mean.competitor').controller('CompetitorController', ['$scope', 'Global', 'Competitor',
  function($scope, Global, Competitor) {
    $scope.global = Global;
    $scope.package = {
      name: 'competitor'
    };
  }
]);
