import React, { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/userReducer";
import { fetchMovies, searchMovies } from "../../../actions/film";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const { movies } = useSelector((state) => state.films);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (searchTimeout != false) {
      clearTimeout(searchTimeout);
    }
    if (e.target.value != "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchMovies(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(fetchMovies(movies));
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/" className="navbar__header">
          FILMOPOISK
        </NavLink>

        {isAuth && (
          <input
            value={searchQuery}
            onChange={(e) => handleSearch(e)}
            className="navbar__search"
            type="text"
            placeholder="Название файла..."
          />
        )}
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/">Войти</NavLink>
          </div>
        )}

        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Регистрация</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
