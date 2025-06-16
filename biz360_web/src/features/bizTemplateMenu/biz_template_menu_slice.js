import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "",
  groupList: [],
  menuList: [],
  langList: [],
};

export const loadBIZTempMenuData = createAsyncThunk("biztempmenuslice/loadData", () => {
  let req = { type: "get_template_menu", data: {} };
  return socket.post(req);
});

export const saveBIZTempMenuData = createAsyncThunk("biztempmenuslice/saveData", (data) => {
  let req = { type: "save_template_menu", data: data };
  return socket.post(req);
});


export const updateBIZTempMenuData = createAsyncThunk("biztempmenuslice/updateData", (data) => {
  let req = { type: "update_template_menu", data: data };
  return socket.post(req);
});

export const deleteBIZTempMenuData = createAsyncThunk("biztempmenuslice/deleteData", (data) => {
  let req = { type: "delete_template_menu", data: data };
  return socket.post(req);
});

const bizTempMenuSlice = createSlice({
  name: "biztempmenuslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBIZTempMenuData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBIZTempMenuData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.groupList = action.payload.data?.biz_sub || [];
      state.menuList = action.payload.data?.menu_list || [];
      state.langList = action.payload.data?.language_list || [];
    });

    builder.addCase(loadBIZTempMenuData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveBIZTempMenuData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveBIZTempMenuData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(saveBIZTempMenuData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateBIZTempMenuData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateBIZTempMenuData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updateBIZTempMenuData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteBIZTempMenuData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteBIZTempMenuData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(deleteBIZTempMenuData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = bizTempMenuSlice.actions;
export default bizTempMenuSlice.reducer;
