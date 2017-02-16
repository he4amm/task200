(function() {
  'use strict';

  angular.module('application')
    .controller('UserInfoCtrl', UserInfoCtrl);

  /** @ngInject */
  function UserInfoCtrl($scope, $state, $http, Page, $stateParams, GitHub){
    Page.setTitle('Users');
    $scope.currUser = {};

    function getInfo(login){
      GitHub.getUser(login).then(function(response){
        $scope.currUser = response.data;
      });
    }

    $scope.$watch(function() {
      return $stateParams.login;
    }, function(newLogin) {
      getInfo(newLogin);
    });
    // ...
  }
})();