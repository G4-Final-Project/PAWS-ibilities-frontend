'use strict';

// require('./_home.scss');

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'childService',
  'petService',
  function($log, $rootScope, $window, $location, authService, childService, petService) {
    this.$onInit = () => {
      $log.debug('HomeController()');
      if(!$window.localStorage.token) {
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup')
        );
      }
      this.child = [];
      this.pet = [];

      this.fetchChild = () => {
        return childService.fetchChild()
        .then(child => {
          console.log('fetchChild');
          this.child = child;
          this.currentChild = this.child[0];
        })
        .catch(err => $log.error(err));
      };

      this.fetchPets = () => {
        return petService.fetchAllPets()
        .then(pet => {
          console.log( 'this is the pet', pet);
          this.pet = pet;
          this.currentPet = this.pet[0];
        });
      };

      this.logout = () => {
        return authService.logout()

        .catch(err => $log.error(err));
      };

      // this.test = () => {
      //   return petService.fetchAllPets()
      //   .then(res => {
      //     console.log('this is the res', res);
      //   });
      // };
      this.fetchAll = () => {
        this.fetchChild();
        this.fetchPets();
      };

      $rootScope.$on('locationChangeSuccess', this.fetchAll);
      return this.fetchAll();
    };
  }];
