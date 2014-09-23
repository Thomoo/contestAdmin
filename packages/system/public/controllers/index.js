'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$log', 'Global',
  function($scope, $log, Global) {
    $scope.global = Global;
    $log.info('isAdmin: ' + $scope.global.isAdmin +
             '; isCompetitorAdmin: ' + $scope.global.isCompetitorAdmin +
             '; isResultAdmin: ' + $scope.global.isResultAdmin);
  }
]);
