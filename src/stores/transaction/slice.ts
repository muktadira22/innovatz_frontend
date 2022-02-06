import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../../utils/request";

type ChartProps = {
  name: string;
  value: number;
};

type TransactionProps = {
  name: string;
  id: string;
  profit: string;
  count: string;
};

interface TransactionSlice {
  sumProfit: ChartProps[];
  countItem: ChartProps[];
  countDate: ChartProps[];
  transactions: TransactionProps[];
  status: string | null;
  error: string | undefined | null;
  loading: boolean;
}

const initialState: TransactionSlice = {
  sumProfit: [],
  countItem: [],
  countDate: [],
  transactions: [],
  status: "",
  error: null,
  loading: false,
};

export const sumProfitAsync = createAsyncThunk(
  "transaction/sum-profit",
  async (params: { item_id?: string }) => {
    const url = `transaction/sum-profit`;
    const response = await ApiService.get(url, {
      params: {
        item_id: params.item_id,
      },
    });
    return response;
  }
);

export const countItemAsync = createAsyncThunk(
  "transaction/count-sell-item",
  async ({ item_id }: { item_id?: string }) => {
    const url = `transaction/count-sell-item`;
    const response = await ApiService.get(url, {
      params: {
        item_id,
      },
    });
    return response;
  }
);

export const countDateAsync = createAsyncThunk(
  "transaction/count-sell-date",
  async ({ item_id }: { item_id?: string }) => {
    const url = `transaction/count-sell-date`;
    const response = await ApiService.get(url, {
      params: {
        item_id,
      },
    });
    return response;
  }
);

export const transactionAsync = createAsyncThunk(
  "transaction/profit-count",
  async ({ item_id }: { item_id?: string }) => {
    const url = `transaction/profit-count`;
    const response = await ApiService.get(url, {
      params: {
        item_id,
      },
    });
    return response;
  }
);

const transactionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sumProfitAsync.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(sumProfitAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sumProfit =
          typeof action.payload.data === "object"
            ? action.payload.data.results
            : [];
        state.loading = false;
      })
      .addCase(sumProfitAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(countItemAsync.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(countItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countItem =
          typeof action.payload.data === "object"
            ? action.payload.data.results
            : [];
        state.loading = false;
      })
      .addCase(countItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(countDateAsync.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(countDateAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countDate =
          typeof action.payload.data === "object"
            ? action.payload.data.results
            : [];
        state.loading = false;
      })
      .addCase(countDateAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })

      .addCase(transactionAsync.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(transactionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions =
          typeof action.payload.data === "object"
            ? action.payload.data.results
            : [];
        state.loading = false;
      })
      .addCase(transactionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// export const {} = transactionSlice.actions;

export default transactionSlice.reducer;
