'use strict';

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'childService',
  'petService',
  'gameService',
  function($log, $rootScope, $window, $location, authService, childService, petService, gameService) {
    this.$onInit = () => {
      console.log($location.$$url);
      let childId = $location.$$url.split('/pet/')[1];

      this.walkPet = () => {
        return gameService.walkPet(this.pet);
      };

      this.fetchChild = () => {
        return childService.fetchChild(childId)
        .then(child => {
          console.log(child);
          this.child = child;
          this.currentChild = this.child[0];
        })
        .catch(err => $log.error(err));
      };

      this.fetchPet = () => {
        return petService.getPetChild(childId)
        .then(pet => {
          console.log('this is the pet', pet);
          this.pet = pet;
          // this.currentPet = this.pet[0];
        })
        .catch(err => $log.error(err));
      };

      this.fetchAll = () => {
        this.fetchChild();
        this.fetchPet();
      };
      $rootScope.$on('locationChangeSuccess', this.fetchAll);
      return this.fetchAll();
    };
  },
];
