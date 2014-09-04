'use strict';

angular.module('mean.competitor').controller('EditCompetitorController', ['$scope', '$log', '$stateParams', 'Global', 'Competitor',
function($scope, $log, $stateParams, Global, Competitor) {
    $scope.global = Global;
    $scope.package = {
        name : 'competitor'
    };
    $scope.findOne = function() {
        $log.info('find one competitor called... with: ' + $stateParams.competitorId);
        Competitor.get({
            competitorId : $stateParams.competitorId
        }, function(competitor) {
            $scope.competitor = competitor;
        });
    };

}]);

