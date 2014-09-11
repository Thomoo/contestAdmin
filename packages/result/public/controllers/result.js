'use strict';

angular.module('mean.result').controller('ResultController', ['$scope', '$log', '$location', 'Global', 'Disziplin', 'Competitor', 'Result',
  function($scope, $log, $location, Global, Disziplin, Competitor, Result) {
    $scope.global = Global;
    $scope.package = {
      name: 'result'
    };
    
    $scope.disciplines = [];
    $scope.competitors = [];
    $scope.possibleCompetitors = [];
    
    Disziplin.query(function(disciplines) {
    	$scope.disciplines = disciplines;    	
    });

  	Competitor.query(function(competitors) {
  		$scope.competitors = competitors;
  	});

	$scope.updatePossibleCompetitors = function(){
		if ($scope.discipline){
			$scope.possibleCompetitors = [];
			$scope.competitors.forEach(function(competitor){
				competitor.disciplines.forEach(function(discipline){
      				if ($scope.discipline._id === discipline.disciplineId) {
      					$scope.possibleCompetitors.push(competitor);
      				}
      			});
			});
		}
	};
        
    $scope.updateResult = function(isValid) {
      $log.info('update result called...');
      console.log($scope.startnr);
      console.log($scope.discipline.bezeichnung);
      console.log($scope.result);
	  // TODO: if (isValid) {
      if (true) {      	
      	// Competitor.get(
      		// {startnr : $scope.startnr}, 
      	$scope.competitors.forEach(
      		function(competitor) {
      			if(competitor.startnr === $scope.startnr){
	      			competitor.disciplines.forEach(function(discipline){
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
      		}
      	);
      	$scope.clearForm();
      } else {
        $scope.submitted = true;
      }
    };
    
    $scope.clearForm = function(){
    	//$scope.discipline = '';
    	$scope.startnr = '';
		$scope.result = '';
    };
  }
]);
