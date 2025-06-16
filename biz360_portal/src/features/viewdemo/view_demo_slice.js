import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  videoList:[],
  msg: ''
};


export const loadViewData = createAsyncThunk("viewdata/loadviewData", () => {
  let req = { type: "get_video_url_list", data: {} };  
  return socket.post(req);
});

 
const viewDemoSlice = createSlice({
  name: "viewdata",
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
    builder.addCase(loadViewData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadViewData.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.videoList = action.payload.data.video_url ||[]; 
    });
    builder.addCase(loadViewData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

   
  },
});

export default viewDemoSlice.reducer;
export const { initLoader } = viewDemoSlice.actions;