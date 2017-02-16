(function() {
  'use strict';

  angular.module('application')
    .controller('MainCtrl', MainCtrl);

  /** @ngInject */
  function MainCtrl($scope, Page){
    $scope.Page = Page;
  }
})();