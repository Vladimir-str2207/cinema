
// import {applyMiddleware, combineReducers} from "redux";
// import { legacy_createStore as createStore } from "redux";
// import {composeWithDevTools } from '@redux-devtools/extension'
// import {thunk} from "redux-thunk";
// import userReducer from "./userReducer";
// import filmReducer from "./filmReducer";


// const rootReducer = combineReducers({
//     user: userReducer,
//     movies: filmReducer,
// })

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userReducer';
import filmsSlice from './filmReducer';
// import filmReducer from "./filmReducer";

export const store = configureStore({
  reducer: {
    user: userSlice,
    films: filmsSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});