import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
  langlist:[]
};

export const loadAdContentSetup = createAsyncThunk("adContentdata/loadData", () => {
  let req = { type: "get_ad_content", data: {} };  
  return socket.post(req);
});

export const saveAdContentSetup = createAsyncThunk("adContentdata/saveData", (data) => {
  let req = { type: "save_ad_content", data: data};  
  return socket.post(req);
});
 

export const updateAdContentSetup = createAsyncThunk("adContentdata/updateData", (data) => {
  let req = { type: "update_ad_content", data: data};  
  return socket.post(req);
});

export const deleteAdContentSetup = createAsyncThunk("adContentdata/deleteData", (data) => {
  let req = { type: "delete_ad_content", data: data};  
  return socket.post(req);
});

const adContentdataSlice = createSlice({
  name: "adContentdata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdContentSetup.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdContentSetup.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.ad_content||[]; 
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadAdContentSetup.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveAdContentSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdContentSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveAdContentSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateAdContentSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdContentSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateAdContentSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdContentSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdContentSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(deleteAdContentSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = adContentdataSlice.actions;
export default adContentdataSlice.reducer;
