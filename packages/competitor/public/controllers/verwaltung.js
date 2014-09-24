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

    // daten aufbereiten
    $scope.genders = [{
        value : 'male',
        text : 'männlich'
    }, {
        value : 'female',
        text : 'weiblich'
    }];

    $scope.showGender = function(competitor){
        var selected = [];
        if (competitor.gender) {
            selected = $filter('filter')($scope.genders, {
                value : competitor.gender
            });
        }
        return selected.length ? selected[0].text : 'Not set';
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

    $scope.generateStartNr = function(competitor){
        if(!competitor.startnr) {
            competitor.$toggleStartNr();
        }
    };

    $scope.removeStartNr = function(competitor){
        var msg = 'Willst du die Startnummer von ' + competitor.firstname + ' ' + competitor.name + ' wirklich entfernen? \n\nDies darf nur gemacht werden, wenn der Teilnehmer die Nummer noch nicht abgeholt hat!';
        if(confirm(msg) && competitor.startnr) {
            competitor.$toggleStartNr();
        }
    };


    // ------- filters -------



    // ------- end filters -------



}]);

