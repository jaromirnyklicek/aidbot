'use strict';

angular.module('aidbotAdminApp').controller('ConversationCtrl', function($scope, $http) {

  $scope.url = "http://screencast1.apiary.io";

  $scope.getIndex = function() {
    $http.get($scope.url + '/items').
      success(function(data) {
        $scope.items = data.items;
        $scope.status = null;
    });
  };

  $scope.getItem = function(id) {
    $http.get($scope.url + '/item/' + id).
      success(function(data) {
        $scope.id = data.id;
        $scope.name = data.name;
        $scope.description = data.description;
        $scope.status = null;
    });
  };

  $scope.createItem = function() {
    var dataItem = {"name": $scope.name, "description": $scope.description, "done": $scope.done, "priority": $scope.priority};
    $http.post($scope.url + '/item', dataItem).
      success(function(data) {
        $scope.status = data.status;
    });
  };

  $scope.updateItem = function(id) {
    var dataItem = {"name": $scope.name, "description": $scope.description};
    $http.put($scope.url + '/item/' + id, dataItem).
      success(function(data) {
        $scope.status = data.status;
    });
  };

  $scope.submitItem = function() {
    console.log("submit");
    if (angular.isNumber($scope.id)) {
      $scope.updateItem($scope.id);
    } else {
      $scope.createItem();
    }
  }

  $scope.deleteItem = function(id) {
    $http.delete($scope.url + '/item/' + id).
      success(function(data) {
        $scope.status = data.status;
    });
  };

});