'use strict';

aidbotAdminApp.controller('SettingsController', function($scope, $flash, Settings) {


  $scope.settings = Settings.get();
  $scope.update = function()
  {
    $scope.settings.$update(function() {
      $flash.notify('success', 'Setting were successfully updated.');
    });
  }
});
