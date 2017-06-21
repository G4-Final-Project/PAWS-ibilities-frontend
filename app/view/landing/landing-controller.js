'use strict';

module.exports = ['$log', '$location', LandingController];

function LandingController($log, $location) {
  let url = $location.url();
  this.showSignup = url === '/signup' || url === '/join';
}
