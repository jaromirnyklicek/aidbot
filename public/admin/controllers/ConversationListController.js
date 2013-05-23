'use strict';

aidbotAdminApp.controller('ConversationListController', function($scope, Conversation)
{
  $scope.conversations = Conversation.query();
});
