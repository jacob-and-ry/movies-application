/**
 * es6 modules and imports
 */
import sayHello from './hello';

sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie, editMovie, deleteMovie} = require('./api.js');


function refreshMovies() {
    $("#card-section").empty();
    $("#add-button").attr("disabled", true);
    getMovies()
        .then((movies) => {
            $("#add-button").attr("disabled", false);
            $('#load').html('');
            let movieCard = "";
            console.log('Here are all the movies:');
            movies.forEach(({title, rating, id}) => {
                console.log(`id#${id} - ${title} - rating: ${rating}`);
                movieCard =  `    <div class="card m-3 border-danger" style="width: 18rem;">
        <div class="card-header bg-danger text-center">
            ${title}
            <button type="button" class="close" aria-label="Close" data-id="${id}">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <ul class="list-group list-group-flush text-center">
            <li class="list-group-item">Rating: ${rating} stars</li>
            <li class="list-group-item"> <button type="submit" class="btn btn-danger d-flex m-auto edit" data-id="${id}" id="edit-button" >Edit</button></li>
        </ul>
    </div>`;


                $("#card-section").append(movieCard);
            });
            $('.edit').click(function () {
                movieCard = "";
                let editedTitle = prompt("What is the edited movie title?");
                let editedRating = prompt("What is its rating?");
                let dataID = $(this).attr('data-id');
                let data = {
                    title: editedTitle,
                    rating: editedRating,
                };
                editMovie(data, dataID);
                refreshMovies();
            });
            $('.close').click(function () {
                let dataID = $(this).attr('data-id');
                let data = {
                    title:'',
                    rating:'',
                };
                deleteMovie(data, dataID);
                refreshMovies();
            })
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
    });
    refreshMovies();
});


