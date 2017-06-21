'use strict';

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'childService',
  'petService',
  function($log, $rootScope, $window, $location, authService, childService) {
    this.$onInit = () => {
    };
    this.fetchChild = () => {
      return childService.fetchChild()
      .then(child => {
        console.log(child);
        this.child = child;
        this.currentChild = this.child[0];
      })
      .catch(err => $log.error(err));
    };
  },
];
