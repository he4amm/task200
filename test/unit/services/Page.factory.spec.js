describe('Service: Page', function(){
    var factory;

    beforeEach(function(){
        module('application');

        inject(function($injector){
            factory = $injector.get('Page');
        });
    });

    describe('Intialization', function(){

        it('Should instantiate with title default', function(){
            expect(factory.title()).toEqual('default');
        });

        it('Should throw title if set the title to Home', function(){
            factory.setTitle('Home');
            expect(factory.title()).toEqual('Home');
        });

    });
});