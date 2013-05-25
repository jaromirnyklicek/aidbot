'use strict';

aidbotAdminApp.controller('AuthController', function($rootScope, $scope, $cookies, Auth, $location)
{
  var auth = new Auth();

  $scope.username = null;
  $scope.password = null;

  $scope.login = function()
  {
    auth.action = 'login';
    auth.username = $scope.username;
    auth.password = $scope.password;

    auth.$perform(function(response) {
      $rootScope.$emit('ngLogin', response.role, response.name, response.userId);
      $location.path('/conversations/');
    });
  }
});
