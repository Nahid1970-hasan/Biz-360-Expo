import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "",
  snList: [],
  langList: [],
};

export const loadbizSubscriptionData = createAsyncThunk("bizsubscription/loadData", () => {
  let req = { type: "get_sn_rates", data: {} };
  return socket.post(req);
});

export const saveSubscriptionData = createAsyncThunk("bizsubscription/saveData", (data) => {
  let req = { type: "save_sn_rate", data: data };
  return socket.post(req);
});


export const updateSubscriptionData = createAsyncThunk("bizsubscription/updateData", (data) => {
  let req = { type: "update_sn_rate", data: data };
  return socket.post(req);
});

export const deleteSubscriptionData = createAsyncThunk("bizsubscription/deleteData", (data) => {
  let req = { type: "delete_sn_rate", data: data };
  return socket.post(req);
});

const bizSubscriptionSlice = createSlice({
  name: "bizsubscription",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadbizSubscriptionData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadbizSubscriptionData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.snList = action.payload.data?.sn_rates || [];
      state.langList = action.payload.data?.language_list || [];
    });

    builder.addCase(loadbizSubscriptionData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSubscriptionData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveSubscriptionData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(saveSubscriptionData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSubscriptionData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSubscriptionData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updateSubscriptionData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSubscriptionData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSubscriptionData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(deleteSubscriptionData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = bizSubscriptionSlice.actions;
export default bizSubscriptionSlice.reducer;
