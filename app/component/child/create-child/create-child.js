'use strict';

// require('./_create-child.scss');

module.exports = {
  template: require('./create-child.html'),
  controllerAs: 'createChildCtrl',
  controller: ['$log', 'childService', function($log, childService) {
    this.$onInit = () => {
      $log.debug('Create Child Controller');
      this.child = {};

      this.createChild = () => {
        return childService.createChild(this.child)
        .then(() => {
          let res = this.child;
          this.child.name = null;
          this.child.phone = null;
          return res;
        })
        .catch(err => $log.error(err));
      };
    };
  }],
};
