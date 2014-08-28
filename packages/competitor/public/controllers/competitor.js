'use strict';

angular.module('mean.competitor').controller('CompetitorController', ['$scope', 'Global', 'Competitor',
function($scope, Global, Competitor) {
    $scope.global = Global;
    $scope.package = {
        name : 'competitor',

    };
    
    $scope.participant = {
         gender: 'female',
         name: 'Huber',
         firstname: 'Thomas',
         address: 'Alpenstrasse 20',
         zip: 3084,
         city: 'Wabern',
         society: 'TV Spiez',
         email: 'huber.tom@swissonline.ch',
         birthdate: new Date()
     }

    $scope.disciplines = [{
        declared : true,
        name : 'Sprint',
        result : '9.50'
    }, {
        declared : false,
        name : 'Sprint',
        result : '9.50'
    }]

}]);

