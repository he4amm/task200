describe('Controller: HomeCtrl', function(){
  var $rootScope,
      $scope,
      controller,
      Page;

  beforeEach(function(){
    module('application');

    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      Page = $injector.get('Page');
      controller = $injector.get('$controller')('HomeCtrl', {$scope: $scope, Page: Page});
    });
  });

  describe('Intialization', function(){
    it('Should instaniate PageService with title "Home" ', function(){
      expect(Page.title()).toEqual('Home');
    });
  });
});