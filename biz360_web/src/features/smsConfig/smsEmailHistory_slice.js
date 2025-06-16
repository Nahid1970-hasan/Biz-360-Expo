import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  smsState:[],
  msg: ''
};

export const loadSmsEMailState = createAsyncThunk("smsConfig/SmsEmailHistory", () => { 
  let req = { type: "get_sms_email_hist", data: {} };
  return socket.post(req);
});

const smsEmailHistory_slice = createSlice({
  name: "SmsEmailHistory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadSmsEMailState.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSmsEMailState.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.smsState = action.payload.data; 
    });

    builder.addCase(loadSmsEMailState.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default smsEmailHistory_slice.reducer;
