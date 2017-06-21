'use strict';

// require('./scss/reset.scss');
// require('./scss/main.scss');


const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
require('@uirouter/angularjs');

const cfgram = angular.module('paws', ['ui.router', 'ngMaterial']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( path => cfgram.config(context(path)));

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => cfgram.controller(pascalcase(path.basename(key, '.js')),  context(key)));

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => cfgram.service(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => cfgram.component(camelcase(path.basename(key, '.js')), context(key)));
