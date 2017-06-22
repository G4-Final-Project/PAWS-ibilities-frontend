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
      console.log('this is the child', child);
      return petService.getPetChild(child)
      .then(child => {
        service.currentPet = child.pet;
        console.log('this is the current pet:', service.currentPet);
      });
    };
    // service.feedPet = () => {

    // };
    // service.groomPet = () => {

    // };
    // service.playPet = () => {

    // };
    return service;
  },
];
