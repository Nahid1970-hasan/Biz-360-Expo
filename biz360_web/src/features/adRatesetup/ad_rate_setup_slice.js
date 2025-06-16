import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  typeList:[], 
  rateList:[],
  conList:[],
  langlist:[]
};

export const loadADRateData = createAsyncThunk("adratedata/loadData", () => {
  let req = { type: "get_ad_rates", data: {} };  
  return socket.post(req);
});

export const saveADRateData = createAsyncThunk("adratedata/saveData", (data) => {
  let req = { type: "save_ad_rate", data: data};  
  return socket.post(req);
});
 

export const updateADRateData = createAsyncThunk("adratedata/updateData", (data) => {
  let req = { type: "update_ad_rate", data: data};  
  return socket.post(req);
});

export const deleteADRateData = createAsyncThunk("adratedata/deleteData", (data) => {
  let req = { type: "delete_ad_rate", data: data};  
  return socket.post(req);
});

const adRateDataSlice = createSlice({
  name: "adratedata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadADRateData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadADRateData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.rateList = action.payload.data.ad_rates||[];
      state.conList = action.payload.data.ad_content||[]; 
      state.typeList = action.payload.data.display_types||[];  
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadADRateData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveADRateData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveADRateData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveADRateData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateADRateData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateADRateData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateADRateData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(deleteADRateData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteADRateData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(deleteADRateData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = adRateDataSlice.actions;
export default adRateDataSlice.reducer;
