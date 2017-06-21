'use strict';

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl',
};

function LoginController($log, $location, authService){
  $log.debug('LoginController');

  authService.getToken().then(()=> $location.url('/home'));
  this.login = function(){
    $log.log('loginCtrl.login()');
    $log.log('user', this.user)

    authService.login(this.user).then(()=> $location.url('/home'))
  };
}
