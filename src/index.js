/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie} = require('./api.js');


function refreshMovies () {
  getMovies()
      .then((movies) => {
        $('#load').html('');
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
          console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
      }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
}

refreshMovies();

function addMovie () {
    postMovie().then((movies) => {
        $('#load').html('');
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {
            console.log(`id#${movies.length} - ${$("#movie-title-input").val()} - rating: ${$("#rating").val()}`);
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

$("#add-button").click(function () {
  addMovie();
  // refreshMovies();
});
