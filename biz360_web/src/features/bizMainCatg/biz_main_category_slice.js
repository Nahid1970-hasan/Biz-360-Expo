import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "",
  list: [],
  langlist:[]
};

export const loadBIZMainCatgData = createAsyncThunk("bizmaincatgslice/loadData", (data) => {
  let req = { type: "get_biz_main", data: data };
  return socket.post(req);
});

export const loadBIZMainAllCatgData = createAsyncThunk("bizmaincatgslice/loadAllData", () => {
  let req = { type: "get_biz_main_all", data: {} };
  return socket.post(req);
});


export const saveBIZMainData = createAsyncThunk("bizmaincatgslice/saveData", (data) => {
  let req = { type: "save_biz_main", data: data };
  return socket.post(req);
});


export const updateBIZMainData = createAsyncThunk("bizmaincatgslice/updateData", (data) => {
  let req = { type: "update_biz_main", data: data };
  return socket.post(req);
});

export const deleteBIZMainData = createAsyncThunk("bizmaincatgslice/deleteData", (data) => {
  let req = { type: "delete_biz_main", data: data };
  return socket.post(req);
});


const bizMainCategroySlice = createSlice({
  name: "bizmaincatgslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBIZMainCatgData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBIZMainCatgData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.biz_main || [];
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadBIZMainCatgData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadBIZMainAllCatgData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBIZMainAllCatgData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.biz_main || [];
      state.langlist = action.payload.data.language_list||[];
    });

    builder.addCase(loadBIZMainAllCatgData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveBIZMainData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveBIZMainData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(saveBIZMainData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateBIZMainData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateBIZMainData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updateBIZMainData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteBIZMainData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteBIZMainData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(deleteBIZMainData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = bizMainCategroySlice.actions;
export default bizMainCategroySlice.reducer;
