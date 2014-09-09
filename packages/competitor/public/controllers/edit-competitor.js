'use strict';

angular.module('mean.competitor').controller('EditCompetitorController', ['$scope', '$log', '$location', '$stateParams', 'Global', 'Competitor',
function($scope, $log, $location, $stateParams, Global, Competitor) {
    $scope.global = Global;
    $scope.package = {
        name : 'competitor'
    };
    $scope.findOne = function() {
        $log.info('find competitor called... with: ' + $stateParams.competitorId);
        Competitor.get({
            competitorId : $stateParams.competitorId
        }, function(competitor) {
            $scope.competitor = competitor;
        });
    };
    
    $scope.update = function(isValid) {
      $log.info('update competitor called...');
// TODO:        if (isValid) {
      if (true) {
        var competitor = $scope.competitor;
        if (!competitor.updated) {
          competitor.updated = [];
        }
        competitor.updated.push(new Date().getTime());

        competitor.$update(function() {
          $location.path('competitor/verwaltung');
        });
      } else {
        $scope.submitted = true;
      }
    };

}]);

