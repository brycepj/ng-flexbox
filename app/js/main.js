var angular = require('angular');

console.log('angular', angular);

angular.module('tester', [])
  .config(function() {
    console.log('hello world from main ctrl.js');
  });