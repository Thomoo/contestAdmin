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


    // ------- static data -------
    $scope.genderOptions = [{
        value : 'male',
        text : 'männlich'
    }, {
        value : 'female',
        text : 'weiblich'
    }, {
        value : 'other',
        text : 'unentschlossen'
    }];

    $scope.showGender = function(competitor) {
        var selected = [];
        if(competitor.gender){
            selected = $filter('filter')($scope.genderOptions, {
                value : competitor.gender
            });
        }
        return selected.length ? selected[0].text : 'Not set';
    };



    // ------- end static data -------


    // ------- filters -------



    // ------- end filters -------



}]);

