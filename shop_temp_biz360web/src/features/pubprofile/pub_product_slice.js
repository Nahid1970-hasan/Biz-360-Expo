import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  prdtInfo: {},
  prdtList: '{}',
};

export const loadPubProductData = createAsyncThunk("pubproductdata/loadData", (data) => {
  let req = { type: "get_member_content_item", data: data };  
  return socket.post(req);
});

export const loadPubProductListData = createAsyncThunk("pubproductlistdata/loadData", (data) => {
  let req = { type: "get_member_page_content", data: data };  
  return socket.post(req);
});
 
const pubProductSlice = createSlice({
  name: "pubproductdata",
  initialState,
  reducers: { 
    initPdtLoader: (state) => {
      if ( state.loading != "idle" || state.loading != "pending") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPubProductData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubProductData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.prdtInfo = action.payload?.data||{};
      state.prdtList = '{}';    
    });

    builder.addCase(loadPubProductData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(loadPubProductListData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubProductListData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.prdtInfo = {};
      state.prdtList = action.payload?.data?.content||'{}';  
    });

    builder.addCase(loadPubProductListData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initPdtLoader } = pubProductSlice.actions;
export default pubProductSlice.reducer;
