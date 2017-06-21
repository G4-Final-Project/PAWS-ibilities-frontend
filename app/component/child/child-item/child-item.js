'use strict';
// require('./_child-item.scss');

module.exports = {
  template: require('./child-item.html'),
  controllerAs: 'childItemCtrl',
  controller: ['$log', 'childService', function($log, childService) {
    $log.debug('child Item Controller');

    this.showEditGallery = false;

    this.deleteChild = () => {
      childService.deleteChild(this.child._id, this.child)
      .then(
        (res) => $log.log(`${res.status}, delete successfully`),
        err => $log.error(err)
      );
    };
  }],
  bindings: {
    child: '<',
  },
};
