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
                movieCard = `    <div class="card m-3 border-danger" style="width: 18rem;">
        <div class="card-header bg-danger text-center">
            ${title}
            <button type="button" class="close" aria-label="Close" data-id="${id}">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <ul class="list-group list-group-flush text-center">
            <li class="list-group-item">Rating: ${rating} stars</li>
            <li class="list-group-item"> 
            <button type="button" class="btn btn-danger edit-button" data-id="${id}" data-toggle="modal" data-target="#edit">Edit</button></li>
        </ul>
    </div>`;
                // <button type="submit" class="btn btn-danger d-flex m-auto edit" data-id="${id}" id="edit-button" >Edit</button>

                $("#card-section").append(movieCard);
            });
            $(".edit-button").click(function(){
              let movieId = $(this).attr('data-id');
              $("#save-changes").attr('data-id', movieId)
            });
            $('#save-changes').click(function () {
                $("#card-section").empty();
                movieCard = "";
                let editedTitle = $("#movie-title-edit").val();
                let editedRating = $("#rating-edit").val();
                // let dataID = $(".edit-button").attr('data-id');
                let saveId = $("#save-changes").attr('data-id');
console.log(saveId)
                let data = {
                    title: editedTitle,
                    rating: editedRating,
                };
                editMovie(data, saveId);
                refreshMovies();
            });
            $('.close').click(function () {
                let dataID = $(this).attr('data-id');
                let data = {
                    title: '',
                    rating: '',
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


