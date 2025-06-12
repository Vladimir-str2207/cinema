// const SET_USER = "SET_USER"
// const LOGOUT = "LOGOUT"

// const defaultState = {
//     currentUser: {},
//     isAuth: false
// }

// export default function userReducer(state = defaultState, action) {
//     switch (action.type) {
//         case SET_USER:
//             return {
//                 ...state,
//                 currentUser: action.payload,
//                 isAuth: true
//             }
//         case LOGOUT:
//             localStorage.removeItem('token')
//             return {
//                 ...state,
//                 currentUser: {},
//                 isAuth: false
//             }
//         default:
//             return state
//     }
// }


// export const setUser = user => ({type: SET_USER, payload: user})
// export const logout = () => ({type: LOGOUT})

import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../actions/user';

const initialState = {
  currentUser: null,
  isAuth: false,
  isAdmin: false,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  
  
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuth = false;
      
      localStorage.removeItem('token');
    },
      loginSuccess: (state, action) => {
    state.currentUser = action.payload;
  },
      setAuthState: (state, action) => {
      state.isAuth = action.payload;
      if (!action.payload) {
        state.user = null;
        state.token = null;
      }
    }
  },
    extraReducers: (builder) => {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.isAuth = action.payload.isAuth;
        if (action.payload.isAuth) {
          state.user = action.payload.user;
          state.isAdmin = action.payload.isAdmin;
          state.token = action.payload.token;
        }
      })

  }
});

export const { setUser, logout,setAuthState } = userSlice.actions;
export default userSlice.reducer;