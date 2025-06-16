import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  payMethod:[],
  msg: "",
};

export const loadInvPaymentConfig = createAsyncThunk(
  "invpayment/loadConfig",
  () => {
    let req = { type: "get_member_payment", data: {} }; 
    return socket.post(req);
  }
);

export const loadInvPaymentRefData= createAsyncThunk(
  "invpayment/loadRefData",
  () => {
    let req = { type: "get_bank_ref_data", data: {} }; 
    return socket.post(req);
  }
);

export const updateInvPayment = createAsyncThunk(
  "invpayment/updateConfig",
  (data) => {
    let req = { type: "update_member_payment", data: data }; 
    return socket.post(req);
  }
);

export const saveInvPayment = createAsyncThunk(
  "invpayment/saveConfig",
  (data) => {
    let req = { type: "save_member_payment", data: data }; 
    return socket.post(req);
  }
);

export const deleteInvPayment = createAsyncThunk(
  "invpayment/deleteConfig",
  (data) => {
    let req = { type: "delete_member_payment", data: data }; 
    return socket.post(req);
  }
);
 
const invpaymentSlice = createSlice({
  name: "invpayment",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvPaymentConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvPaymentConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.payments || [];
      state.payMethod = action.payload.data.payment_method ||[];
    });

    builder.addCase(loadInvPaymentConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadInvPaymentRefData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvPaymentRefData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.companyBanks = action.payload.data.com_banks;
      state.ownBanks = action.payload.data.own_banks;
      
    });

    builder.addCase(loadInvPaymentRefData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateInvPayment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInvPayment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvPayment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveInvPayment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInvPayment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveInvPayment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteInvPayment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteInvPayment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteInvPayment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    
  },
});

export default invpaymentSlice.reducer;
export const { initLoader } = invpaymentSlice.actions;
