'use strict';

angular.module('mean.result').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

angular.module('mean.result').filter('withResultOnly', function() {
	return function(competitors, disciplineId) {
    	competitors.forEach(function(competitor){
    		if(!competitor.disciplinesById){
	    		competitor.disciplinesById = {};
				if(competitor.disciplines){
					competitor.disciplines.forEach(function(discipline){
						competitor.disciplinesById[discipline.disciplineId] = discipline;
					});
				}
			}
    		
		    if(!competitor.disciplinesById[disciplineId].result){
		    	var index = competitors.indexOf(competitor);
		    	if (index > -1) {
		    		competitors.splice(index, 1);
				}
		    }
    	});
	    return competitors;
  };
});

angular.module('mean.result').filter('orderByResult', [ '$filter', function($filter) {
	return function(competitors, disciplineId, rev) {
		var reverse = false;
		if(rev){
			reverse = rev;
		}
		
		var newCompetitors = angular.copy(competitors);
		
    	newCompetitors.forEach(function(competitor){
    		if(!competitor.disciplinesById){
	    		competitor.disciplinesById = {};
				if(competitor.disciplines){
					competitor.disciplines.forEach(function(discipline){
						competitor.disciplinesById[discipline.disciplineId] = discipline;
					});
				}
    		}
			
	    	competitor.currentResult = competitor.disciplinesById[disciplineId].result;
    	});
    	
    	var competitorsWithResults = $filter('withResultOnly')(newCompetitors, disciplineId);
    	
    	var sortedCompetitors = $filter('orderBy')(competitorsWithResults, 'currentResult', reverse);
    	
	    return sortedCompetitors;
  };
}]);

angular.module('mean.result').filter('orderByRank', [ '$filter', function($filter) {
	return function(competitors, disciplineId, rev) {
		var reverse = false;
		if(rev){
			reverse = rev;
		}
		
		var newCompetitors = angular.copy(competitors);
		
    	newCompetitors.forEach(function(competitor){
    		if(!competitor.disciplinesById){
	    		competitor.disciplinesById = {};
				if(competitor.disciplines){
					competitor.disciplines.forEach(function(discipline){
						competitor.disciplinesById[discipline.disciplineId] = discipline;
					});
				}
    		}
			
	    	competitor.currentRank = competitor.disciplinesById[disciplineId].rank;
    	});
    	
    	var sortedCompetitors = $filter('orderBy')(newCompetitors, 'currentRank', reverse);
    	
	    return sortedCompetitors;
  };
}]);