import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
  langlist:[]
};

export const loadADViewData = createAsyncThunk("adviewdata/loadData", () => {
  let req = { type: "get_ad_list", data: {} };  
  return socket.post(req);
});

export const getViewAD = createAsyncThunk("adviewdata/getData", (data) => {
  let req = { type: "get_selected_ad", data: data};  
  return socket.post(req);
});
 

export const updateAdviewSetup = createAsyncThunk("adviewdata/updateData", (data) => {
  let req = { type: "update_ad_display", data: data};  
  return socket.post(req);
});



const adViewDataSlice = createSlice({
  name: "adviewdata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadADViewData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadADViewData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.ad_list||[]; 
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadADViewData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(getViewAD.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(getViewAD.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(getViewAD.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateAdviewSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdviewSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateAdviewSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = adViewDataSlice.actions;
export default adViewDataSlice.reducer;
