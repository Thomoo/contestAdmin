'use strict';

angular.module('mean.result').controller('ResultController', ['$scope', '$window', '$log', '$location', '$q', 'Global', 'Disziplin', 'Competitor', 'Result',
function($scope, $window, $log, $location, $q, Global, Disziplin, Competitor, Result) {
	$scope.global = Global;
	$scope.package = {
		name : 'result'
	};
	
	
///	
	$scope.loadCompetitors = function(){
		var deferred = $q.defer();
		if(!$scope.global.competitors){
			Competitor.query(function(competitors) {
				// $scope.global.competitors = competitors;
				// deferred.resolve('competitors loaded');
				deferred.resolve(competitors);
			});
		}	
		return deferred.promise;
	};
	
	
	$scope.loadDisciplines = function(){
		var deferred = $q.defer();
		if(!$scope.global.disciplines){
			Disziplin.query(function(disciplines) {
				// $scope.global.disciplines = disciplines;
				// $scope.global.disciplines.forEach(function(discipline){
					// discipline.selected = false;
				// });
				// deferred.resolve('disciplines loaded');
				disciplines.forEach(function(discipline){
					discipline.selected = false;
				});
				deferred.resolve(disciplines);
			});
		}
		return deferred.promise;
	};
	
	$scope.initCompetitorsPerDiscipline = function(){
		if(!$scope.global.competitorsPerDiscipline){
			$scope.global.competitorsPerDiscipline = {};
			$scope.global.competitors.forEach(function(competitor) {
				competitor.disciplines.forEach(function(discipline) {
					if(!$scope.global.competitorsPerDiscipline[discipline.disciplineId]){
						$scope.global.competitorsPerDiscipline[discipline.disciplineId] = [];
					}
					$scope.global.competitorsPerDiscipline[discipline.disciplineId].push(competitor);
				});
			});
		}
	};
	
	// $scope.global.competitors = $scope.loadCompetitors();
	// $scope.global.disciplines = $scope.loadDisciplines();
	
	$q.all([$scope.loadCompetitors(), $scope.loadDisciplines()]).then(function(finished){
		$scope.global.competitors = finished[0];
		$scope.global.disciplines = finished[1];
		$scope.initCompetitorsPerDiscipline();
	    
	    $scope.updateSelectedDisciplines();
		});
	
	$scope.possibleCompetitors = [];
	
///

	if(!$scope.global.enteredResults){
		$scope.global.enteredResults = [];
	}
	
	
	$scope.selectAllDisciplines = false;
	$scope.selectedNoDisciplines = true;


	$scope.updatePossibleCompetitors = function() {
		if ($scope.discipline) {
			$scope.possibleCompetitors = [];
			$scope.global.competitors.forEach(function(competitor) {
				competitor.disciplines.forEach(function(discipline) {
					if ($scope.discipline._id === discipline.disciplineId) {
						$scope.possibleCompetitors.push(competitor);
					}
				});
			});
		}
	};
	
	$scope.updateSelectAllDisciplines = function() {
		if ($scope.selectAllDisciplines){
			$scope.global.disciplines.forEach(function(discipline){
				discipline.selected = true;
			});
			$scope.selectedNoDisciplines = false;
		} else {
			$scope.global.disciplines.forEach(function(discipline){
				discipline.selected = false;
			});
			$scope.selectedNoDisciplines = true;
		}
	};

	$scope.updateSelectedDisciplines = function() {
		if($scope.global.disciplines){
			var allSelected = true;
			var noneSelected = true;
			$scope.global.disciplines.forEach(function(discipline){
				if (discipline.selected){
					noneSelected = false;
				} else {
					allSelected = false;
				}
			});
			$scope.selectAllDisciplines = allSelected;	
			$scope.selectedNoDisciplines = noneSelected;	
		}
	};


	$scope.updateResult = function() {
		$log.info('update result called...');
		console.log($scope.competitor);
		console.log($scope.discipline.bezeichnung);
		console.log($scope.result);

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
		$scope.competitor = {};
		$scope.result = '';
	};
	
	$scope.createStartLists = function() {
		$location.path('result/start-lists');
	};

	$scope.createRankings = function() {
		$location.path('result/rankings');
	};
	
	$scope.navBack = function() {
            $window.history.back();
          };
          
    $scope.updateSelectedDisciplines();
}]);
