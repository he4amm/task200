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

    it('Should define getPage method', function() {
      expect(factory.getPage).toBeDefined()
      expect(factory.getPage).toEqual(jasmine.any(Function))
    });
  });
});