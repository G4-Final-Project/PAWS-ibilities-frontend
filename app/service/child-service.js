'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  'authService',

  function($q, $log, $http, authService) {
    $log.debug('Child Service');

    let service = {};
    service.children = [];

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
        return $http.post(`https://paw-sibilities-backend.herokuapp.com/api/child`, child, config);
      })
      .then(res => {
        $log.log('child created');
        let child = res.data;
        console.log('this is the child',child);
        service.children.unshift(child);
        console.log('this is the child array', service.children);
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

        return $http.get(`https://paw-sibilities-backend.herokuapp.com/api/child`, config);
      })
      .then(res => {
        $log.log('child was got');
        service.children = res.data;
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
        let url = `https://paw-sibilities-backend.herokuapp.com/api/child/${childId}`;
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return $http.put(url, child, config);
      })
      .then(res => {
        service.children.forEach((ele, idx) => {
          if(ele._id === res.data._id) service.children[idx] = res.data;
        });
        return res.data;
      })
      .catch(err => {
        $log.error(err.message);
        return $q.reject(err);
      });
    };

    service.deleteChild = (childId) => {
      $log.debug('#childService.deleteChild');

      return authService.getToken()
      .then(token => {
        let url = `https://paw-sibilities-backend.herokuapp.com/api/child/${childId}`;
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return $http.delete(url, config);
      })
      .then(res => {
        service.children.filter((ele, i) => {
          if(ele._id === childId) service.children.splice(i, 1);
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
