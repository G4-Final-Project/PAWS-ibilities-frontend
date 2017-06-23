'use strict';


module.exports = [
  '$q',
  '$log',
  '$http',
  'petService',
  function($q, $log, $http, petService) {
    $log.debug('pet service');
    let service = {};
    service.currentPet;

    service.walkPet = (child) => {
      // console.log('this is the child', child);
      return petService.getPetChild(child)
      .then(pet => {
        console.log('child in game service', pet);
        service.currentPet = pet;
        console.log('this is the current pet:', service.currentPet);
        return pet;
      });
    };

    service.feedPet = (child) => {
      return petService.getPetChild(child)
      .then(pet => {
        service.currentPet = pet;
        return pet;
      });
    };

    service.playPet = (child) => {
      return petService.getPetChild(child)
      .then(pet => {
        service.currentPet = pet;
        return pet;
      });
    };

    service.hygienePet = (child) => {
      return petService.getPetChild(child)
      .then(pet => {
        service.currentPet = pet;
        return pet;
      });
    };

    return service;
  },
];
