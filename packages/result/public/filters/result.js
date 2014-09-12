'use strict';

angular.module('mean.result').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});