(function() {
  'use strict';
  
  angular
    .module('movies-app', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
      
      $routeProvider
        .when('/', {
        templateUrl: 'views/movies.html'
      }).when('/movies', {
        templateUrl: 'views/movies.html'
      }).when('/series', {
        templateUrl: 'views/series.html'
      }).when('/favs', {
        templateUrl: 'views/favs.html'
      }).otherwise({
        redirectTo: '/'
      });
    
  }])
})();