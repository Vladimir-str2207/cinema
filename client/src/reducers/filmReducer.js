import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, searchMovies } from "../actions/film";

const initialState = {
  movies: [],
  loading: false,
  error: null,
  searchStatus: "idle",
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
        state.searchPerformed = false;
        state.isEmptyResults = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.searchStatus = action.payload.hasResults ? "found" : "not_found";
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addCase } = filmsSlice.actions;
export default filmsSlice.reducer;
