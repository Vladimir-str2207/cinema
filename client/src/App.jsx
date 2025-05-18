import React, { useEffect } from "react";
import "./app.css";
import Navbar from "./components/ui/navbar/Navbar";
import Home from "./components/pages/Home/Home";
import MovieDetails from "./components/pages/movieDetails/MovieDetails";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../src/actions/user";
import MovieList from "./components/pages/movieList/MovieList";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <div className="wrap">
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/movie/:id"
            element={
              isAuth ? <MovieDetails /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/movie" element={<Navigate to="/" replace />} />

          <Route
            path="*"
            element={isAuth ? <MovieList /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
