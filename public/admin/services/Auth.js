'use strict';

aidbotAdminApp.factory('Auth', function($resource) {
  return $resource('/auth/:action', {action: '@action'}, {
    perform: {method: 'POST'}
  });
});
