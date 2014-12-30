'use strict';

angular.module('mean.competitor').directive('birthDateField', function($filter) {
    /*global moment:false */
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(data) {
                //View -> Model
                console.log(data);
                var date = moment(data, 'DD.MM.YYYY', true);

                ngModelController.$setValidity('date', date.isValid());
                return (date.isValid() && date < moment()) ? date.toDate() : undefined;
            });
            ngModelController.$formatters.push(function(data) {
                //Model -> View
                return $filter('date')(data, 'dd.MM.yyyy');
            });
        }
    };
});