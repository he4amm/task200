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
  .controller('UsersCtrl', function($scope, $state, $http, Page){
    Page.setTitle('Users');
    console.log($state.params.id)
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
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {

    $urlProvider.rule(function($injector, $location) {

      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      if(hasTrailingSlash) {

        //if last charcter is a slash, return the same url without the slash  
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      } 

    });

    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      rewriteLinks: false
    });


  }

  function run() {
    FastClick.attach(document.body);
  }

})();
