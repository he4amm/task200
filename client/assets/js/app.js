(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])


  /*
  *
  *
  *
  * 
  * - Controllers
  *
  *
  *
  * 
  */
  .controller('MainCtrl', function($scope, Page){
    $scope.Page = Page;
  })


  .controller('HomeCtrl', function(Page){
    Page.setTitle('Home');
  })


  .controller('AboutCtrl', function(Page){
    Page.setTitle('About');
  })


  .controller('UsersCtrl', function($scope, $state, Page, initialPage, GitHub){
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
  })


  .controller('UserInfoCtrl', function($scope, $state, $http, Page, $stateParams, GitHub){
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
  })


  /*
  *
  *
  *
  * 
  * - Services
  *
  *
  *
  * 
  */
 

  .factory('Page', function() {
    var title = 'default';

    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle }
    };
  })


  .factory('GitHub', function($http){
    var method = 'GET';
    var dataType = 'application/javascript';
    var url = "https://api.github.com/users";

    return {
      getUser: function (login) {

        return $http({
          method: method,
          dataType: dataType,
          url: url + "/" + login
        });

      },
      getPage: function (id) {

        return $http({
          method: method,
          dataType: dataType,
          url: url + "?page=" + id
        });

      }
    };
  })
    .config(config)
    .run(run)
  ;


  /*
  *
  *
  *
  * 
  * - config()
  *
  *
  *
  * 
  */
  function config($urlRouterProvider, $stateProvider, $locationProvider) {

    var initialPageResolve = function (GitHub) {
      return GitHub.getPage(1);
    }

    $stateProvider
      .state('users',{
        url: '/users',
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl',
        resolve: {
          "initialPage": initialPageResolve
        }
      })

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      rewriteLinks: false
    });

    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      if(hasTrailingSlash) {
        //if last charcter is a slash, return the same url without the slash  
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      } 
    });
    // ...
  }


  /*
  *
  *
  *
  * 
  * - run()
  *
  *
  *
  * 
  */
  function run() {
    FastClick.attach(document.body);
  }

})();
