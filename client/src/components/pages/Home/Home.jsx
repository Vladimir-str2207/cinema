import React, { useEffect } from "react";
import "./home.css";
import MovieList from "../movieList/MovieList";
import { fetchMovies } from "../../../actions/film";

const Home = () => {
  return (
    <section className={"home"}>
      <MovieList />
    </section>
  );
};

export default Home;
