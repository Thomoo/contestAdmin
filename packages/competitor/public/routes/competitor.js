'use strict';

angular.module('mean.competitor').config(['$stateProvider',
function($stateProvider) {
    $stateProvider.state('anmeldung', {
        url : '/competitor/anmeldung',
        templateUrl : 'competitor/views/anmeldung.html'
    }).state('verwaltung', {
        url : '/competitor/verwaltung',
        templateUrl : 'competitor/views/verwaltung.html'
    }).state('edit competitor by id', {
        url : '/competitor/:competitorId',
        templateUrl : 'competitor/views/edit-competitor.html'
    }).state('confirm competitor by id', {
        url : '/competitor/bestaetigung/:competitorId',
        templateUrl : 'competitor/views/subscription-confirmation.html'
    });
}]);
