'use strict';

angular.module('mean.competitor').controller('VerwaltungController', ['$scope', '$location', '$filter', '$log', '$stateParams', 'Global', 'Competitor',
function($scope, $location, $filter, $log, $stateParams, Global, Competitor) {    $scope.global = Global;
    $scope.package = {
        name : 'competitor'
    };
    
    $scope.find = function() {
        $log.info('find called...');
        Competitor.query(function(competitors) {
            $scope.competitors = competitors;
        });
    };

    $scope.navigateToDetails = function(competitor){
        $location.path('/competitor/' + competitor._id);
    };

    $scope.resetSearchForm = function(){
        $scope.search = {};
    };

    $scope.searchFormEmpty = function(){
        return (!$scope.search || (!$scope.search.startnr && !$scope.search.$));
    };


    // ------- filters -------



    // ------- end filters -------



}]);

