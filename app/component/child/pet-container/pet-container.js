'use strict';

// require('./_thumbnail-container.scss')

module.exports = {
  template: require('./pet-container.html'),
  controllerAs: 'petContainerCtrl',
  bindings: {
    pet: '<',
  },
  controller: [function() {
    this.$onInit = () => {

    };
  }],
};
