import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",
  addUpdateLoading: "idle", 
  list: [], 
  msg: "",

};

export const loadMemberReportData = createAsyncThunk(
  "tempmemberreportslice/loadData",
  (data) => {
    let req = { type: "get_member_order_report", data: data };
    return socket.post(req);
  }
);
 

const tempMemberReportsSlice = createSlice({
  name: "tempmemberreportslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    }, 

  },

  extraReducers: (builder) => {
    builder.addCase(loadMemberReportData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadMemberReportData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.member_orders || []; 
    });

    builder.addCase(loadMemberReportData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default tempMemberReportsSlice.reducer;
export const { initLoader } = tempMemberReportsSlice.actions;
