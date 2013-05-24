'use strict';

aidbotAdminApp.controller('AuthController', function($scope, Auth, $location)
{
  var auth = new Auth();

  $scope.login = function()
  {
    auth.action = 'login';
    auth.$perform(function() {
      $location.path('/users/');
    });
  }
});
