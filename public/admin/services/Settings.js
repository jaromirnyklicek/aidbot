'use strict';

aidbotAdminApp.factory('Settings', function($resource) {
  return $resource('/api/settings', {}, {
    update: {method: 'PUT'}
  });
});
