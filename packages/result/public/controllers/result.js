'use strict';

angular.module('mean.result').controller('ResultController', ['$scope', '$window', '$log', '$location', 'Global', 'Disziplin', 'Competitor', 'Result',
function($scope, $window, $log, $location, Global, Disziplin, Competitor, Result) {
	$scope.global = Global;
	$scope.package = {
		name : 'result'
	};

	$scope.disciplines = [];
	$scope.competitors = [];
	$scope.possibleCompetitors = [];	
	
	if(!$scope.global.enteredResults){
		$scope.global.enteredResults = [];
	}
	
	Disziplin.query(function(disciplines) {
		$scope.disciplines = disciplines;
		$scope.disciplines.forEach(function(discipline){
			discipline.selected = false;
		});
	});
	
	$scope.selectAllDisciplines = false;
	$scope.selectedDisciplines = [];

	Competitor.query(function(competitors) {
		$scope.competitors = competitors;
	});

	$scope.updatePossibleCompetitors = function() {
		if ($scope.discipline) {
			$scope.possibleCompetitors = [];
			$scope.competitors.forEach(function(competitor) {
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
			$scope.disciplines.forEach(function(discipline){
				discipline.selected = true;
			});
		} else {
			$scope.disciplines.forEach(function(discipline){
				discipline.selected = false;
			});
		}
	};

	$scope.updateSelectedDisciplines = function() {
		var allSelected = true;
		$scope.disciplines.forEach(function(discipline){
			if (!discipline.selected){
				allSelected = false;
				//break;
			} 
		});
		$scope.selectAllDisciplines = allSelected;	
	};


	$scope.updateResult = function() {
		$log.info('update result called...');
		console.log($scope.competitor);
		console.log($scope.discipline.bezeichnung);
		console.log($scope.result);

		$scope.competitors.forEach(function(competitor) {
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
}]);
