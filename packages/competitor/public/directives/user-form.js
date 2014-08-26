'use strict';

angular.module('mean.competitor').directive('userForm',function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'competitor/views/user-form.html'
    };
});