import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import { checkSessionExpired, fetchUsersAPI } from "../service/apiService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params, thunkAPI) => {

    try {
      return await fetchUsersAPI(params);
    } catch (error) {
        console.log('Session response is', error.response.data);
        if(error.response.data.message === 'Unauthorized or invalid token'){
            checkSessionExpired();            
        }
  
      const message =
        error.response?.data?.message ||
        "Failed to fetch users. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  resultTotal: 0,
  totalRows: 0,
  hasMore: false,
};

const userManagementSlice = createSlice({
  name: "usermanagement",
  initialState,
  reducers: {
    clearUsersList: (state) => {
      state.resultTotal = 0;
      state.totalRows = 0;
      state.hasMore = 0;
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resultTotal = 0;
        state.totalRows = 0;
        state.hasMore = 0;
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const data = action.payload.data;
        console.log("payload is", action.payload);
        console.log("data is", data);
        const { users, resultTotal, totalRows, hasMore } = action.payload;
        state.loading = false;
        state.users = users;
        state.resultTotal = resultTotal;
        state.totalRows = totalRows;
        state.hasMore = hasMore;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(logout, (state) => {
      // Triggered when auth/logout is dispatched
      state.users = [];
      state.resultTotal = 0;
      state.totalRows = 0;
      state.hasMore = false;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { clearUsersList } = userManagementSlice.actions;
export default userManagementSlice.reducer;
