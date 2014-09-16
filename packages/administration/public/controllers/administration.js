'use strict';

angular.module('mean.administration').controller('AdministrationController', ['$scope', '$location', '$log', '$timeout', '$filter', 'Global', 'Wettkampf', 'Disziplin', 'User',
function($scope, $location, $log, $timeout, $filter, Global, Wettkampf, Disziplin, User) {
	/*global $:false, Ladda:false */

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
		
		User.query(function(users){
			$scope.users = users;
		});
	};

	// ---------------------------------
	// Konfiguration
	// ---------------------------------
	var tagStart = '<<!#';
	var tagEnd = '#!>>';

	var wettkampfKey = 'WETTKAMPF';
	var disziplinKey = 'DISZIPLIN';

	var exportButton = Ladda.create(document.querySelector('#export'));

	var getTaggedJSONString = function(key, json){
		return tagStart + key + JSON.stringify(json) + tagEnd;
	};
	
	$scope.export = function() {
		exportButton.start();
		$log.debug('export');

		Wettkampf.get({
		}, function(wettkampf) {
			delete wettkampf._id;
			Disziplin.query(function(disziplins) {
				$.each(disziplins, function() {
					delete this._id;
				});
				var textFileAsBlob = new Blob([getTaggedJSONString(wettkampfKey, wettkampf), getTaggedJSONString(disziplinKey, disziplins)], {
					type : 'text/plain'
				});
				var fileNameToSaveAs = 'ContestAdminExport_' + new Date().getTime() + '.txt';

				var downloadLink = document.createElement('a');
				downloadLink.download = fileNameToSaveAs;
				downloadLink.innerHTML = 'Download File';
				if (window.webkitURL) {
					// Chrome allows the link to be clicked
					// without actually adding it to the DOM.
					downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
				} else {
					// Firefox requires the link to be added to the DOM
					// before it can be clicked.
					downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
					downloadLink.onclick = function(event) {
						document.body.removeChild(event.target);
					};
					downloadLink.style.display = 'none';
					document.body.appendChild(downloadLink);
				}

				downloadLink.click();

				$timeout(function() {
					exportButton.stop();
				}, 500);

			});

		});

	};

	$scope.openImport = function() {
		document.getElementById('configFileInput').click();
	};

	$scope.importConfig = function() {
		var fileToLoad = document.getElementById('configFileInput').files[0];

		if (!fileToLoad) {
			// noop; user aborted
			return;
		}

		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var textFromFileLoaded = fileLoadedEvent.target.result;

			var wettkampfText = /<<!#WETTKAMPF(.*?)#!>>/.exec(textFromFileLoaded)[1];
			var wettkampfJSON = JSON.parse(wettkampfText);

			var wettkampf = new Wettkampf();
			angular.copy(wettkampfJSON, wettkampf);
			wettkampf.$save(function(response) {
				// TODO SIR error handling?
				// $log.debug('response: ' + response);
			});

			if ($('#overrideConfig').is(':checked')) {
				$log.debug('remove all iterator');
				Disziplin.query(function(disziplins) {
					$.each(disziplins, function() {
						this.$remove();
					});
					saveDisziplinsToDB(textFromFileLoaded);
				});
			}else{
				saveDisziplinsToDB(textFromFileLoaded);
			}
			
			// refresh view
			// TODO SIR prüfen ob dies so funktioniert oder ein window ENTWEDER ODER
			// Ev. mit load image...
			$scope.$apply($scope.loadConfig());			
			// location.reload();					
		};
		fileReader.readAsText(fileToLoad, 'UTF-8');
	};

	var saveDisziplinsToDB = function(textFromFileLoaded){
		$log.debug('saveToDB');
		var disziplinText = /<<!#DISZIPLIN(.*?)#!>>/.exec(textFromFileLoaded)[1];
		var disziplinJSON = JSON.parse(disziplinText);
		var disziplin;
		$.each(disziplinJSON, function() {
			disziplin = new Disziplin();
			angular.copy(this, disziplin);
			disziplin.$save(function(response) {
				// TODO SIR error handling?
				// $log.debug('response: ' + response);
			});
		}); 
	};

	// ---------------------------------
	// WETTKAMPF
	// ---------------------------------
	var saveWettkampfButton = Ladda.create(document.querySelector('#saveWettkampf'));
	$scope.saveWettkampf = function(isValid) {
		saveWettkampfButton.start();
		if (isValid) {
			var wettkampf = new Wettkampf({
				title : $scope.wettkampf.title,
				infoText : $scope.wettkampf.infoText,
				anmeldungActive : $scope.wettkampf.anmeldungActive
			});
			wettkampf.$save(function(response) {
				$log.info('saved');
				$timeout(function() {
					saveWettkampfButton.stop();
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

	// ---------------------------------
	// Roles
	// ---------------------------------
	$scope.saveUser = function($index, user){
		var pw1 = $('#password' + $index).val();
		var pw2 = $('#passwordBe' + $index).val();
		$log.debug('pw1: ' + pw1);
		$log.debug('pw2: ' + pw2);
		if(pw1 !== pw2){
			throw Error('fu');
		}
		
		$log.debug('PWCHECK ok');
		
		
	};
}]);
