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
  .controller('HomeCtrl', function($scope, $state, $http, Page){
    Page.setTitle('Home');
  })
  .controller('AboutCtrl', function($scope, $state, $http, Page){
    Page.setTitle('About');
  })
  .controller('UsersMainCtrl', function($scope, $state, $http, Page, usersList, UsersPage){
    Page.setTitle('Users');
    $scope.users = usersList;
    $scope.currPage = 1;

    $state.go('users.content', {login: $scope.users[0].login});

    $scope.getNextPage = function () {
      $scope.currPage++;
      $scope.loadingNewPage = true;
      UsersPage.getData($scope.currPage).then(function(data){
        $scope.loadingNewPage = false;
        $scope.users.push.apply($scope.users ,data.map(function(userobj){
          return userobj;
        }));
      });
    }
    // ...
  })
  .controller('UsersCtrl', function($scope, $state, $http, Page, $stateParams, User){
    Page.setTitle('Users');

    function getInfo(login){
      User.getData(login).then(function(info){
        $scope.currUser = info;
      })
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
  .service('User', function($http, $q) {
    return {
      "getData": function(login){
        return getUserData(login);
      }
    }
    
    //fetch user data in deferred technique
    function getUserData(login) {
      // There will always be a promise so always declare it.
      var deferred = $q.defer();
      if (Cache[login]) {
          // Resolve the deferred $q object before returning the promise
          deferred.resolve(Cache[login]); 
          return deferred.promise;
      } 
      // else- not in cache 
      $http.get("https://api.github.com/users/"+login).success(function(data){
          // Store your data or what ever.... 
          // Then resolve
          deferred.resolve(data);               
      }).error(function(data, status, headers, config) {
          deferred.reject("Error: request returned status " + status); 
      });
      return deferred.promise;
    }
    // ...
  })
  .service('UsersPage', function($http, $q) {
    return {
      "getData": function(pageID){
        return getUsersPage(pageID);
      }
    }
    
    //fetch user data in deferred technique
    function getUsersPage(pageID) {
      // There will always be a promise so always declare it.
      var deferred = $q.defer();
      if (Cache[pageID]) {
          // Resolve the deferred $q object before returning the promise
          deferred.resolve(Cache[pageID]); 
          return deferred.promise;
      } 
      // else- not in cache 
      $http.get("https://api.github.com/users", {page: pageID}).success(function(data){
          // Store your data or what ever.... 
          // Then resolve
          deferred.resolve(data);               
      }).error(function(data, status, headers, config) {
          deferred.reject("Error: request returned status " + status); 
      });
      return deferred.promise;
    }
    // ...
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

    $stateProvider
      .state('users',{
        url: '/users',
        templateUrl: 'templates/usersMain.html',
        controller: 'UsersMainCtrl',
        resolve: {
          "usersList": function (UsersPage) {
            return UsersPage.getData(1);
          }
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
