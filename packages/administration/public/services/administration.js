'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.administration').factory('Wettkampf', ['$resource',
  function($resource) {
    return $resource('wettkampf', {
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);