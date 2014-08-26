'use strict';

angular.module('mean.competitor').controller('DatePickerCtrl', ['$scope',
function($scope) {
    $scope.package = {
        name : 'competitor'
    };
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear : 'yyyy',
        startingDay : 1,
        datepickerMode: 'year',
        showWeeks: false
    };

    $scope.dateFormat = 'dd.MM.yyyy';

}]);

