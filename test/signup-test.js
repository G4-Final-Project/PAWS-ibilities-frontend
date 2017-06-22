'use strict';

require('angular');
require('angular-mocks');
require('karma-jasmine');

describe('Testing the signup component', function() {
  beforeEach(() => {
    angular.mock.module('paws');
    angular.mock.inject(($rootScope, $componentController, $window, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$httpBackend = $httpBackend;
      this.signupCtrl = $componentController('signupCtrl');
      this.authService = authService;
      this.signupCtrl.$onInit();
    });
  });

  afterEach(() => {
    this.$window.localStorage.removeItem('token');
  });
  
  describe('testing signup method', () => {
    it('should make a valid POST request', () => {
      let expectUrl = 'http://localhost:3000/api/user';
      let expectHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      let expectUser = {
        username: 'Frank Underwood',
        password: 'hunter2',
        email: 'frankUnder@wood.com',
        phone: '2068675309',
      };
      
      this.$httpBackend.expectPOST(expectUrl, expectHeaders, expectUser).respond(200, 'token');
      
      this.signupCtrl.signup(expectUser)
      .then(() => {
        expect(this.$window.localStorage.token).to.equal('token');
        this.$httpBackend.flush();
        this.$rootScope.apply();
      });
    });
  });
});
