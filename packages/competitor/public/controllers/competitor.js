'use strict';

/**
 * Module dependencies.
 */
angular.module('mean.competitor').controller('CompetitorController', ['$scope', '$log', '$location', '$stateParams', 'Global', 'Competitor', 'Wettkampf', 'Disziplin', 'filterFilter',
function($scope, $log, $location, $stateParams, Global, Competitor, Wettkampf, Disziplin, filterFilter) {
    $scope.global = Global;
    $scope.package = {
        name : 'competitor',

    };

    $scope.competitor = '';

    $scope.hasAuthorization = function(competitor) {
        if (!competitor || !competitor.user)
            return false;
        return $scope.global.isAdmin || competitor.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
        $log.info('create competitor called...');
        //        $log.info(JSON.stringify($scope.allDisciplines));
        if (true) {
            // TODO:        if (isValid) {
            var competitorToCreate = new Competitor({
                gender : this.competitor.gender,
                name : this.competitor.name,
                firstname : this.competitor.firstname,
                address : this.competitor.address,
                zip : '' + this.competitor.zip,
                location : this.competitor.location,
                society : this.competitor.society,
                email : this.competitor.email,
                birthdate : this.competitor.birthdate,
                disciplines : $scope.selectDeclaredDisciplines($scope.allDisciplines)
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

    $scope.findOne = function() {
        $log.info('find competitor called... with: ' + $stateParams.competitorId);
        Competitor.get({
            competitorId : $stateParams.competitorId
        }, function(competitor) {
            $scope.competitor = competitor;
            $log.info('competitor disciplines...: ' + JSON.stringify(competitor.disciplines));
            competitor.disciplines.forEach(function(dbDiscipline) {
                $scope.allDisciplines.forEach(function(discipline) {
                    if (discipline._id === dbDiscipline.disciplineId) {
                        $log.info('zwei gleiche Disziplinen gefunden...');
                        discipline.declared = true;
                    }
                });
            });
        });
    };

    $scope.update = function(isValid) {
        $log.info('update competitor called...');
        // TODO:        if (isValid) {
        if (true) {
            var competitor = $scope.competitor;
            competitor.disciplines = $scope.selectDeclaredDisciplines($scope.allDisciplines);

            if (!competitor.updated) {
                competitor.updated = [];
            }
            competitor.updated.push(new Date().getTime());

            competitor.$update(function() {
                $location.path('competitor/verwaltung');
            });
        } else {
            $scope.submitted = true;
        }
    };

    $scope.loadConfig = function() {
        $log.info('loadConfig called...');
        Wettkampf.get({
        }, function(wettkampf) {
            $scope.wettkampf = wettkampf;
        });

        Disziplin.query(function(disciplines) {
            $scope.allDisciplines = disciplines;
        });
    };

    $scope.isPossibleDiscipline = function(discipline) {
        if (($scope.competitor === '') || ($scope.competitor.gender === ''))
            return false;
        if (discipline.geschlecht === 'm' && $scope.competitor.gender === 'female')
            return false;
        if (discipline.geschlecht === 'f' && $scope.competitor.gender === 'male')
            return false;
        // if (discipline.jahrgang_von > $scope.competitor.birthdate)
        // return false;
        // if (discipline.jahrgang_bis < $scope.competitor.birthdate)
        // return false;
        return true;
    };

    $scope.selectDeclaredDisciplines = function(srcDisciplines) {
        //        $log.info('selectDeclaredDisciplines called...');
        var destDisciplines = [];
        srcDisciplines.forEach(function(discipline) {
            if (discipline.declared) {
                //            $log.info('selectDeclaredDisciplines... ' + JSON.stringify(discipline));
                destDisciplines.push({
                    disciplineId : discipline._id
                });
            }
        });
        return destDisciplines;
    };

}]);

