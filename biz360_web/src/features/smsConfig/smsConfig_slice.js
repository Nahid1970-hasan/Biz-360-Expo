import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  msg: "",
};

export const loadSmsConfigData = createAsyncThunk(
  "smsconfigdatadata/loadConfig",
  () => {
    let req = { type: "get_sms_config", data: {} };
  
    return socket.post(req);
  }
);

export const updateSmsConfig = createAsyncThunk(
  "smsconfigdata/updateConfig",
  (data) => {
    let req = { type: "update_sms_config", data: data };
   
    return socket.post(req);
  }
);

export const savesmsconfigdata = createAsyncThunk(
  "smsconfigdata/saveConfig",
  (data) => {
    let req = { type: "save_sms_config", data: data };
   
    return socket.post(req);
  }
);

export const deletesmsconfigdata = createAsyncThunk(
  "smsconfigdata/deleteConfig",
  (data) => {
    let req = { type: "delete_sms_config", data: data };
    
    return socket.post(req);
  }
);

const smsconfigdataSlice = createSlice({
  name: "smsconfigdata",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.addUpdateLoading != "idle"
      ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSmsConfigData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSmsConfigData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.sms_config;
    });

    builder.addCase(loadSmsConfigData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSmsConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSmsConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateSmsConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(savesmsconfigdata.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(savesmsconfigdata.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(savesmsconfigdata.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deletesmsconfigdata.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deletesmsconfigdata.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deletesmsconfigdata.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default smsconfigdataSlice.reducer;
export const { initLoader } = smsconfigdataSlice.actions;
