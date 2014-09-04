'use strict';

angular.module('mean.competitor').config(['$stateProvider',
function($stateProvider) {
    $stateProvider.state('anmeldung', {
        url : '/competitor/anmeldung',
        templateUrl : 'competitor/views/anmeldung.html'
    }).state('verwaltung', {
        url : '/competitor/verwaltung',
        templateUrl : 'competitor/views/verwaltung.html'
    }).state('competitor by id', {
        url : '/competitor/:competitorId',
        templateUrl : 'competitor/views/edit-competitor.html'
    });
}]);
