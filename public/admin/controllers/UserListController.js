'use strict';

aidbotAdminApp.controller('UserListController', function($scope, User)
{
  $scope.users = User.query();
});
