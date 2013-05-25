'use strict';

aidbotAdminApp.factory('errorHandler', function ($q, $flash, $location) {
  return function (promise) {
    return promise.then(function (response) {
      // everything is ok, don't do anything
      return response;
    }, function (response) {
      if (response.status == 401) {
        $flash.notify('alert', 'You are not allowd to manipulate with this resource. Please log in.');
        $location.path('/');
      } else {
        var message = 'Error occured during the communication with webservice. Try it later, please.';
        if (response.data.message !== undefined) {
          message = response.data.message;
        }
        $flash.notify('alert', message);
        return $q.reject(response);
      }
    });
  };
});

aidbotAdminApp.config(function ($httpProvider) {
  $httpProvider.responseInterceptors.push('errorHandler');
});
