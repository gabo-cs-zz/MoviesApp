(function() {
  'use strict';
  
  angular
  .module('movies-app')
  .controller('app-controller', ctrl1);

  function ctrl1($http, movService, localStorageService){
    /*jshint validthis: true*/
    var vm = this;
    vm.IMGS_PATH = 'http://image.tmdb.org/t/p/w500';
    vm.movieYears = movService.years;
    vm.movieGenres = [];
    vm.serieGenres = [];
    vm.movies = [];
    vm.series = [];
    vm.favs = [];
    vm.tempQuery = '';
    vm.total_pages_tv = 0;
    vm.total_pages = 0;
    vm.page_tv = 1;
    vm.page = 1;
    vm.trailerUrl = '';
    vm.genre = '';
    vm.genre_tv = '';
    vm.searchValue = '';
    vm.year = 0;
    
    vm.getMoviesGenres = getMovieGenres();
    vm.getSerieGenres = getSerieGenres();
    vm.enterPressed = enterPressed;
    vm.enterPressedTv = enterPressedTv;
    vm.addFav = addFav;
    vm.findByGenre = findByGenre;
    vm.findByYear = findByYear;
    vm.findByYearTv = findByYearTv;
    vm.findByGenreTv = findByGenreTv;
    vm.getTrailer = getTrailer;
    vm.fetchFavs = fetchFavs();
    
    vm.prev = prev;
    vm.next = next;
    vm.deleteFavs = deleteFavs;
    
    function getMovieGenres() {
      var promise = $http.get(movService.URL + 'genre/movie/list' + movService.API_KEY);
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        vm.movieGenres = result.data.genres
      }
      function failureCallback(result) {
        console.log("Error", result)
      }
    }

    function getSerieGenres() {
      var promise = $http.get(movService.URL + 'genre/tv/list' + movService.API_KEY);
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        vm.serieGenres = result.data.genres
      }
      function failureCallback(result) {
        console.log("Error", result)
      }
    } 
    
    function getMovies(query, page, genre='', year='') {
      var promise = $http.get(movService.URL + movService.globalSearch + movService.API_KEY + movService.QUERY + query + movService.PAGE + page + '&include_video=true' + '&with_genres=' + genre + '&%e_year=' + year);
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        if(movService.globalSearch.endsWith('movie')) {
          vm.movies = result.data.results;
          vm.total_pages = result.data.total_pages;
        }
        if(movService.globalSearch.endsWith('tv')){
          vm.series = result.data.results;
          vm.total_pages_tv = result.data.total_pages;
        } 
      }
      function failureCallback(result) {
        alert("Debe ingresar una búsqueda correcta!")
        console.log("Error", result)
      }
    }
    
    function enterPressed() {
      movService.globalSearch = 'search/movie';
      if (vm.searchValue === '') movService.globalSearch = 'discover/movie';
      vm.tempQuery = vm.searchValue;
      getMovies(vm.tempQuery, vm.page);
    }
    
    function enterPressedTv(keyEvent) {
      movService.globalSearch = 'search/tv';
      if (vm.searchValue === '') movService.globalSearch = 'discover/tv';
      vm.tempQuery = vm.searchValue;
      getMovies(vm.tempQuery, vm.page_tv);
    }
    
   function next(val) {
     switch(val){
       case 0:
         if (vm.page != vm.total_pages){
           getMovies(vm.tempQuery, ++vm.page, vm.genre.id);
         }
         break;
      case 1:
         if (vm.page_tv != vm.total_pages){
           getMovies(vm.tempQuery, ++vm.page_tv, vm.genre_tv.id);
         }
         break;
      }
    }
    
    function prev(val) {
      switch(val){
       case 0:
         if (vm.page - 1 > 0){
            getMovies(vm.tempQuery, --vm.page, vm.genre.id);
         }
         break;
      case 1:
         if (vm.page_tv - 1 > 0){
           getMovies(vm.tempQuery, --vm.page_tv, vm.genre_tv.id);
         }
         break;
      }
    }
    
    function addFav(event, search) {
      var movie_id = event.target.attributes[0].value;
      $http.get(movService.URL + search + movie_id + movService.API_KEY)
      .then(function(res){
        if (localStorageService.keys().includes(movie_id)){
          // Already Fav;
        } else {
          // New Fav
          localStorageService.set(movie_id, res.data);
          fetchFavs();
        }
      }, function(err){ console.log("Error", err) });
    }
    
    function getTrailer(event, search) {
      var movie_id = event.target.attributes[0].value;
      $http.get(movService.URL + search + movie_id + '/videos' + movService.API_KEY)
      .then(function(res){
        vm.trailerUrl = movService.YT_URL + res.data.results[0].key;
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
    
    function findByGenre() {
      vm.tempQuery = '';
      movService.globalSearch = 'discover/movie';
      getMovies(vm.tempQuery, vm.page, vm.genre.id, vm.year);
    }
    
    function findByYear() {
      vm.tempQuery = '';
      movService.globalSearch = 'discover/movie';
      getMovies(vm.tempQuery, vm.page, vm.genre.id, vm.year);
    }
    
    function findByGenreTv() {
      vm.tempQuery = '';
      movService.globalSearch = 'discover/tv';
      getMovies(vm.tempQuery, vm.page_tv, vm.genre_tv.id, vm.genre_tv);
    }
    
    function findByYearTv() {
      vm.tempQuery = '';
      movService.globalSearch = 'discover/tv';
      getMovies(vm.tempQuery, vm.page_tv, vm.genre_tv.id, vm.year);
    }
    
    getMovies('', vm.page);
    /*movService.globalSearch = 'discover/tv';
    getMovies('', vm.page_tv);*/
    
    
 } //End Controller Function
    
    
})();