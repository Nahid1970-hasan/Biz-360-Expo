import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  msg: "", 
  list:[], 
  langlist:[]
};

export const loadBIZGroupData = createAsyncThunk("bizgroupslice/loadData", () => {
  let req = { type: "get_biz_group", data: {} };  
  return socket.post(req);
});

export const saveBIZGroupData = createAsyncThunk("bizgroupslice/saveData", (data) => {
  let req = { type: "save_biz_group", data: data};  
  return socket.post(req);
});
 

export const updateBIZGroupData = createAsyncThunk("bizgroupslice/updateData", (data) => {
  let req = { type: "update_biz_group", data: data};  
  return socket.post(req);
});

export const deleteBIZGroupData = createAsyncThunk("bizgroupslice/deleteData", (data) => {
  let req = { type: "delete_biz_group", data: data};  
  return socket.post(req);
});
export const uploadImage = createAsyncThunk("bizgroupslice/deleteData", (data) => {
  let req = { type: "upload_photo_file", data: data};  
  return socket.post(req);
});

const bizGroupSlice = createSlice({
  name: "bizgroupslice",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBIZGroupData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBIZGroupData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.biz_group||[]; 
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadBIZGroupData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveBIZGroupData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveBIZGroupData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveBIZGroupData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateBIZGroupData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateBIZGroupData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(updateBIZGroupData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(deleteBIZGroupData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteBIZGroupData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(deleteBIZGroupData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = bizGroupSlice.actions;
export default bizGroupSlice.reducer;
