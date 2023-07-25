$(document).ready(function() {
    const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your OMDb API key
  
    $('#searchForm').submit(function(event) {
      event.preventDefault();
      const query = $('#searchInput').val();
      fetchMovies(query);
    });
  
    function fetchMovies(query) {
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  
      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          displayMovies(data.Search);
        },
        error: function(error) {
          console.error('Error fetching movie data:', error);
        }
      });
    }
  
    function displayMovies(movies) {
      $('#movieResults').empty();
      if (movies && movies.length > 0) {
        movies.slice(0, 8).forEach(function(movie) {
          const movieResult = `
            <div class="movie-result">
              <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
              <h2 class="movie-title">${movie.Title}</h2>
              <p class="movie-year">Release Year: ${movie.Year}</p>
              <p class="movie-rating">IMDb Rating: ${movie.imdbRating}</p>
            </div>
          `;
          $('#movieResults').append(movieResult);
        });
      } else {
        $('#movieResults').html('<p>No movies found.</p>');
      }
    }
  });
  