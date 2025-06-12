import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userReducer';
import filmsSlice from './filmReducer';

export const store = configureStore({
  reducer: {
    user: userSlice,
    films: filmsSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});