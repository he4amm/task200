describe('Controller: AboutCtrl', function(){
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
      controller = $injector.get('$controller')('AboutCtrl', {$scope: $scope, Page: Page});
    });
  });

  describe('Intialization', function(){
    it('Should instaniate PageService with title "Home" ', function(){
      expect(Page.title()).toEqual('About');
    });
  });
});