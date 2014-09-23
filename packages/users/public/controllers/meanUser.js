'use strict';
angular.module('mean.users')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location',
    function($scope, $rootScope, $http, $location) {
      // This object will be filled by the form
      $scope.user = {};

      // Register the login() function
      $scope.login = function() {
        $http.post('/login', {
          username: $scope.user.username,
          password: $scope.user.password
        })
          .success(function(response) {
            // authentication OK
            $scope.loginError = 0;
            $rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              // Helps to have the Userroles set after login if not admin user - tönt komisch, ist aber so  
              window.location.reload();
              $location.url('/');
            }
          })
          .error(function() {
            $scope.loginerror = 'Authentication failed.';
          });
      };
    }
  ]);
  