'use strict';

angular.module('mean.competitor').controller('VerwaltungController', ['$scope', '$log', '$stateParams', 'Global', 'Competitor',
function($scope, $log, $stateParams, Global, Competitor) {
    $scope.global = Global;
    $scope.package = {
        name : 'competitor'
    };
    
    $scope.find = function() {
        $log.info('find called...');
        Competitor.query(function(competitors) {
            $scope.competitors = competitors;
        });
    };
 

}]);

