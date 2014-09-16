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
        if (!competitor)
        // if (!competitor || !competitor.user)
            return false;
        return $scope.global.isAdmin;
    };

    $scope.create = function(isValid) {
        $log.info('create competitor called...: ' + isValid);
        if (isValid) {
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
                $location.path('competitor/bestaetigung/' + response._id);
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

    $scope.loadAllDisziplinsAndFindOne = function() {
        $log.info('loadAllDisziplinsAndFindOne called...');
        $scope.loadAllDisziplins($scope.findOne);
    };

    $scope.loadAllDisziplinsAndConfig = function() {
        $log.info('loadAllDisziplinsAndFindOne called...');
        $scope.loadAllDisziplins($scope.loadConfig);
    };

    $scope.loadConfig = function() {
        $log.info('loadConfig called...');
        Wettkampf.get({
        }, function(wettkampf) {
            $scope.wettkampf = wettkampf;
        });
    };

    $scope.loadAllDisziplins = function(cb) {
        $log.info('loadAllDisziplins called...');
        Disziplin.query(function(disciplines) {
            $scope.allDisciplines = disciplines;
            cb();
        });
    };

    $scope.findOne = function() {
        $log.info('find competitor called... with: ' + $stateParams.competitorId);
        Competitor.get({
            competitorId : $stateParams.competitorId
        }, function(competitor) {
            $scope.competitor = competitor;
            competitor.disciplines.forEach(function(dbDiscipline) {
                $scope.allDisciplines.forEach(function(discipline) {
                    if (discipline._id === dbDiscipline.disciplineId) {
                        discipline.declared = true;
                        discipline.result = dbDiscipline.result;
                    }
                });
            });
        });
    };

    $scope.update = function(isValid) {
        $log.info('update competitor called...: ' + isValid);
        if (isValid) {
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

    $scope.isPossibleDiscipline = function(discipline) {
        if (($scope.competitor === '') || ($scope.competitor.gender === ''))
            return false;
        if (discipline.geschlecht === 'm' && $scope.competitor.gender === 'female')
            return false;
        if (discipline.geschlecht === 'f' && $scope.competitor.gender === 'male')
            return false;
        if (!$scope.competitor.birthdate)
            return false;
//        $log.info('type of $scope.competitor.birthdate: ' + typeof $scope.competitor.birthdate);        
//TODO: keine Ahnung wieso, birhtdate kommt als String von der DB
        if (typeof $scope.competitor.birthdate === 'string')
            $scope.competitor.birthdate = new Date($scope.competitor.birthdate); 
        if (discipline.jahrgang_von > $scope.competitor.birthdate.getFullYear())
            return false;
        if (discipline.jahrgang_bis < $scope.competitor.birthdate.getFullYear())
            return false;
        return true;
    };

    $scope.selectDeclaredDisciplines = function(srcDisciplines) {
        //        $log.info('selectDeclaredDisciplines called...');
        var destDisciplines = [];
        srcDisciplines.forEach(function(discipline) {
            if (discipline.declared && $scope.isPossibleDiscipline(discipline)) {
                //                $log.info('selectDeclaredDisciplines... ' + JSON.stringify(discipline));
                destDisciplines.push({
                    disciplineId : discipline._id
                });
            }
        });
        return destDisciplines;
    };

    $scope.deleteCompetitor = function(competitor){
        competitor.$delete();
    };

}]);

