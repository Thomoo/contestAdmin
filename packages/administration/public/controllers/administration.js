'use strict';

angular.module('mean.administration').controller('AdministrationController', ['$scope', '$location', '$log', '$timeout', '$filter', 'Global', 'Wettkampf', 'Disziplin',
function($scope, $location, $log, $timeout, $filter, Global, Wettkampf, Disziplin) {
	// ---------------------------------
	// GENERAL
	// ---------------------------------
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

		Disziplin.query(function(disziplins) {
			$scope.disziplins = disziplins;
		});
	};

	// ---------------------------------
	// Konfiguration
	// ---------------------------------
	var exportLadda;
	/* jshint ignore:start */
	exportLadda = Ladda.create(document.querySelector('#export'));
	/* jshint ignore:end */

	$scope.export = function() {
		exportLadda.start();
		$log.debug('export');
		
		var wettkampfExport;
		var disziplinExport;

		Wettkampf.get({
		}, function(wettkampf) {
			wettkampfExport = wettkampf;

			Disziplin.query(function(disziplins) {
				disziplinExport = disziplins;
				
				$log.debug('Wettkampf: ' + JSON.stringify(wettkampfExport));
				$log.debug('Disziplins: ' + JSON.stringify(disziplinExport));
				$timeout(function() {
					exportLadda.stop();
				}, 500);
				
			}); 

		});


	};
	// ---------------------------------
	// WETTKAMPF
	// ---------------------------------
	var l;
	/* jshint ignore:start */
	l = Ladda.create(document.querySelector('#saveWettkampf'));
	/* jshint ignore:end */
	$scope.saveWettkampf = function(isValid) {
		l.start();
		if (isValid) {
			var wettkampf = new Wettkampf({
				title : $scope.wettkampf.title,
				infoText : $scope.wettkampf.infoText,
				anmeldungActive : $scope.wettkampf.anmeldungActive
			});
			wettkampf.$save(function(response) {
				$log.info('saved');
				$timeout(function() {
					l.stop();
				}, 500);
			});
		} else {
			$scope.submitted = true;
		}
	};

	// ---------------------------------
	// DISZIPLIN
	// ---------------------------------
	// functions
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
				$log.info('removed');
			});
		}
	};

	$scope.addDisziplin = function() {
		var disziplin = new Disziplin({
			geschlecht : null,
			sortierung : null
		});
		$scope.inserted = disziplin;
		$scope.disziplins.push(disziplin);
	};

	$scope.saveDisziplin = function(data, disziplin) {
		var id = disziplin._id;
		angular.copy(data, disziplin);
		if (id) {
			disziplin._id = id;
			disziplin.$update(function(response) {
				$log.info('updated');
			});
		} else {
			disziplin.$save(function(response) {
				$log.info('saved');
			});
		}

	};

	// cancel all changes
	$scope.cancelDisziplin = function(index, disziplin) {
		// falls disziplin noch nicht gespeichert, muss sie aus der liste gelöscht werden.
		if (!disziplin._id) {
			$scope.disziplins.splice(index, 1);
		}
	};

	//  daten validieren
	$scope.checkDisziplin = function(data, id) {
		if (!data) {
			return 'Es muss eine Disziplin angegeben werden.';
		}
	};

	$scope.checkBezeichnung = function(data, id) {
		if (!data) {
			return 'Es muss eine Bezeichnung angegeben werden.';
		}
	};

	$scope.checkJahrgang = function(data, disziplin) {
		if (!data) {
			return 'Es muss ein Jahrgang angegeben werden.';
		}
		if (/^\d{4}$/.exec(data) === null) {
			return 'Der Jahrgang muss mit 4 Zahlen definiert werden.';
		}
	};

	$scope.checkGeschlecht = function(data) {
		if (!data) {
			return 'Es muss eine Geschlecht ausgewählt werden.';
		}
	};

	$scope.checkSortierung = function(data) {
		if (!data) {
			return 'Es muss eine Sortierung ausgewählt werden.';
		}
	};

	// daten aufbereiten
	$scope.geschlechter = [{
		value : 'm',
		text : 'männlich'
	}, {
		value : 'f',
		text : 'weiblich'
	}, {
		value : 'both',
		text : 'beides'
	}];

	$scope.sortierungen = [{
		value : 'ASC',
		text : 'aufsteigend'
	}, {
		value : 'DESC',
		text : 'absteigend'
	}];

	$scope.showGeschlecht = function(disziplin) {
		var selected = [];
		if (disziplin.geschlecht) {
			selected = $filter('filter')($scope.geschlechter, {
				value : disziplin.geschlecht
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

	$scope.showSortierung = function(disziplin) {
		var selected = [];
		if (disziplin.sortierung) {
			selected = $filter('filter')($scope.sortierungen, {
				value : disziplin.sortierung
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

}]);
