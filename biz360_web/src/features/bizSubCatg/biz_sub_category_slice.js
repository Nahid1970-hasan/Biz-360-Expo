import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "",
  list: [],
};

export const loadBIZSubCatgData = createAsyncThunk("bizsubcatgslice/loadData", (data) => {
  let req = { type: "get_biz_sub", data: data };
  return socket.post(req);
});

export const saveBIZSubData = createAsyncThunk("bizmaincatgslice/saveData", (data) => {
  let req = { type: "save_biz_sub", data: data };
  return socket.post(req);
});


export const updateBIZSubData = createAsyncThunk("bizmaincatgslice/updateData", (data) => {
  let req = { type: "update_biz_sub", data: data };
  return socket.post(req);
});

export const deleteBIZSubData = createAsyncThunk("bizmaincatgslice/deleteData", (data) => {
  let req = { type: "delete_biz_sub", data: data };
  return socket.post(req);
});

const bizSubCategroySlice = createSlice({
  name: "bizsubcatgslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBIZSubCatgData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBIZSubCatgData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data?.biz_sub || [];
    });

    builder.addCase(loadBIZSubCatgData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveBIZSubData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveBIZSubData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(saveBIZSubData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateBIZSubData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateBIZSubData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updateBIZSubData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteBIZSubData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteBIZSubData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(deleteBIZSubData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = bizSubCategroySlice.actions;
export default bizSubCategroySlice.reducer;
