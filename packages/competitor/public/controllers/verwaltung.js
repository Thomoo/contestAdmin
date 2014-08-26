'use strict';

angular.module('mean.competitor').controller('VerwaltungController', ['$scope', 'Global', 'Competitor',
    function($scope, Global, Competitor) {
        $scope.global = Global;
        $scope.package = {
            name: 'competitor'
        };
    }
]);

