'use strict';

module.exports = {
    template: require('./pet-buttons.html'),
    controllerAs: 'petButtonCtrl',
    controller: ['$log', 'gameService', function($log, gameService){
        this.$onInit = () => {
            $log.debug('Pet Button Controller');
            
            this.walkPet = () => {
                return gameService.walkPet(this.child, this.pet);
            }
        }
    }]
}