describe('Controller: UsersCtrl', function() {

  // load the controller's module
  beforeEach(module('application'));

  var UsersCtrl,
      GitHubMock,
      GitHub,
      $scope,
      Page,
      $state,
      getResponse = {data: [{login: 'user1'}, {login: 'user2'}, {login: 'user3'}]};

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $injector, _$state_, $q, $httpBackend) {
    GitHubMock = {
      getUser: function(login) {},
      getPage: function(id) {}
    };
    spyOn(GitHubMock, 'getUser').and.callThrough();

    spyOn(GitHubMock, 'getPage').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(getResponse);
      return deferred.promise;
    });

    $httpBackend.whenGET('templates/home.html').respond(function () {
      return getResponse;
    });

    $state = _$state_;

    spyOn($state, 'go');
    Page = $injector.get('Page');
    $scope = $rootScope.$new();
    UsersCtrl = $injector.get('$controller')('UsersCtrl', {
      $scope: $scope,
      initialPage: {data: [{login: 'user1'}, {login: 'user2'}, {login: 'user3'}]},
      GitHub: GitHubMock,
      $state: $state,
    });
  }));

  it('Should instaniate PageService with title "Users" ', function () {
    expect(Page.title()).toEqual('Users');
  });

  it('Should attach initialPage list of data in resolve function to the $scope.users', function() {
    expect($scope.users.length).toBe(3);
  });

  it('Should be the scope currPage to equal 1 ', function () {
    expect($scope.currPage).toBe(1);
  });

  it('Should get first user id from $scope.users and go to state (users.UserInfo) ', function(){
    expect($state.go).toHaveBeenCalledWith('users.UserInfo', {login: 'user1'});
  });

  it('Should test $scope.getNextPage()', function(){
    //  Call scope
    $scope.getNextPage();
    // expect to increment num of pages to 2
    expect($scope.currPage).toBe(2);
    // apply scope changes
    $scope.$apply();
    // expect $scope.users which is holding data from backend of users
    expect($scope.users.length).toBe(6);
  });
});