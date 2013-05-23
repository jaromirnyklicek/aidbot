'use strict';

aidbotAdminApp.controller('ConversationController', function($scope, $routeParams, Conversation, $flash) {


  var conversation = Conversation.get({id: $routeParams.id});
  $scope.conversation = conversation;
  $scope.update = function()
  {
    $scope.conversation.$update(function() {
      $flash.notify('success', 'Note was successfully added to the conversation.');
    });
  }
});
