(function() {
  'use strict';

  angular.module('application')
    .controller('HomeCtrl', HomeCtrl);

  /** @ngInject */
  function HomeCtrl(Page){
    Page.setTitle('Home');
  }
})();