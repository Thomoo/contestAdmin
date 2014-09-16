'use strict';

angular.module('mean.result').controller('ResultController', ['$scope', '$window', '$log', '$location', '$q', 'Global', 'Disziplin', 'Competitor', 'Result',
function($scope, $window, $log, $location, $q, Global, Disziplin, Competitor, Result) {
	$scope.global = Global;
	$scope.package = {
		name : 'result'
	};
		
	$scope.loadCompetitors = function(){
		var deferred = $q.defer();
		if(!$scope.global.competitors){
			Competitor.query(function(competitors) {
				deferred.resolve(competitors);
			});
		}	
		return deferred.promise;
	};	
	
	$scope.loadDisciplines = function(){
		var deferred = $q.defer();
		if(!$scope.global.disciplines){
			Disziplin.query(function(disciplines) {
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
		
	
	$q.all([$scope.loadCompetitors(), $scope.loadDisciplines()]).then(function(finished){
		$scope.global.competitors = finished[0];
		$scope.global.disciplines = finished[1];
		$scope.initCompetitorsPerDiscipline();
	    
		if(!$scope.global.selectedDisciplinesIds){
			$scope.global.selectedDisciplinesIds = {};
		}
		
	    $scope.refreshSelectedDisciplines();
	});
	
	
	$scope.selectAllDisciplines = false;
	$scope.selectedNoDisciplines = true;
	
	$scope.refreshSelectAllDisciplines = function() {
		if ($scope.selectAllDisciplines){
			$scope.global.disciplines.forEach(function(discipline){
				$scope.global.selectedDisciplinesIds[discipline._id] = true;
			});
			$scope.selectedNoDisciplines = false;
		} else {
			$scope.global.disciplines.forEach(function(discipline){
				$scope.global.selectedDisciplinesIds[discipline._id] = false;
			});
			$scope.selectedNoDisciplines = true;
		}
	};

	$scope.refreshSelectedDisciplines = function() {
		if($scope.global.disciplines){
			var allSelected = true;
			var noneSelected = true;
			$scope.global.disciplines.forEach(function(discipline){
				if($scope.global.selectedDisciplinesIds[discipline._id] === true){
					noneSelected = false;
				} else {
					allSelected = false;
				}					
			});
			$scope.selectAllDisciplines = allSelected;	
			$scope.selectedNoDisciplines = noneSelected;	
		}
	};


	if(!$scope.global.enteredResults){
		$scope.global.enteredResults = [];
	}
	
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
	
	
	$scope.createSelectedDisciplines = function(){
		$scope.global.selectedDisciplines = [];
		$scope.global.disciplines.forEach(function(discipline){
			if($scope.global.selectedDisciplinesIds[discipline._id] === true){
				$scope.global.selectedDisciplines.push(discipline);
			}					
		});		
	};
	
	$scope.navStartLists = function() {
		$scope.createSelectedDisciplines();
		$location.path('result/start-lists');
	};

	$scope.navRankings = function() {
		$location.path('result/rankings');
	};
	
	$scope.navBack = function() {
    	$window.history.back();
    };
          
    $scope.refreshSelectedDisciplines();
}]);
