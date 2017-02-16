describe('Controller: MainCtrl', function(){
  var $rootScope,
      $scope,
      controller;

  beforeEach(function(){
    module('application');

    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')('MainCtrl', {$scope: $scope});
    });
  });

  describe('Intialization', function(){
    it('Should instaniate $scope.page with Page factory', function(){
      expect($scope.Page.title()).toEqual('default');
    });
  });
});