import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ loginId, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: loginId,
        password,
      });
      console.log('response is', response);
      const { token, user } = response.data;

      return {
        token,
        user,
        role: user.role,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
    
  }
);

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user, role } = action.payload;
        state.loading = false;
        state.token = token;
        state.user = user;
        state.role = role;
        state.isAuthenticated = true;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
