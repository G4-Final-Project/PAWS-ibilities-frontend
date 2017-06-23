'use strict';

// require('./scss/reset.scss');
require('./scss/main.scss');
require('angular-material/angular-material.scss');


const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
require('@uirouter/angularjs');
require('angular-material');

const paws = angular.module('paws', ['ui.router', 'ngMaterial']);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( path => paws.config(context(path)));

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => paws.controller(pascalcase(path.basename(key, '.js')),  context(key)));

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => paws.service(camelcase(path.basename(key, '.js')), context(key)));

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => paws.component(camelcase(path.basename(key, '.js')), context(key)));
