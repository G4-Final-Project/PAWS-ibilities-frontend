'use strict';
// require('./_child-item.scss');

module.exports = {
  template: require('./child-item.html'),
  controllerAs: 'childItemCtrl',
  controller: ['$log', 'childService', 'petService', function($log, childService, petService) {
    $log.debug('child Item Controller');
    // console.log('hello');

    this.addPet = () => {
      // console.log('child id in addPet', this.child._id);
      return petService.createPet(this.child._id, this.pet)
      .then((res) => {
        console.log(res);
        res = this.pet;
        return res;
      });
    };

    this.deleteChild = () => {
      childService.deleteChild(this.child._id, this.child)
      .then(
        (res) => $log.log(`${res.status}, delete successfully`),
        err => $log.error(err)
      );
    };

    this.deletePet = () => {
      petService.deletePet(this.child._id, this.pet)
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
