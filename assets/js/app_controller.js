(function() {
  'use strict';
  
  angular
  .module('movies-app')
  .controller('app-controller', ctrl1);

  function ctrl1(){
    /* jshint validthis: true */
    var vm = this;

    vm.calc = calc;
    vm.years = [2010, 2011, 2012, 2013, 2014, 2015];
    vm.genres = ['Acción', 'Aventura', 'Animación', 'Comedia', 'Documentales'];
    vm.movies = [
      {
        imgUrl: "https://s3.amazonaws.com/palapadata/peliculas/lego-ninjago-la-pelicula.jpg",
        title: "DC's Legends of tomorrow.",
        rating: 7.5,
        duration: "2h 16 min",
        date: "5 May 2017 (USA)",
        genre: "Acción y Aventura",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quibusdam dolore iste quaerat est rerum nihil sit cupiditate fugit tenetur sequi unde, facilis obcaecati necessitatibus corporis accusamus a beatae quasi."
      },
      {
        imgUrl: "https://s3.amazonaws.com/palapadata/peliculas/lego-ninjago-la-pelicula.jpg",
        title: "DC's Legends of tomorrow.",
        rating: 7.5,
        duration: "2h 16 min",
        date: "5 May 2017 (USA)",
        genre: "Acción y Aventura",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quibusdam dolore iste quaerat est rerum nihil sit cupiditate fugit tenetur sequi unde, facilis obcaecati necessitatibus corporis accusamus a beatae quasi."
      },
      {
        imgUrl: "https://s3.amazonaws.com/palapadata/peliculas/lego-ninjago-la-pelicula.jpg",
        title: "DC's Legends of tomorrow.",
        rating: 7.5,
        duration: "2h 16 min",
        date: "5 May 2017 (USA)",
        genre: "Acción y Aventura",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quibusdam dolore iste quaerat est rerum nihil sit cupiditate fugit tenetur sequi unde, facilis obcaecati necessitatibus corporis accusamus a beatae quasi."
      },
      {
        imgUrl: "https://s3.amazonaws.com/palapadata/peliculas/lego-ninjago-la-pelicula.jpg",
        title: "DC's Legends of tomorrow.",
        rating: 7.5,
        duration: "2h 16 min",
        date: "5 May 2017 (USA)",
        genre: "Acción y Aventura",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quibusdam dolore iste quaerat est rerum nihil sit cupiditate fugit tenetur sequi unde, facilis obcaecati necessitatibus corporis accusamus a beatae quasi."
      },
    ]

    function calc(){
     vm.result = vm.first + vm.second;
    }

}
})();