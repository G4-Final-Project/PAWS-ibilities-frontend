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
      console.log($location.$$url);
      let childId = $location.$$url.split('/pet/')[1];

      // this.fetchChild = (childId) => {
      //   return childService.fetchChild()
      //   .then(child => {
      //     console.log(child);
      //     this.child = child;
      //     this.currentChild = this.child[0];
      //   })
      //   .catch(err => $log.error(err));
      // };
    };

  },
];
