'use strict'

module.exports = ['$log', '$location', 'authService', LandingController];

function LandingController($log, $location, authService) {
  let url = $location.url();
  this.showSignup = url === '/signup' || url === '/join';
}
