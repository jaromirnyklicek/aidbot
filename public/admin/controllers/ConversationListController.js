'use strict';

aidbotAdminApp.controller('ConversationListController', function($scope, $cookies, Conversation, User)
{
  var conversations = Conversation.query(filterAndSortConversations);

  $scope.users = [];
  if ($cookies.r == 1) {
    $scope.users = User.query();
  }


  var filter = $scope.filter = {
    operator: 0,
    dateFrom: null,
    dateTo: null,
    id: null,
    fulltext: ''
  };

  $scope.$watch('filter', filterAndSortConversations, true);

  function filterAndSortConversations() {
    $scope.conversations = [];
    // filter
    angular.forEach(conversations, function(item, key) {
      if (filter.operator && filter.operator > 0 &&  filter.operator != item.operator) {
        return;
      }

      if (filter.id && filter.id !== item.id) {
        return;
      }

      if (filter.dateFrom) {
        var filterDateFrom = new Date(filter.dateFrom);
        var itemDateFrom = new Date(item.date);

        if(itemDateFrom.getTime() < filterDateFrom.getTime()) {
          return;
        }
      }

      if (filter.dateTo) {
        var filterDateTo = new Date(filter.dateTo);
        var itemDateTo = new Date(item.date);

        if(itemDateTo.getTime() > filterDateTo.getTime()) {
          return;
        }
      }

      if (filter.fulltext != '') {
        var noteSubstr = (item.note.toLowerCase().indexOf(filter.fulltext.toLowerCase()) !== -1);
        var opSubstr = (item.operatorName.toLowerCase().indexOf(filter.fulltext.toLowerCase()) !== -1);

        if (noteSubstr == false && opSubstr == false) {
          return;
        }
      }

      $scope.conversations.push(item);
    });
  };
});
