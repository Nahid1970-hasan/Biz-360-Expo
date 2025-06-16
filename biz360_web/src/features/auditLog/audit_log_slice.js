import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dataList:[],
  msg: ''
};


export const loadAuditLogData = createAsyncThunk("auditlogdata/loadAuditlog", (data) => {
  let req = { type: "get_audit_logs", data: data};
  return socket.post(req);
});
export const loadPubAuditLogData = createAsyncThunk("auditlogdata/loadPubAuditlog", (data) => {
  let req = { type: "get_audit_logs_public", data: data};
  return socket.post(req);
});
 
const auditLogSlice = createSlice({
  name: "auditlogdata",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadAuditLogData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAuditLogData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data.audit_log; 
    });

    builder.addCase(loadAuditLogData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadPubAuditLogData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubAuditLogData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data.audit_log; 
    });

    builder.addCase(loadPubAuditLogData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default auditLogSlice.reducer;
