$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();
    var search = $("#movieSearch").val();
    if (search == "") {
      $("#errorMsg").text("Please enter a search term!!!");
    } else {
      getMovies(search);
    }
  });
});

const getMovies = async (input) => {
  var result = "";
  try {
    apikey = "cad29a0c";
    const response = await fetch(
      `http://www.omdbapi.com/?s=${input}&apikey=${apikey}`
    );
    const data = await response.json();
    const dataArray = data.Search;
    if (dataArray && dataArray.length > 0) {
      dataArray.map((data) => {
        result += `<div class="col-md-3 g-3 custom-margin">
       <div class="text-center">
       <img src="${data.Poster}"/>
       <h5 class="text-white p-2 mx-auto">${data.Title}</h5>
      
    
       <a  onclick="movieSelected('${data.imdbID}')" class="btn btn-warning text-dark mb-4" href="#">Movie details</a>
       </div>
       
        </div>`;
      });
    } else {
      alert("No Movie Found!!");
    }
    $("#movieResults").html(result);
  } catch (error) {
    console.error(error);
  }
};

let movieSelected = async (id) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${apikey}`
    );
    const movie = await response.json();
    let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail" id="moviePoster">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group" id="movieDescri">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary" id="infoButton">View IMDB</a>
          <a href="index.html" class="btn btn-default" id="backButton">Go Back To Search</a>
        </div>
      </div>
    `;
    $("#searchConte").html(output);
    $("#searchConte").css({
      "background-color": "#262626",
      "margin-top": "25px",
      color: "white",
    });
    $("#movieResults").remove();
  } catch (error) {
    console.error(error);
  }
};
