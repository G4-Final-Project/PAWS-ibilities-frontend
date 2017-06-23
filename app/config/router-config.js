'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', '/join#signup');
  $urlRouterProvider.when('/signup', '/join#signup');
  $urlRouterProvider.when('/login', '/join#login');


  let routes = [
    {
      name: 'home',
      url: '/home',
      template: require('../view/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl',
    },
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl',
    },
    {
      name: 'game',
      url: `/pet/:id`,
      template: require('../view/game/game.html'),
      controller: 'GameController',
      controllerAs: 'gameCtrl',
    },
    {
      name: 'about',
      url: '/about',
      template: require('../view/about/about.html'),
    },
  ];

  routes.forEach($stateProvider.state);
}
