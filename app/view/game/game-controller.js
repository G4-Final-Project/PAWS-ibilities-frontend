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

      this.walkPet = (child) => {
        child = childId;
        console.log('controller child id', child);
        return gameService.walkPet(child)
        .then(petState => {
          console.log('this is the petSate', petState);
          petState.totalWalks += 1
          return petState
        })
        .then(petState => {
          petService.updatePet(child, petState)
          console.log('pet has been updated');
        })
      };

      this.fetchChild = () => {
        return childService.fetchChild(childId)
        .then(child => {
          console.log('this is the child',child);
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
