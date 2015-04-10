'use strict';

angular.module('mean.competitor').directive('userForm',['$log', function($log) {
    return {
        restrict : 'E',
        scope: {
          showAward: '=',
          readonly: '=',
          competitor: '='
        },
        templateUrl : 'competitor/views/user-form.html'
    };
}]); 