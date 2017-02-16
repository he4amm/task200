(function() {
  'use strict';

  angular.module('application')
    .factory('Page', Page);

  /** @ngInject */
  function Page() {
    var title = 'default';

    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle }
    };
  }
})();