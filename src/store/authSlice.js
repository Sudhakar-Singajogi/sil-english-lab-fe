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
      console.log("response is", response);
      const {
        user,
        schoolInfo,
        licenseTierInfo,
        lacInfo,
        allMenuItems,
        allTeachers,
      } = response.data;

      return {
        token:response.data.accessToken,
        user,
        role: user.role,
        schoolInfo,
        licenseTierInfo,
        lacInfo,
        allMenuItems,
        allTeachers,
        refreshToken:response.data.refreshToken
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
  schoolInfo: null,
  licenseTierInfo: null,
  lacInfo: null,
  allMenuItems: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  allSchools: null,
  allTeachers: [],
  refreshToken:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logout called');
      state.user = null;
      state.token = null;
      state.role = null;
      state.schoolInfo = null;
      state.licenseTierInfo = null;
      state.lacInfo = null;
      state.allMenuItems=null;
      state.isAuthenticated = false;
      state.allSchools = null;
      state.allTeachers=[]; 
      state.refreshToken = null
    },
    setAllSchools: (state, action) => {
      state.allSchools = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const {
          token,
          user,
          role,
          schoolInfo,
          licenseTierInfo,
          lacInfo,
          allMenuItems,
          allTeachers,
          refreshToken
        } = action.payload;
        state.loading = false;
        state.token = token;
        state.refreshToken = refreshToken;
        state.user = user;
        state.role = role;
        state.schoolInfo = schoolInfo;
        state.licenseTierInfo = licenseTierInfo;
        state.lacInfo = lacInfo;
        (state.allMenuItems = allMenuItems),
          (state.allTeachers = allTeachers),
          (state.isAuthenticated = true);

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAllSchools } = authSlice.actions;
export default authSlice.reducer;
