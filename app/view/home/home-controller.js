'use strict';

// require('./_home.scss');

module.exports = [
  '$log',
  '$rootScope',
  '$window',
  '$location',
  'authService',
  'childService',
  function($log, $rootScope, $window, $location, authService, childService) {
    this.$onInit = () => {
      $log.debug('HomeController()');
      if(!$window.localStorage.token) {
        authService.getToken()
        .then(
          () => $location.url('/home'),
          () => $location.url('/signup')
        );
      }
      this.child = [];

      this.fetchChild = () => {
        return childService.fetchChild()
        .then(child => {
          this.child = child;
          console.log('this is the child in home', child);
          this.currentChild = this.child[0];
        })
        .catch(err => $log.error(err));
      };

      this.logout = () => {
        console.log('CLICK');
        return authService.logout()

        .catch(err => $log.error(err));
      };

      $rootScope.$on('locationChangeSuccess', this.fetchChild);
      return this.fetchChild();
    };
  }];
