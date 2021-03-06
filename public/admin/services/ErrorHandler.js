'use strict';

aidbotAdminApp.factory('errorHandler', function ($q, $flash, $location) {
  return function (promise) {
    return promise.then(function (response) {
      // everything is ok, don't do anything
      return response;
    }, function (response) {
      var message = 'Error occured during the communication with webservice. Try it later, please.';

      if (response.status == 401) {
        $flash.notify('alert', 'Please log in.');
        $location.path('/');
      } else if (response.status = 403) {
        message = 'You are not allowd to manipulate with this resource.';
      } else {
        if (response.data.message !== undefined) {
          message = response.data.message;
        }
      }

      $flash.notify('alert', message);
      return $q.reject(response);
    });
  };
});

aidbotAdminApp.config(function ($httpProvider) {
  $httpProvider.responseInterceptors.push('errorHandler');
});
