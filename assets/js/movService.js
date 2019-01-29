(function() {
  'use strict';
  
  angular
  .module('movies-app')
  .service('movService', function($http){
    this.API_KEY = '?api_key=a1fd368308e42e448fe27b98fc6989ef';
    this.URL = 'https://api.themoviedb.org/3/';
    this.YT_URL = "https://www.youtube.com/embed/";
    this.QUERY = "&query=";
    this.PAGE = "&page=";
    this.globalSearch = 'discover/movie';
    this.years = [];
    
    //Fill some years
    for (var i = 1960; i <= 2018; i++) {
      this.years.push(i);
    }
    
  })
  
})();

