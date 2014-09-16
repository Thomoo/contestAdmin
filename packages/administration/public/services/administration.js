'use strict';

//Wettkampf service used for wettkampf REST endpoint
angular.module('mean.administration').factory('Wettkampf', ['$resource',
  function($resource) {
    return $resource('wettkampf', {
    }, {
    });
  }
]);

//Disziplin service used for disziplins REST endpoint
angular.module('mean.administration').factory('Disziplin', ['$resource',
  function($resource) {
    return $resource('disziplins/:disziplinId', {
      disziplinId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//User service used for user REST endpoint
angular.module('mean.administration').factory('User', ['$resource',
  function($resource) {
    return $resource('users', {
    }, {
    });
  }
]);