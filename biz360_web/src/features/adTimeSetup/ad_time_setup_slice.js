import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
  langlist:[]
};

export const loadTimeSetupData = createAsyncThunk("adtimedata/loadData", () => {
  let req = { type: "get_ad_time", data: {} };  
  return socket.post(req);
});

export const saveTimeSetup = createAsyncThunk("adtimedata/saveData", (data) => {
  let req = { type: "save_ad_time", data: data};  
  return socket.post(req);
});
 

export const updateTimeSetup = createAsyncThunk("adtimedata/updateData", (data) => {
  let req = { type: "update_ad_time", data: data};  
  return socket.post(req);
});

export const deleteTimeSetup = createAsyncThunk("adtimedata/deleteData", (data) => {
  let req = { type: "delete_ad_time", data: data};  
  return socket.post(req);
});

const adTimeDataSlice = createSlice({
  name: "adtimedata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTimeSetupData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadTimeSetupData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.ad_time||[]; 
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadTimeSetupData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveTimeSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveTimeSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveTimeSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateTimeSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateTimeSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateTimeSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(deleteTimeSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteTimeSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(deleteTimeSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = adTimeDataSlice.actions;
export default adTimeDataSlice.reducer;
