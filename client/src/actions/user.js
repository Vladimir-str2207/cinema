import axios from "axios";
import { setUser, logout } from "../reducers/userReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registration = (email, username, password) => async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/registration`,
      { email, username, password }
    );
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    dispatch(setUser(response.data.user));
    localStorage.setItem("token", response.data.token);
  } catch (e) {
    alert(e.response?.data?.message || "Ошибка авторизации");
  }
};

export const auth = createAsyncThunk("user/auth", async (_, { dispatch }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return { isAuth: false };
    }

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    return {
      isAuth: true,
      user: response.data.user,
      isAdmin:response.data.roles[0] === 'admin',
      token,
    };
  } catch (error) {
    localStorage.removeItem("token");
    return { isAuth: false };
  }
});

export const admin = createAsyncThunk(
  "user/admin",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(response.data.roles["admin"]){
        
        return {isAdmin:true};
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
