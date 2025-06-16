import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
};

export const loadEmailConfData = createAsyncThunk("emailconfigdata/loadData", () => {
  let req = { type: "get_email_config", data: {} };  
  return socket.post(req);
});

export const updateEmailConfig = createAsyncThunk(
  "emailconfigdata/updateConfig",
  (data) => {
    let req = { type: "update_email_config", data: data };
    return socket.post(req);
  }
);

export const saveEmailConfig = createAsyncThunk(
  "emailconfigdata/saveConfig",
  (data) => {
    let req = { type: "save_email_config", data: data };
    return socket.post(req);
  }
);

export const deleteEmailConfig = createAsyncThunk(
  "emailconfigdata/deleteConfig",
  (data) => {
    let req = { type: "delete_email_config", data: data };
    return socket.post(req);
  }
);

const emailconfigdata = createSlice({
  name: "emailconfigdata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.loading != "idle") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEmailConfData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEmailConfData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.email_config||[];  
    });

    builder.addCase(loadEmailConfData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = emailconfigdata.actions;
export default emailconfigdata.reducer;
