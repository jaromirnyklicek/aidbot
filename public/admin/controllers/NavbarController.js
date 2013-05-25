'use strict';

aidbotAdminApp.controller('NavbarController', function($rootScope, $scope, $cookies, $location, Auth)
{
  $scope.rights = $cookies.r !== undefined ? $cookies.r : 0;
  $scope.name = $cookies.n !== undefined ? $cookies.n : '';
  $scope.userId = $cookies.i !== undefined ? $cookies.i : '';

  $rootScope.$on('ngLogin', function(event, rights, name, userId) {
    $scope.rights = rights;
    $scope.name = name;
    $scope.userId = userId;
  });

  $scope.logout = function()
  {
    var auth = new Auth();
    auth.action = 'logout';
    auth.$perform(function() {
      $scope.rights = 0;
      $scope.name = '';
      $scope.userId = '';
      $location.path('/');
    });
  }
});
