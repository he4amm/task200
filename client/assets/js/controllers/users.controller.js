(function() {
  'use strict';

  angular.module('application')
    .controller('UsersCtrl', UsersCtrl);

  /** @ngInject */
  function UsersCtrl($scope, $state, Page, initialPage, GitHub){
    Page.setTitle('Users');
    $scope.users = initialPage.data;
    $scope.currPage = 1;

    $state.go('users.UserInfo', {login: $scope.users[0].login});

    $scope.getNextPage = function () {
      $scope.currPage++;
      $scope.loadingNewPage = true;

      GitHub.getPage($scope.currPage).then(function(response){
        $scope.loadingNewPage = false;
        $scope.users.push.apply($scope.users, response.data.map(function(userobj){
          return userobj;
        }));
      });
    }
    // ...
  }
})();