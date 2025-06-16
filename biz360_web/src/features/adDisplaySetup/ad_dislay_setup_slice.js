import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
  langlist:[]
};

export const loadAdDisplaySetup = createAsyncThunk("adDisplyData/loadData", () => {
  let req = { type: "get_ad_display", data: {} };  
  return socket.post(req);
});

export const saveAdDisplaySetup = createAsyncThunk("adDisplyData/saveData", (data) => {
  let req = { type: "save_ad_display", data: data};  
  return socket.post(req);
});
 

export const updateAdDisplaySetup = createAsyncThunk("adDisplyData/updateData", (data) => {
  let req = { type: "update_ad_display", data: data};  
  return socket.post(req);
});

export const deleteAdDisplaySetup = createAsyncThunk("adDisplyData/deleteData", (data) => {
  let req = { type: "delete_ad_display", data: data};  
  return socket.post(req);
});

const adDisplyDataSlice = createSlice({
  name: "adDisplyData",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdDisplaySetup.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdDisplaySetup.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.ad_display||[]; 
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadAdDisplaySetup.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveAdDisplaySetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdDisplaySetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveAdDisplaySetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateAdDisplaySetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdDisplaySetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateAdDisplaySetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdDisplaySetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdDisplaySetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(deleteAdDisplaySetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = adDisplyDataSlice.actions;
export default adDisplyDataSlice.reducer;
