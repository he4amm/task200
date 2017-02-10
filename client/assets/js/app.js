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


  .controller('MainCtrl', function($scope, Page){
    $scope.Page = Page;
  })


  .controller('HomeCtrl', function($scope, $state, $http, Page){
    Page.setTitle('Home');
  })


  .controller('UsersMainCtrl', function($scope, $state, $http, Page, usersList, User){
    Page.setTitle('Users');
    $scope.users = usersList;
    $state.go('users.content', {login: $scope.users[0].login});
    $scope.getNextPage = function (pageID) {
      usersPage($http, pageID);
    }
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
  })


  .controller('AboutCtrl', function($scope, $state, $http, Page){
    Page.setTitle('About');
  })










  .factory('Page', function() {
    var title = 'default';
    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle }
    };
  })


  .service('User', function($http, $q) {

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

    return {
      "getData": function(login){
        return getUserData(login);
      }
    }

  })




    .config(config)
    .run(run)
  ;










  // config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider.rule(function($injector, $location) {

      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      if(hasTrailingSlash) {

        //if last charcter is a slash, return the same url without the slash  
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      } 

    });

    $stateProvider
      .state('users',{
        url: '/users',
        templateUrl: 'templates/usersMain.html',
        controller: 'UsersMainCtrl',
        resolve: {
          "usersList": function ($http) {
            return usersPage($http, 1);
          }
        }
      })

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      rewriteLinks: false
    });


  }

  function run() {
    FastClick.attach(document.body);
  }

  function usersPage($http, pageID) {
    return $http.get("https://api.github.com/users", {page: pageID})
      .then(function (response) {
        return response.data;
      });
  }

})();
