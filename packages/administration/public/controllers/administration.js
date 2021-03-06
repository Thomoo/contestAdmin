'use strict';

angular.module('mean.administration').controller('AdministrationController', ['$scope', '$http', '$location', '$log', '$timeout', '$filter', 'Global', 'Wettkampf', 'Disziplin', 'User',
function($scope, $http, $location, $log, $timeout, $filter, Global, Wettkampf, Disziplin, User) {
	/*global $:false, Ladda:false */

	// ---------------------------------
	// GENERAL
	// ---------------------------------
	$scope.global = Global;
	$scope.package = {
		name : 'administration'
	};
	
	$log.info('initializing...');       
    $scope.disziplins = [];
	
	$scope.hasAuthorization = function() {
        $log.info('hasAuthorization in administration called...');
		return $scope.global.isAdmin;
	};
	
   $scope.loadConfig = function() {
        $log.info('loadConfig in administration called...');       
        $scope.loadWettkampf($scope.loadDisciplins($scope.loadUsers));
        
        $scope.pw1Errors = [];
        $scope.pw2Errors = [];
    };

	
    $scope.loadWettkampf = function(cb) {
        $log.info('loadWettkampf in administration called...');
        Wettkampf.get({
        }, function(wettkampf) {
            $scope.wettkampf = wettkampf;
            if (cb) {
                cb();
            }
        });
    };
    
    $scope.loadDisciplins = function(cb) {
        $log.info('loadDisciplins in administration called...');
        Disziplin.query(function(disziplins){
            $scope.disziplins = disziplins;
            if (cb) {
                cb();
            }
        });
    };
    
    $scope.loadUsers = function(cb) {
        $log.info('loadUsers in administration called...');
        User.query(function(users) {
            $scope.users = users;
            if (cb) {
                cb();
            }
        });
    };
     

	// ---------------------------------
	// WETTKAMPF
	// ---------------------------------
	var saveWettkampfButton = Ladda.create(document.querySelector('#saveWettkampf'));
	$scope.saveWettkampf = function(isValid) {
        $log.info('saveWettkampf in administration called...');
		saveWettkampfButton.start();
		if (isValid) {
			var wettkampf = new Wettkampf({
				title : $scope.wettkampf.title,
				infoTextActive : $scope.wettkampf.infoTextActive,
				infoTextInactive : $scope.wettkampf.infoTextInactive,
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
        $log.info('removeDisziplin in administration called...');
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
        $log.info('addDisziplin in administration called...');
		var disziplin = new Disziplin({
			geschlecht : null,
			sortierung : null
		});
		$scope.inserted = disziplin;
		$scope.disziplins.push(disziplin);
	};

	$scope.saveDisziplin = function(data, disziplin) {
        $log.info('saveDisziplin in administration called...');
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
        $log.info('cancelDisziplin in administration called...');
		// falls disziplin noch nicht gespeichert, muss sie aus der liste gelöscht werden.
		if (!disziplin._id) {
			$scope.disziplins.splice(index, 1);
		}
	};

	//  daten validieren
	$scope.checkDisziplin = function(data, id) {
//        $log.debug('checkDisziplin in administration called...');
		if (!data) {
			return 'Es muss eine Disziplin angegeben werden.';
		}
	};

	$scope.checkBezeichnung = function(data, id) {
//        $log.debug('checkBezeichnung in administration called...');
		if (!data) {
			return 'Es muss eine Bezeichnung angegeben werden.';
		}
	};

	$scope.checkJahrgang = function(data, disziplin) {
//        $log.debug('checkJahrgang in administration called...');
		if (!data) {
			return 'Es muss ein Jahrgang angegeben werden.';
		}
		if (/^\d{4}$/.exec(data) === null) {
			return 'Der Jahrgang muss mit 4 Zahlen definiert werden.';
		}
	};

	$scope.checkGeschlecht = function(data) {
//        $log.debug('checkGeschlecht in administration called...');
		if (!data) {
			return 'Es muss eine Geschlecht ausgewählt werden.';
		}
	};

	$scope.checkSortierung = function(data) {
//        $log.debug('checkSortierung in administration called...');
		if (!data) {
			return 'Es muss eine Sortierung ausgewählt werden.';
		}
	};

	$scope.checkFormat = function(data) {
//        $log.debug('checkFormat in administration called...');
		if (!data) {
			return 'Es muss eine Format ausgewählt werden.';
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

	var time1Val = JSON.stringify({
		placeholder: 'ss.hh',
		// validate : '^\\d{1,2}\\.\\d{2}$',
        validate : '^\\d{2}\\.\\d{2}$',
		format : '(function(val){return val.replace(/^0+(?=\\d\\.)/, "") + "sec";})'
	});
	var time2Val = JSON.stringify({
		placeholder: 'mm:ss.h',
		validate : '^\\d{2}:[0-5]\\d\\.\\d{1}$',
		format : '(function(val){return val.replace(/^0+(?=\\d\\:)/, "").replace(":", "min ") + "sec";})'
	});
	var distance1Val = JSON.stringify({
		placeholder: 'm',
		validate : '^\\d+$',
		format : '(function(val){return val + "m";})'
	});
	var distance2Val = JSON.stringify({
		placeholder: 'm.cm',
		validate : '\\d+\\.\\d{2}$',
		format : '(function(val){return val + "m";})'
	});
	var punkte1Val = JSON.stringify({
		placeholder: 'x',
		validate : '^\\d+$',
		format : '(function(val){return val + "pte";})'
	});
	var rang1Val = JSON.stringify({
        placeholder: 'x',
        validate : '^\\d+$',
        format : '(function(val){return val;})'
    });

	$scope.formats = [{
		value : time1Val,
		text : 'time: ss.hh'
	}, {
		value : time2Val,
		text : 'time: mm:ss.h'
	}, {
		value : distance1Val,
		text : 'distance: m'
	}, {
		value : distance2Val,
		text : 'distance: m.cm'
	}, {
		value : punkte1Val,
		text : 'punkte: x'
	}, {
        value : rang1Val,
        text : 'rang: x'
    }];

	$scope.showGeschlecht = function(disziplin) {
//        $log.debug('showGeschlecht in administration called...');
		var selected = [];
		if (disziplin.geschlecht) {
			selected = $filter('filter')($scope.geschlechter, {
				value : disziplin.geschlecht
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

	$scope.showSortierung = function(disziplin) {
//        $log.debug('showSortierung in administration called...');
		var selected = [];
		if (disziplin.sortierung) {
			selected = $filter('filter')($scope.sortierungen, {
				value : disziplin.sortierung
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

	$scope.showFormat = function(disziplin) {
//        $log.debug('showFormat in administration called...');
		var selected = [];
		if (disziplin.format) {
			selected = $filter('filter')($scope.formats, {
				value : disziplin.format
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

	// ---------------------------------
	// Roles
	// ---------------------------------

	$scope.saveUser = function($index, user) {
        $log.info('saveUser in administration called...');
		$scope.pw1Errors[$index] = null;
		$scope.pw2Errors[$index] = null;

		var pw1 = $('#password' + $index).val();
		var pw2 = $('#passwordBe' + $index).val();
		if (pw1.length < 5 || pw1.length > 20) {
			var errorMsgSize = 'Das Passwort muss zwischen 5 und 20 Zeichen lang sein.';
			$scope.pw1Errors[$index] = errorMsgSize;
			throw Error(errorMsgSize);
		}
		if (pw1 !== pw2) {
			var errorMsgNotSame = 'Die Passwörter stimmen nicht überein.';
			$scope.pw2Errors[$index] = errorMsgNotSame;
			throw Error(errorMsgNotSame);
		}

		$http.post('/reset/' + user._id, {
			password : pw1,
			confirmPassword : pw2
		}).error(function(error) {
			$scope.validationError = error;
		});
	}; 

	$scope.cancelUser = function($index, user) {
        $log.info('cancelUser in administration called...');
		$scope.pw1Errors[$index] = null;
		$scope.pw2Errors[$index] = null;
	};
	
	// ---------------------------------
	// Konfiguration
	// ---------------------------------
	var tagStart = '<<!#';
	var tagEnd = '#!>>';

	var wettkampfKey = 'WETTKAMPF';
	var disziplinKey = 'DISZIPLIN';

	var exportButton = Ladda.create(document.querySelector('#export'));

	var getTaggedJSONString = function(key, json) {
		return tagStart + key + JSON.stringify(json) + tagEnd;
	};

	$scope.export = function() {
        $log.info('export in administration called...');
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
        $log.info('openImport in administration called...');
		document.getElementById('configFileInput').click();
	};

	$scope.importConfig = function() {
        $log.info('importConfig in administration called...');
        
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;

            var wettkampfText = /<<!#WETTKAMPF(.*?)#!>>/.exec(textFromFileLoaded)[1];
            var wettkampfJSON = JSON.parse(wettkampfText);

            var wettkampf = new Wettkampf();
            angular.copy(wettkampfJSON, wettkampf);

            wettkampf.$save(function(response) {
            }); 


            if ($('#overrideConfig').is(':checked')) {
                $log.debug('remove all iterator');
                Disziplin.query(function(disziplins) {
                    $.each(disziplins, function() {
                        this.$remove();
                    });
                    saveDisziplinsToDB(textFromFileLoaded);
                });
            } else {
                saveDisziplinsToDB(textFromFileLoaded);
            }

            $scope.$apply($scope.loadConfig());
            location.reload();
        };


		var fileToLoad = document.getElementById('configFileInput').files[0];

		if (!fileToLoad) {
			// noop; user aborted
			return;
		}

		fileReader.readAsText(fileToLoad, 'UTF-8');
	};

	var saveDisziplinsToDB = function(textFromFileLoaded) {
        $log.info('saveDisziplinsToDB in administration called...');
		var disziplinText = /<<!#DISZIPLIN(.*?)#!>>/.exec(textFromFileLoaded)[1];
		var disziplinJSON = JSON.parse(disziplinText);
		var disziplin;
		$.each(disziplinJSON, function() {
			disziplin = new Disziplin();
			angular.copy(this, disziplin);
			disziplin.$save(function(response) {
			});
		});
	};
	
}]);
