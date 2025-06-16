import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  list:[], 
};

export const loadDistrictData = createAsyncThunk("districtlistdataslice/loadData", () => {
  let req = { type: "get_district_list", data: {} };  
  return socket.post(req);
});

 

const districtListSlice = createSlice({
  name: "districtlistdataslice",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.loading != "idle" || state.loading != "pending") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDistrictData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadDistrictData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.district_list||[];  
    });

    builder.addCase(loadDistrictData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = districtListSlice.actions;
export default districtListSlice.reducer;
