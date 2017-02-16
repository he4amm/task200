(function() {
  'use strict';

  angular.module('application')
    .config(config);

  /** @ngInject */
  function config($urlRouterProvider, $stateProvider, $locationProvider) {

    var initialPageResolve = function (GitHub) {
      return GitHub.getPage(1);
    }

    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('about',{
        url: '/about',
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      })
      .state('users',{
        url: '/users',
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl',
        resolve: {
          "initialPage": initialPageResolve
        }
      })
      .state('users.UserInfo',{
        url: '/:login',
        templateUrl: 'templates/UserInfo.html',
        controller: 'UserInfoCtrl'
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
  }
})();