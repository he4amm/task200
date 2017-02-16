(function() {
  'use strict';

  angular.module('application')
    .run(run);

  /** @ngInject */
  function run() {
    FastClick.attach(document.body);
  }
})();