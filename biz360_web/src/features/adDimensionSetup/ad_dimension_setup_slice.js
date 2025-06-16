import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
  langlist:[]
};

export const loadAdDimension = createAsyncThunk("adDimensiondata/loadData", () => {
  let req = { type: "get_ad_dimension", data: {} };  
  return socket.post(req);
});

export const saveAdDimension = createAsyncThunk("adDimensiondata/saveData", (data) => {
  let req = { type: "save_ad_dimension", data: data};  
  return socket.post(req);
});
 

export const updateAdDimension = createAsyncThunk("adDimensiondata/updateData", (data) => {
  let req = { type: "update_ad_dimension", data: data};  
  return socket.post(req);
});

export const deleteAdDimension = createAsyncThunk("adDimensiondata/deleteData", (data) => {
  let req = { type: "delete_ad_dimension", data: data};  
  return socket.post(req);
});

const adDimensiondataSlice = createSlice({
  name: "adDimensiondata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdDimension.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdDimension.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.ad_dimension||[]; 
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadAdDimension.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveAdDimension.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdDimension.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveAdDimension.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateAdDimension.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdDimension.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateAdDimension.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdDimension.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdDimension.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(deleteAdDimension.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = adDimensiondataSlice.actions;
export default adDimensiondataSlice.reducer;
