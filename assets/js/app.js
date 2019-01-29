(function() {
  'use strict';
  
  angular
    .module('movies-app', ['ngRoute', 'LocalStorageModule'])
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
        redirectTo: '/movies'
      });
    }])
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
      .setPrefix('movies-app');
    })
    .filter('trusted', ['$sce', function ($sce) {
      return $sce.trustAsResourceUrl;
    }]);
  
})();