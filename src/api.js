module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  postMovie: (movieData) => {
    return fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch((error) => {
          console.error('Error:', error);
        });
  },

  editMovie: (movieData, id) => {

    return fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch((error) => {
          console.error('Error:', error);
        });
  },

  deleteMovie: (movieData, id) => {
    return fetch(`/api/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch((error) => {
          console.error('Error:', error);
        });
  }
};
