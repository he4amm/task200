(function() {
  'use strict';

  angular.module('application')
    .factory('GitHub', GitHub);

  /** @ngInject */
  function GitHub($http){
    var method = 'GET';
    var dataType = 'application/javascript';
    var url = "https://api.github.com/users";

    var factory = {
      getUser: getUser,
      getPage: getPage
    }

    return factory;

    /////////////////

    function getUser(login) {
      return $http({
        method: method,
        dataType: dataType,
        url: url + "/" + login
      });
    }

    function getPage(id) {
      return $http({
        method: method,
        dataType: dataType,
        url: url + "?page=" + id
      });
    }
  }
})();