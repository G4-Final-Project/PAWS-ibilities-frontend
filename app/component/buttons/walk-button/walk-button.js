'use strict';

require('./_walk-button.scss');

module.exports = {
  controllerAs: 'walkButtonCtrl',
  controller: ['$log', 'gameService', function($log, gameService){
    this.$onInit = () => {
      $log.debug('Pet Button Controller');

      this.walkPet = () => {
        console.log('Walked');
        return gameService.walkPet(this.child, this.pet);
      };
    };
  }],
};
