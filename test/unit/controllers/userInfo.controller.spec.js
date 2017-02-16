describe('Controller: UserInfoCtrl', function(){
  var $rootScope,
      $scope,
      controller,
      Page,
      GitHubMock,
      getResponse = {data: {login: 'user1', name: 'First Last', id: '1'}};

  beforeEach(function(){
    module('application');

    inject(function ($injector, $q) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      Page = $injector.get('Page');
      GitHubMock = {
        getUser: function(login) {},
        getPage: function(id) {}
      };

      spyOn(GitHubMock, 'getUser').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(getResponse);
        return deferred.promise;
      });

      controller = $injector.get('$controller')('UserInfoCtrl', {
        $scope: $scope, 
        Page: Page,
        GitHub: GitHubMock
      });
    });
  });

  describe('Intialization', function(){
    it('Should instaniate PageService with title "Users" ', function(){
      expect(Page.title()).toEqual('Users');
    });

    it('Should test using $digest for $scope.currUser', function(){
      expect($scope.currUser).toEqual({});

      $scope.$digest();
      expect($scope.currUser).toEqual(getResponse.data);
    });
  });
});