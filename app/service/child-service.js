'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  'authService',

  function($q, $log, $http, authService) {
    $log.debug('Child Service');

    let service = {};
    service.child = [];

    service.createChild = (child) => {
      $log.debug('service.createChild');
      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return $http.post(`${__API_URL__}/api/child`, child, config);
      })
      .then(res => {
        $log.log('child created');
        let child = res.data;
        service.child.unshift(child);
        return child;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    service.fetchChild = () => {
      $log.debug('#service.fetchChild');

      return authService.getToken()
      .then(token => {
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        return $http.get(`${__API_URL__}/api/child`, config);
      })
      .then(res => {
        $log.log('child was got');
        service.child = res.data;
        return res.data;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    service.updateChild = (childId, child) => {
      $log.debug('#childService.updateChild');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/child/${childId}`;
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        return $http.put(url, child, config);
      })
      .then(res => {
        service.child.forEach((ele, idx) => {
          if(ele._id === res.data._id) service.child[idx] = res.data;
        });
        return res.data;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    service.deleteChild = (childId, child) => {
      $log.debug('#childService.deleteChild');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/child/${childId}`;
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        return $http.delete(url, config);
      })
      .then(res => {
        service.child.filter((ele, i) => {
          if(ele._id === childId) service.child.splice(i, 1);
        });
        return res;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    return service;
  },
];
