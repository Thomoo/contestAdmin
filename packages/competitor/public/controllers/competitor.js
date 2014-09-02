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
            var competitor = new Competitor({
                gender : this.participant.gender,
                name : this.participant.name,
                firstname: this.participant.firstname,
                address: this.participant.address,
                zip: this.participant.zip,
                location: this.participant.city,
                society: this.participant.society,
                email: this.participant.email,
                birthdate: this.participant.birthdate
//                disciplines: this.disciplines
            });
            competitor.$save(function(response) {
                $location.path('competitor/' + response._id);
            });
            this.participant.gender = '';
            this.participant.name = '';
            this.participant.firstname = '';
            this.participant.address = '';
            this.participant.zip = '';
            this.participant.city = '';
            this.participant.society = '';
            this.participant.email = '';
            this.participant.birthdate = new Date();
        } else {
            $scope.participant.submitted = true;
        }
    };

    $scope.participant = {
        gender : 'female',
        name : 'Huber',
        firstname : 'Thomas',
        address : 'Alpenstrasse 20',
        zip : 3084,
        city : 'Wabern',
        society : 'TV Spiez',
        email : 'huber.tom@swissonline.ch',
        birthdate : new Date()
    };

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

