'use strict';

describe('Controller: SearchfilmctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('mymovies41FrontendApp'));

  var SearchfilmctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchfilmctrlCtrl = $controller('SearchfilmctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(SearchfilmctrlCtrl.awesomeThings.length).toBe(3);
  });*/
});
