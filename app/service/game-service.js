'use strict';


module.exports = [
  '$q',
  '$log',
  '$http',
  'petService',
  function($q, $log, $http, petService) {
    $log.debug('pet service');
    let service = {};



    let pet = petService.getPetChild(child, pet)

    service.walkPet = (child, pet) => {
        console.log('this is the child:', child);
        console.log('this is the pet:', pet);
    };
    // service.feedPet = () => {

    // };
    // service.groomPet = () => {

    // };
    // service.playPet = () => {

    // };
  },
];
