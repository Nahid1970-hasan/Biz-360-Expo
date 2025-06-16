import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  compInfo:{},
  langlist:[]
};

export const loadCompanyInfoData = createAsyncThunk("bizcompanyinfo/loadData", () => {
  let req = { type: "get_company_info", data: {} };  
  return socket.post(req);
});

export const saveCompanyInfoData = createAsyncThunk("bizcompanyinfo/saveData", (data) => {
  let req = { type: "save_company_info", data: data};  
  return socket.post(req);
});

const bizcompanyinfoSlice = createSlice({
  name: "bizcompanyinfo",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCompanyInfoData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadCompanyInfoData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.compInfo = action.payload.data;  
    });

    builder.addCase(loadCompanyInfoData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveCompanyInfoData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveCompanyInfoData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveCompanyInfoData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

  },
});

export const { initLoader } = bizcompanyinfoSlice.actions;
export default bizcompanyinfoSlice.reducer;
