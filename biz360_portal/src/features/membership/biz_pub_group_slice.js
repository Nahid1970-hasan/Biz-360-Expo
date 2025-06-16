import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  indvGroupData:[],
  orgGroupData:[]
};

export const loadPubBizGroupData = createAsyncThunk("bizgroupslice/loadData", () => {
  let req = { type: "get_biz_group_public", data: {} };  
  return socket.post(req);
});

 

const bizGroupSlice = createSlice({
  name: "bizgroupslice",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.loading != "idle" || state.loading != "pending") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPubBizGroupData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubBizGroupData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.indvGroupData = action.payload.data.ind_group||[]; 
      state.orgGroupData = action.payload.data.biz_group||[]; 
    });

    builder.addCase(loadPubBizGroupData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = bizGroupSlice.actions;
export default bizGroupSlice.reducer;
