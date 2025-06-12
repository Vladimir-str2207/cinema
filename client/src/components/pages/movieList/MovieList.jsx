import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../movieCard/MovieCard";
import "./movieList.css";
import { fetchMovies } from "../../../actions/film";


const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.films);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movieList">
      <div className="movieList__list">
        {movies.length > 0 ? (
          
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p className="no-results">По вашему запросу ничего не найдено...</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
