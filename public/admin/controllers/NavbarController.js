'use strict';

aidbotAdminApp.controller('NavbarController', function($scope, $cookies, $location, Auth) {
  $scope.logout = function()
  {
    var auth = new Auth();
    auth.action = 'logout';
    auth.$perform(function() {
      $location.path('/');
    });
  }
});
