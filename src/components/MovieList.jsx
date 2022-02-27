import { useEffect, useState } from "react";
import Movie from "./Movie";

const MovieList = () => {
  const [movies, setMovies] = useState([
    {
      DirectorName: "Bradley Cooper",
      MovieID: 1,
      MovieName: "A Start Is Born",
      MoviePosterLink: "https://s6.uupload.ir/files/a_star_is_born_rmbt.jpg",
    },
    {
      DirectorName: "John C. Donkin",
      MovieID: 2,
      MovieName: "Ice Age",
      MoviePosterLink: "https://s6.uupload.ir/files/ice_age_bz9w.jpg",
    },
    {
      DirectorName: "John Musker",
      MovieID: 3,
      MovieName: "Moana",
      MoviePosterLink: "https://s6.uupload.ir/files/moana_510b.jpg",
    },
    {
      DirectorName: "Josh Cooley",
      MovieID: 4,
      MovieName: "Toy Story",
      MoviePosterLink: "https://s6.uupload.ir/files/toy_story_1zrv.jpg",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false)
  const axios = require("axios");

    // useEffect(() => {
    //   async function getMovies() {
    //     if (isLoading === true) {
    //       let response = await axios.get("https://shakibaam.pythonanywhere.com");
    //       let movies = response.data;
    //       setMovies(movies);
    //       setIsLoading(false);
    //       console.log(movies);
    //     }
    //   }

    //   getMovies();
    // });

  return (
    <div>
      {isLoading && <img src={require("./loading.gif")} alt="nothing" />}

      {!isLoading && (
        <div>
          {movies.map((movie) => (
            <Movie
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
