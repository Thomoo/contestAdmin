'use strict';

angular.module('mean.administration').controller('AdministrationController', ['$scope', '$location', '$log', '$timeout', 'Global', 'Wettkampf', 'Disziplin',
function($scope, $location, $log, $timeout, Global, Wettkampf, Disziplin) {
// GENERAL
	$scope.global = Global;
	$scope.package = {
		name : 'administration'
	};
	$scope.hasAuthorization = function() {
		return $scope.global.isAdmin;
	};
	
	$scope.loadConfig = function() {
		Wettkampf.get({
		}, function(wettkampf) {
			$scope.wettkampf = wettkampf;
		});
		
		// Disziplin.query(function(disziplins){
			// $scope.disziplins = disziplins;
		// });
		
		// TODO SIR dummy data
			

		$scope.disziplins = [{
			disziplin : 'disziplin1',
			bezeichnung : 'bezeichnung1'
		}, {
			disziplin : 'disziplin2',
			bezeichnung : 'bezeichnung2'
		}]; 
	};

// WETTKAMPF
	$scope.saveWettkampf = function(isValid) {
		if (isValid) {
			var wettkampf = new Wettkampf({
				title : $scope.wettkampf.title,
				infoText : $scope.wettkampf.infoText,
				anmeldungActive : $scope.wettkampf.anmeldungActive
			});
			wettkampf.$save(function(response) {
				$log.info('saved');
			});
		} else {
			$scope.submitted = true;
		}
	};

// DISZIPLIN
 var disziplinsPendingSave = [];
 
    $scope.createDisziplin = function(isValid) {
      if (isValid) {
        var disziplin = new Disziplin({
          // title: this.title,
          // content: this.content
        });
        disziplin.$save(function(response) {
          $location.path('disziplins/' + response._id);
        });
      } else {
        $scope.submitted = true;
      }
    };	

    $scope.removeDisziplin = function(disziplin) {
      if (disziplin) {
        disziplin.$remove();

        for (var i in $scope.disziplins) {
          if ($scope.disziplins[i] === disziplin) {
            $scope.disziplins.splice(i, 1);
          }
        }
      } else {
        $scope.disziplin.$remove(function(response) {
          $location.path('disziplins');
        });
      }
    };
    
    $scope.updateDisziplin = function(isValid) {
      if (isValid) {
        var disziplin = $scope.disziplin;
        if (!disziplin.updated) {
          disziplin.updated = [];
        }
        disziplin.updated.push(new Date().getTime());

        disziplin.$update(function() {
          $location.path('disziplins/' + disziplin._id);
        });
      } else {
        $scope.submitted = true;
      }
    };
    
  // add disziplin
  $scope.addDisziplin = function() {
    var newDisziplin = {
			disziplin : '',
			bezeichnung : ''
    };
    $scope.disziplins.push(newDisziplin);
    disziplinsPendingSave.push(newDisziplin);
    
    if (!$scope.tableform.$visible) {
      $scope.tableform.$show();
    }    
    // Hack to be able to add a record and have focus set to the new row
    $timeout(function(){
       newDisziplin.isFocused = true;
    }, 0);
  };

}]);
