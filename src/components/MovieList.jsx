import { useEffect, useState } from "react";
import Movie from "./Movie";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axios = require("axios");

  useEffect(() => {
    async function getMovies() {
      if (isLoading === true) {
        let response = await axios.get("https://shakibaam.pythonanywhere.com");

        setMovies(response.data["Movies"]);
        setIsLoading(false);
        console.log(movies);
      }
    }

    getMovies();
  });

  return (
    <div>
      {isLoading && <img src={require("./loading.gif")} alt="nothing" />}

      {!isLoading && (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.MovieID}
              id={movie.MovieID}
              name={movie.MovieName}
              director={movie.DirectorName}
              photoLink={movie.MoviePosterLink}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
