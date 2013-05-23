'use strict';

aidbotAdminApp.controller('UserController', function($scope, $routeParams, User, $flash, $location)
{
  $scope.user = {};
  $scope.showUsernameInput = true;

  $scope.password = null;
  $scope.password2 = null;

  if($routeParams.id !== undefined) {
    $scope.user = User.get({id: $routeParams.id});

    $scope.showUsernameInput = false;
  }



  $scope.save = function()
  {
    if($routeParams.id === undefined && $scope.password === null) {
      $flash.notify('alert', 'Please insert your password');
      return;
    }

    if($scope.password !== null) {
      if($scope.password !== $scope.password2 ) {
        $flash.notify('alert', 'Given passwords are not equal.');
        return;
      }
    }

    $scope.user.password = $scope.password;

    if($routeParams.id === undefined) {
      var user = new User();

      user.$save($scope.user, function(result) {
        $location.path('/user/' + result.id);
        $flash.notify('success', 'User account was succesfully created.');
      });
    } else {
      $scope.user.$update(function() {
        $flash.notify('success', 'User account was succesfully updated.');
      });
    }
  }
});
