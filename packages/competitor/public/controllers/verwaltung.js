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


    // ------- validators -------

    $scope.validateStartNbr = function(data, competitor) {
        // TODO: check if competitor.startnrfetched evaluates as expected
        if(competitor.startnrfetched && !data.match('^\\d+$')) {
            return 'Die Startnummer muss aus Zahlen bestehen.';
        }
    };

    // ------- end validators -------



}]);

