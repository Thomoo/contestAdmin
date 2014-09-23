'use strict';

angular.module('mean.result').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

angular.module('mean.result').filter('withResultOnly', function() {
	return function(competitors, disciplineId) {
    	competitors.forEach(function(competitor){
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