import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../utils/request";

type ItemProps = {
  id: number;
  name: string;
};

interface TransactionSlice {
  list: ItemProps[];
  status: string | null;
  error: string | undefined | null;
  loading: boolean;
}

const initialState: TransactionSlice = {
  list: [],
  status: "",
  error: null,
  loading: false,
};

export const fetchItemAsync = createAsyncThunk("item/fetch", async () => {
  const url = `item`;
  const response = await ApiService.get(url);
  return response;
});

const itemSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchItemAsync.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list =
          typeof action.payload.data === "object"
            ? action.payload.data.results
            : [];
        state.loading = false;
      })
      .addCase(fetchItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// export const {} = itemSlice.actions;

export default itemSlice.reducer;
