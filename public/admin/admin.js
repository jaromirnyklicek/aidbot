'use strict';

var aidbotAdminApp = angular.module('aidbotAdminApp', ['ngResource', 'Notification']);

aidbotAdminApp.config(function($routeProvider) {

  $routeProvider.
    when('/', {
      controller: 'ConversationListController',
      templateUrl: 'views/conversation-list.html'
    }).
    when('/conversation/:id', {
      controller: 'ConversationController',
      templateUrl: 'views/conversation.html'
    }).
    when('/users', {
      controller: 'UserListController',
      templateUrl: 'views/user-list.html'
    }).
    when('/user', {
      controller: 'UserController',
      templateUrl: 'views/user.html'
    }).
    when('/user/:id', {
      controller: 'UserController',
      templateUrl: 'views/user.html'
    });
});
