(function() {
  'use strict';
  
  angular
  .module('movies-app')
  .controller('app-controller', ctrl1);

  function ctrl1($http, localStorageService){
    /*jshint validthis: true*/
    var vm = this;
    vm.moviesToLoad = false;
    vm.years = [2010, 2011, 2012, 2013, 2014, 2015];
    vm.movieGenres = [];
    vm.serieGenres = [];
    vm.movies = [];
    vm.favs = [];
    
    var URL = 'https://api.themoviedb.org/3/';
    /*var SEARCH = 'genre/movie/list';*/
    var API_KEY = '?api_key=a1fd368308e42e448fe27b98fc6989ef';
    var LANG = "&language=";
    var QUERY = "&query=";
    vm.IMGS_PATH = 'http://image.tmdb.org/t/p/w500';
    vm.getMoviesGenres = getMovieGenres();
    vm.getSerieGenres = getSerieGenres();
    vm.enterPressed = enterPressed;
    vm.addFav = addFav;
    vm.fetchFavs = fetchFavs();
    /*$scope.SITE_PATH="http://image.tmdb.org/t/p/w500/"
    $scope.title = 'search ctrl';
    $scope.moviesLoaded=false;*/
      

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
      var input = document.getElementById('input-search');
      if (keyEvent.which === 13){
        console.log("Clicked")
        getMovies('search/movie', input.value);
        input.blur();
      }
    }
    
    function getMovies(search, query) {
      var promise = $http.get(URL + search + API_KEY + QUERY + query + '&page=1');
      promise.then(successCallback, failureCallback)
      function successCallback(result) {
        vm.movies = result.data.results;
        console.log(result)
      }
      function failureCallback(result) {
        alert("Debe ingresar una búsqueda!")
        console.log("Error", result)
      }
    }
    
    function addFav(event){
      var movie_id = event.target.attributes[0].value;
      //console.log(movie_id)
      $http.get(URL + 'movie/' + movie_id + API_KEY)
      .then(function(res){
        if (localStorageService.keys().includes(movie_id)){
          console.log("Can't. Already Fav");
        } else {
          console.log("New Fav");
          localStorageService.set(movie_id, res.data);
          fetchFavs();
          //vm.favs.push(localStorageService.get(movie_id));
        }
      }, function(err){ console.log("Error", err) });
      // To add to local storage
      //
      // Read that value back
      //var value = localStorageService.get('localStorageKey');
      //console.log(value);
      
    }
    
    function fetchFavs(){
      //localStorageService.clearAll();
      vm.favs = [];
      //localStorageService.remove('key');
     
      var array = localStorageService.keys();
      for (var i = 0; i < array.length; i++) {
        vm.favs.push(localStorageService.get(array[i]));
      }
      console.log(vm.favs);
    }
  
  
 }
    
    
})();