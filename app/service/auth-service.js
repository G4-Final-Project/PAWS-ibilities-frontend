'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  '$window',
  function($q, $log, $http, $window) {
    $log.debug('authService');

    let service = {};
    let token = null;

    function setToken(_token) {
      $log.debug('authService.setToken()');

      if(!_token) return $q.reject(new Error('No token'));
      $window.localStorage.setItem('token', _token);
      token = _token;

      return $q.resolve(token);
    }

    service.getToken = function() {
      $log.debug('authService.getToken()');

      if(token) return $q.resolve(token);
      token = $window.localStorage.getItem('token');
      if(token) return $q.resolve(token);

      return $q.reject(new Error('Token not found'));
    };

    service.logout = function() {
      $log.debug('authService.logout()');

      $window.localStorage.removeItem('token');
      token = null;
      $window.location = '/';

      return $q.resolve();
    };

    service.signup = function(user) {
      $log.debug('authService.signup()');

      let url = `http://localhost:3000/api/user`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      return $http.post(url, user, config)
      .then(res => {
        $log.log('success', res.data);
        return setToken(res.data);
      })
      .catch(err => {
        $log.error('failure', err);
        return $q.reject(err);
      });
    };

    service.login = function(user) {
      $log.debug('authService.login()');

      let url = `http://localhost:3000/api/user`;
      let base64 = $window.btoa(`${user.username}:${user.password}`);
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${base64}`,
        },
      };

      return $http.get(url, config)
      .then(res => {
        $log.log('success', res.data);
        return setToken(res.data);
      })
      .catch(err => {
        $log.error('failure', err.message);
        return $q.reject(err);
      });
    };

    return service;
  },
];
