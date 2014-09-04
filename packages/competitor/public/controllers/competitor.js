'use strict';

angular.module('mean.competitor').controller('CompetitorController', ['$scope', '$log', '$location', 'Global', 'Competitor',
function($scope, $log, $location, Global, Competitor) {
    $scope.global = Global;
    $scope.package = {
        name : 'competitor',

    };

    $scope.hasAuthorization = function(competitor) {
        if (!competitor || !competitor.user)
            return false;
        return $scope.global.isAdmin || competitor.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
        $log.info('create competitor called...');
        if (true) {
// TODO:        if (isValid) {
            var competitorToCreate = new Competitor({
                gender : this.competitor.gender,
                name : this.competitor.name,
                firstname: this.competitor.firstname,
                address: this.competitor.address,
                zip: '' + this.competitor.zip,
                location: this.competitor.location,
                society: this.competitor.society,
                email: this.competitor.email,
                birthdate: this.competitor.birthdate
//                disciplines: this.disciplines
            });
            competitorToCreate.$save(function(response) {
                $location.path('competitor/' + response._id);
            });
            this.competitor.gender = '';
            this.competitor.name = '';
            this.competitor.firstname = '';
            this.competitor.address = '';
            this.competitor.zip = '';
            this.competitor.location = '';
            this.competitor.society = '';
            this.competitor.email = '';
            this.competitor.birthdate = new Date();
        } else {
            $scope.competitor.submitted = true;
        }
    };

    // $scope.competitor = {
        // gender : 'female',
        // name : 'Huber',
        // firstname : 'Thomas',
        // address : 'Alpenstrasse 20',
        // zip : 3084,
        // location : 'Wabern',
        // society : 'TV Spiez',
        // email : 'huber.tom@swissonline.ch',
        // birthdate : new Date()
    // };

    $scope.disciplines = [{
        declared : true,
        name : 'Sprint',
        result : '9.50'
    }, {
        declared : false,
        name : 'Sprint',
        result : '9.50'
    }];

}]);

