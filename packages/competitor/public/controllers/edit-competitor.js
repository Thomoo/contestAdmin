'use strict';

angular.module('mean.competitor').controller('EditCompetitorController', ['$scope', '$routeParams', 'Global', 'Competitor',
    function($scope, $routeParams, Global, Competitor) {
        $scope.global = Global;
        $scope.package = {
            name: 'competitor'
        };

        $scope.find = function() {
            Competitor.query(function(competitors) {
                $scope.participant = competitors.find($routeParams.id);
            });
        };

    }
]);

