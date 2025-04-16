import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchBasicsChapter = createAsyncThunk(
  "basic/fetchChapters",
  async (_, thunkAPI) => {
    try {
      const docRef = doc(db, "basicsOfEnglish", "chapters");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return Object.values(data);
      } else {
        return thunkAPI.rejectWithValue("No such document found!");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const basicSlice = createSlice({
  name: "basics",
  initialState: {
    chapters: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasicsChapter.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchBasicsChapter.fulfilled, (state, action) => {
        state.loading = true;
        state.chapters = action.payload;
      })
      .addCase(fetchBasicsChapter.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default basicSlice.reducer;
