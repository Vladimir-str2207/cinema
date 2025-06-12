import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "films/fetchMovies",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/movie/films`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "films/searchMovies",
  async (query, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/movie/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovie = (title, year, duration,genre,director,reviews,poster_path,video_path,description) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/movie`,
      { title, year, duration,genre,director,reviews,poster_path,video_path,description},
      {headers: { Authorization: `Bearer ${token}` }}
    );
    alert( "Фильм успещно добавлен");
  } catch (e) {
    alert(e.response.data.message);
  }
};