(function() {
  'use strict';
  
  angular
  .module('movies-app')
  .controller('app-controller', ctrl1);

  function ctrl1($http, localStorageService){
    /*jshint validthis: true*/
    var vm = this;
    vm.sw = true;
    vm.years = [2010, 2011, 2012, 2013, 2014, 2015];
    vm.movieGenres = [];
    vm.serieGenres = [];
    vm.movies = [];
    vm.series = [];
    vm.IMGS_PATH = 'http://image.tmdb.org/t/p/w500';
    vm.favs = [];
    vm.tempQuery = '';
    vm.total_pages_tv = 0;
    vm.total_pages = 0;
    vm.page_tv = 1;
    vm.page = 1;
    
    var URL = 'https://api.themoviedb.org/3/';
    var API_KEY = '?api_key=a1fd368308e42e448fe27b98fc6989ef';
    var LANG = "&language=";
    var QUERY = "&query=";
    var PAGE = "&page=";
    var GENRES = "&with_genres=";
    
    vm.getMoviesGenres = getMovieGenres();
    vm.getSerieGenres = getSerieGenres();
    vm.enterPressed = enterPressed;
    vm.enterPressedTv = enterPressedTv;
    vm.addFav = addFav;
    vm.fetchFavs = fetchFavs();
    vm.prev = prev;
    vm.next = next;
    vm.deleteFavs = deleteFavs;
    vm.hey = hey;
      

    function getMovieGenres() {
      var promise = $http.get(URL + 'genre/movie/list' + API_KEY);
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        vm.movieGenres = result.data.genres
      }
      function failureCallback(result) {
        console.log("Error", result)
      }
    }
    
    function getSerieGenres() {
      var promise = $http.get(URL + 'genre/tv/list' + API_KEY);
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        vm.serieGenres = result.data.genres
      }
      function failureCallback(result) {
        console.log("Error", result)
      }
    } 
    
    function enterPressed(keyEvent) {
      var input = document.getElementById('input-mov');
      if (keyEvent.which === 13){
        vm.tempQuery = input.value;
        getMovies('search/movie', vm.tempQuery, vm.page_tv);
        input.blur();
      }
    }
    
    function enterPressedTv(keyEvent) {
      var input = document.getElementById('input-tv');
      if (keyEvent.which === 13){
        vm.tempQuery = input.value;
        getMovies('search/tv', vm.tempQuery, vm.page);
        input.blur();
      }
    }
    
    function hey(sw){
    }
    
    function getMovies(search, query, page, genre) {
      var promise = $http.get(URL + search + API_KEY + QUERY + query + PAGE + page + GENRES + genre);
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        if(search.endsWith('movie')) {
          vm.movies = result.data.results;
          vm.total_pages = result.data.total_pages;
          console.log(vm.movies);
        }
        if(search.endsWith('tv')){
          vm.series = result.data.results;
          vm.total_pages_tv = result.data.total_pages;
          console.log(vm.series);
        } 
      }
      function failureCallback(result) {
        alert("Debe ingresar una búsqueda correcta!")
        console.log("Error", result)
      }
    }
    
   function next(val) {
     switch(val){
       case 0:
         if (vm.page != vm.total_pages){
           getMovies('search/movie', vm.tempQuery, ++vm.page);
         }
         break;
      case 1:
         if (vm.page_tv != vm.total_pages){
           getMovies('search/tv', vm.tempQuery, ++vm.page_tv);
         }
         break;
      }
    }
    
    function prev(val) {
      switch(val){
       case 0:
         if (vm.page - 1 > 0){
            getMovies('search/movie', vm.tempQuery, --vm.page);
         }
         break;
      case 1:
         if (vm.page_tv - 1 > 0){
           getMovies('search/tv', vm.tempQuery, --vm.page_tv);
         }
         break;
      }
    }
    
    function addFav(event, search) {
      var movie_id = event.target.attributes[0].value;
      $http.get(URL + search + movie_id + API_KEY)
      .then(function(res){
        if (localStorageService.keys().includes(movie_id)){
          //console.log("Can't. Already Fav");
        } else {
          //console.log("New Fav");
          localStorageService.set(movie_id, res.data);
          fetchFavs();
        }
      }, function(err){ console.log("Error", err) });
    }
    
    function fetchFavs(){
      vm.favs = [];
      var array = localStorageService.keys();
      for (var i = 0; i < array.length; i++) {
        vm.favs.push(localStorageService.get(array[i]));
      }
    }
    
    function deleteFavs(){
      localStorageService.clearAll();
      fetchFavs();
    }
    
  
 } //End Controller Function
    
    
})();