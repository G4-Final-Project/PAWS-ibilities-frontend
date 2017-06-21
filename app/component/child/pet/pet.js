'use strict';

module.exports = {
  template: require('./pet.html'),
  controllerAs: 'petCtrl',
  bindings: {
    pet: '<',
    child: '<',
  },
  controller:[
    '$log',
    'petService',
    function($log){
      this.$onInit = () =>{
        $log.debug('petCtrl');

      };
    },
  ],
};
