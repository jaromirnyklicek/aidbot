(function() {
  "use strict";
  angular.module("aidbotAdminApp", []).config(function($routeProvider) {
    return $routeProvider.when("/", {
      templateUrl: "views/conversations.html",
      controller: "ConversationCtrl"
    }).otherwise({
      redirectTo: "/"
    });
  });

}).call(this);