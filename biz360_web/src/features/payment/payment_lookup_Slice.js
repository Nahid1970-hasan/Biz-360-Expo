import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "",
  payList: [],
  payMethod: []
};

export const loadPaymentLookupInit = createAsyncThunk("paymentLookupinit/loadData", () => {
  let req = { type: "get_payment_info_init", data: {} };
  return socket.post(req);
});

export const loadPaymentLookup = createAsyncThunk("paymentLookup/loadData", (data) => {
  let req = { type: "get_payment_info", data: data };
  return socket.post(req);
});
export const updatePaymentLookup = createAsyncThunk("paymentLookup/updateData", (data) => {
  let req = { type: "update_payment_info", data: data };
  return socket.post(req);
});
  
const paymentLookupSlice = createSlice({
  name: "paymentLookup",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
     builder.addCase(loadPaymentLookupInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPaymentLookupInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.payList = action.payload.data?.payments || [];
      state.payMethod = action.payload.data?.payment_method ||[];
    });

    builder.addCase(loadPaymentLookupInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadPaymentLookup.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPaymentLookup.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.payList = action.payload.data?.payments || [];
    });

    builder.addCase(loadPaymentLookup.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(updatePaymentLookup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updatePaymentLookup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updatePaymentLookup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = paymentLookupSlice.actions;
export default paymentLookupSlice.reducer;
