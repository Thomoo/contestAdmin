'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$log', 'Global', 'Wettkampf', 
function($scope, $log, Global, Wettkampf) {
    $scope.global = Global;
    $log.info('isAdmin: ' + $scope.global.isAdmin + '; isCompetitorAdmin: ' + $scope.global.isCompetitorAdmin + '; isResultAdmin: ' + $scope.global.isResultAdmin);

    $scope.loadConfig = function() {
        $log.info('loadConfig called...');
        Wettkampf.get({
        }, function(wettkampf) {
            $scope.wettkampf = wettkampf;
            if (wettkampf.anmeldungActive) {
                $scope.subscriptionActive = true;
            }
        });
    };
}]);
