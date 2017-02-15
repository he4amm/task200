describe('Service: GitHub', function() {

  beforeEach(module('application'));

  var $controller;
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('Intialization', function() {
    var factory = null;

    beforeEach(inject(function(GitHub) {
      factory = GitHub;
    }))

    it('Should define getUser method', function() {
      expect(factory.getUser).toBeDefined()
      expect(factory.getUser).toEqual(jasmine.any(Function))
    });



    it('should mock getUser request object of user data', inject(function($httpBackend){
      var fackData = { name: 'user1' }, 
          fackResponse = {};

      $httpBackend.when('GET', 'https://api.github.com/users/userID').respond(fackData);
      $httpBackend.when('GET', 'templates/home.html').respond(fackData);

      factory.getUser('userID').success(function(data){
        fackResponse = data;
      });

      $httpBackend.flush();
      expect(fackResponse).toEqual(fackData);
    }));



    it('Should define getPage method', function() {
      expect(factory.getPage).toBeDefined()
      expect(factory.getPage).toEqual(jasmine.any(Function))
    });



    it('should mock getUser request object of user data', inject(function($httpBackend){
      var fackData = [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }], 
          fackResponse = {};

      $httpBackend.when('GET', 'https://api.github.com/users?page=1').respond(fackData);
      $httpBackend.when('GET', 'templates/home.html').respond(fackData);

      factory.getPage(1).success(function(data){
        fackResponse = data;
      });

      $httpBackend.flush();
      expect(fackResponse).toEqual(fackData);
    }));
  });
});