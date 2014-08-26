'use strict';

angular.module('mean.competitor').controller('EditCompetitorController', ['$scope', 'Global', 'Competitor',
    function($scope, Global, Competitor) {
        $scope.global = Global;
        $scope.package = {
            name: 'competitor'
        };
    }
]);

