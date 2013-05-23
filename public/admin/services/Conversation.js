'use strict';

aidbotAdminApp.factory('Conversation', function($resource) {
  return $resource('/api/conversations/:id', {id: '@id'}, {
    update: {method: 'PUT'}
  });
});
