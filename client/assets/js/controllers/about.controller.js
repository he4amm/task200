(function() {
  'use strict';

  angular.module('application')
    .controller('AboutCtrl', AboutCtrl);

  /** @ngInject */
  function AboutCtrl(Page){
    Page.setTitle('About');
  }
})();