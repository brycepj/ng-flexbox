module.exports = function() {
  angular.module('tester', [])
    .config(function() {
      console.log('hello world from main ctrl.js');
    });
};