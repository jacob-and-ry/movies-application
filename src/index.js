/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie} = require('./api.js');


function refreshMovies() {
    getMovies()
        .then((movies) => {
            $('#load').html('');
            let movieCard = "";
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                movieCard = "<div class=\"card\" style=\"width: 18rem;\">\n" +
                    "        <div class=\"card-header\">\n" +
                    "            " + title + "\n" +
                    "            <button type=\"button\" class=\"close\" aria-label=\"Close\">\n" +
                    "                <span aria-hidden=\"true\">&times;</span>\n" +
                    "            </button>\n" +
                    "        </div>\n" +
                    "        <ul class=\"list-group list-group-flush\">\n" +
                    "            <li class=\"list-group-item\">Rating: " + rating + " stars</li>\n" +
                    "            <li class=\"list-group-item\"> <button type=\"button\" class=\"btn btn-secondary d-flex m-auto edit\" id=\"edit-button\">Edit</button></li>\n" +
                    "        </ul>\n" +
                    "    </div>"

                $("#card-section").append(movieCard);
            });
            let currentTitle = movies.title;
            let currentRating = movies.rating
            $("#edit-button").click(function () {
                let editedTitle = prompt("What is the edited movie title?");
                let editedRating = prompt("What is its rating?");
                currentTitle = editedTitle;
                currentRating = editedRating;
                console.log(currentRating);
                console.log(currentTitle);
            });
        }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}

refreshMovies();

$("#add-button").click(function () {
    postMovie({
        "title": $("#movie-title-input").val(),
        "rating": $("#rating").val()
    })
});


