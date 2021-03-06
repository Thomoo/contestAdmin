'use strict';

angular.module('mean.result').controller('ResultController', ['$scope', '$window', '$log', '$location', '$q', '$filter', 'Global', 'Disziplin', 'Competitor', 'Result',
function($scope, $window, $log, $location, $q, $filter, Global, Disziplin, Competitor, Result) {
    $scope.global = Global;
    $scope.package = {
        name : 'result'
    };
    $scope.discipline = {
        validate : new RegExp('^\\$', 'i')
    };

    $scope.loadCompetitors = function() {
        var deferred = $q.defer();
        //if(!$scope.global.competitors){
        Competitor.query(function(competitors) {
            deferred.resolve(competitors);
        });
        //}
        return deferred.promise;
    };

    $scope.loadDisciplines = function() {
        var deferred = $q.defer();
        //if(!$scope.global.disciplines){
        Disziplin.query(function(disciplines) {
            deferred.resolve(disciplines);
        });
        //}
        return deferred.promise;
    };

    $scope.initCompetitorsPerDiscipline = function() {
        //if(!$scope.global.competitorsPerDiscipline){
        $scope.global.competitorsPerDiscipline = {};
        $scope.global.competitors.forEach(function(competitor) {
            competitor.disciplines.forEach(function(discipline) {
                if (!$scope.global.competitorsPerDiscipline[discipline.disciplineId]) {
                    $scope.global.competitorsPerDiscipline[discipline.disciplineId] = [];
                }
                $scope.global.competitorsPerDiscipline[discipline.disciplineId].push(competitor);
            });
        });
        //}
    };

    $q.all([$scope.loadCompetitors(), $scope.loadDisciplines()]).then(function(finished) {
        $scope.global.competitors = finished[0];
        $scope.global.disciplines = finished[1];

        $scope.global.competitors.forEach(function(competitor) {
            competitor.disciplinesById = {};
            if (competitor.disciplines) {
                competitor.disciplines.forEach(function(discipline) {
                    competitor.disciplinesById[discipline.disciplineId] = discipline;
                });
            }
        });

        // $scope.validator = /^\d{1,2}\.\d{2}$/;
        // $scope.validator = new RegExp('^\\d{1,2}\\.\\d{2}$', 'i');

        $scope.global.disciplines.forEach(function(discipline) {
            var formatObj = JSON.parse(discipline.format);

            /* jshint ignore:start */
            discipline.formatFnc = eval(formatObj.format);
            /* jshint ignore:end */
            discipline.validate = new RegExp(formatObj.validate, 'i');
            discipline.placeholder = formatObj.placeholder;
        });

        $scope.initCompetitorsPerDiscipline();

        if (!$scope.global.selectedDisciplinesIds) {
            $scope.global.selectedDisciplinesIds = {};
        }

        $scope.refreshSelectedDisciplines();
    });

    $scope.selectAllDisciplines = false;
    $scope.selectedNoDisciplines = true;

    $scope.refreshSelectAllDisciplines = function() {
        if ($scope.selectAllDisciplines) {
            $scope.global.disciplines.forEach(function(discipline) {
                $scope.global.selectedDisciplinesIds[discipline._id] = true;
            });
            $scope.selectedNoDisciplines = false;
        } else {
            $scope.global.disciplines.forEach(function(discipline) {
                $scope.global.selectedDisciplinesIds[discipline._id] = false;
            });
            $scope.selectedNoDisciplines = true;
        }
    };

    $scope.refreshSelectedDisciplines = function() {
        if ($scope.global.disciplines) {
            var allSelected = true;
            var noneSelected = true;
            $scope.global.disciplines.forEach(function(discipline) {
                if ($scope.global.selectedDisciplinesIds[discipline._id] === true) {
                    noneSelected = false;
                } else {
                    allSelected = false;
                }
            });
            $scope.selectAllDisciplines = allSelected;
            $scope.selectedNoDisciplines = noneSelected;
        }
    };

    if (!$scope.global.enteredResults) {
        $scope.global.enteredResults = [];
    }

    $scope.updateResult = function() {
        $log.info('update result called...');
        // console.log($scope.competitor);
        // console.log($scope.discipline.bezeichnung);
        // console.log($scope.result);

        $scope.global.competitors.forEach(function(competitor) {
            if (competitor.startnr === $scope.competitor.startnr) {
                competitor.disciplines.forEach(function(discipline) {
                    if ($scope.discipline._id === discipline.disciplineId) {
                        discipline.result = $scope.result;
                    }
                });
                if (!competitor.updated) {
                    competitor.updated = [];
                }
                competitor.updated.push(new Date().getTime());

                competitor.$update(function() {
                    $location.path('result/enter-result');
                });
            }
        });

        $scope.global.enteredResults.push({
            competitor : $scope.competitor,
            discipline : $scope.discipline,
            result : $scope.result
        });

        $scope.clearForm();
    };

    $scope.clearForm = function() {
        //$scope.discipline = '';
        $scope.competitor = null;
        $scope.result = '';
    };

    $scope.createSelectedDisciplines = function() {
        $scope.global.selectedDisciplines = [];
        $scope.global.disciplines.forEach(function(discipline) {
            if ($scope.global.selectedDisciplinesIds[discipline._id] === true) {
                $scope.global.selectedDisciplines.push(discipline);
            }
        });
    };

    $scope.updateRankings = function() {
        $scope.global.selectedDisciplines.forEach(function(discipline) {
            $scope.reverse = (discipline.sortierung === 'DESC');
            var sortedCompetitors = $filter('orderByResult')($scope.global.competitorsPerDiscipline[discipline._id], discipline._id, $scope.reverse);
            $log.info(JSON.stringify(sortedCompetitors));
            
            var counter = 1;
            var rank = counter;
            var awardState = true;
            var awardCounter = 0;
            var tempResult;
//            console.log(sortedCompetitors);
            sortedCompetitors.forEach(function(competitor) {
                if (competitor.disciplinesById[discipline._id].result) {
                    if (competitor.disciplinesById[discipline._id].result === tempResult) {
                    	// gleiches Resulat, Rang bleibt gleich
                        competitor.disciplinesById[discipline._id].rank = rank;
                        competitor.disciplines.forEach(function(d) {
                            if (d.disciplineId === discipline._id) {
                                d.rank = rank;
                                if (!d.award || d.award === '*' || d.award === '' ) {
                                	awardCounter += 1;
                                	d.award = (awardState) ? '*' : '';	
                                }
                                d.printRank = '';
                                console.log('printRank: ' + d.printRank  + ' rank: ' + d.rank + ', counter: ' + counter + ' competitor: ' + competitor.firstname + ' ' + competitor.name);
                            }
                        });
                    } else {
                    	// neuer Rang
                        rank = counter;
                        competitor.disciplinesById[discipline._id].rank = rank;
                        competitor.disciplines.forEach(function(d) {
                            if (d.disciplineId === discipline._id) {
                                d.rank = rank;
                                d.printRank = rank;
                                if (!d.award || d.award === '*' || d.award === '' ) {
                                	awardCounter += 1;
                                	awardState = (awardCounter <=3);
                                	d.award = (awardState) ? '*' : '';	
                                }
                            	console.log('printRank: ' + d.printRank  + ' rank: ' + d.rank + ', counter: ' + counter + ' competitor: ' + competitor.firstname + ' ' + competitor.name);
                            }
                        });
                        tempResult = competitor.disciplinesById[discipline._id].result;

                    }
                    counter += 1;

                } else {
                	competitor.disciplines.forEach(function(d) {
                        if (d.disciplineId === discipline._id) {
                                d.rank = undefined;
                                d.printRank = 'dnf';
                    			console.log('printRank: ' + d.printRank  + ' rank: ' + d.rank + ', counter: ' + counter + ' competitor: ' + competitor.firstname + ' ' + competitor.name);
                        }
                    });
                }
                
                if (!competitor.updated) {
                        competitor.updated = [];
                    }
                competitor.updated.push(new Date().getTime());

                competitor.$update(function() {
                });
            });
        });
    };

    $scope.resetSearchForm = function() {
        $scope.search = {};
    };

    $scope.searchFormEmpty = function() {
        return (!$scope.search || (!$scope.search.bezeichnung && !$scope.search.$));
    };

    $scope.navStartLists = function() {
        $scope.createSelectedDisciplines();
        $location.path('result/start-lists');
    };

    $scope.navRankings = function() {
        $scope.createSelectedDisciplines();
        $scope.updateRankings();
        $location.path('result/rankings');
    };

    $scope.navBack = function() {
        $window.history.back();
    };

    $scope.refreshSelectedDisciplines();
}]);
