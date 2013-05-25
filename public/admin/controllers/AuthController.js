'use strict';

aidbotAdminApp.controller('AuthController', function($scope, Auth, $location, $cookies)
{
  var auth = new Auth();

  $scope.username = null;
  $scope.password = null;

  $scope.login = function()
  {
    auth.action = 'login';
    auth.username = $scope.username;
    auth.password = $scope.password;

    auth.$perform(function() {
      $location.path('/users/');
    });
  }

  console.log($cookies);
});
