import React from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie_card">
      <img
        className="movie_card__img"
        src={movie.poster_path}
        alt={movie.title}
      />
    </Link>
  );
};

export default MovieCard;
