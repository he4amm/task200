describe('Controller: UserInfoCtrl', function(){
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
      controller = $injector.get('$controller')('UserInfoCtrl', {$scope: $scope, Page: Page});
    });
  });

  describe('Intialization', function(){
    it('Should instaniate PageService with title "Users" ', function(){
      expect(Page.title()).toEqual('Users');
    });
  });
});