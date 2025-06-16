import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "",
  qusList: [],
  langList: [],
};

export const loadBIZSecurityQusData = createAsyncThunk("bizsecurityqus/loadData", () => {
  let req = { type: "get_security_questions", data: {} };
  return socket.post(req);
});

export const saveSecurityQusData = createAsyncThunk("bizsecurityqus/saveData", (data) => {
  let req = { type: "save_security_questions", data: data };
  return socket.post(req);
});


export const updateSecurityQusData = createAsyncThunk("bizsecurityqus/updateData", (data) => {
  let req = { type: "update_security_questions", data: data };
  return socket.post(req);
});

export const deleteSecurityQusData = createAsyncThunk("bizsecurityqus/deleteData", (data) => {
  let req = { type: "delete_security_questions", data: data };
  return socket.post(req);
});

const bizSecurityQusSlice = createSlice({
  name: "bizsecurityqus",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBIZSecurityQusData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBIZSecurityQusData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.qusList = action.payload.data?.security_questions || [];
      state.langList = action.payload.data?.language_list || [];
    });

    builder.addCase(loadBIZSecurityQusData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSecurityQusData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveSecurityQusData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(saveSecurityQusData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSecurityQusData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSecurityQusData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updateSecurityQusData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSecurityQusData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSecurityQusData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(deleteSecurityQusData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = bizSecurityQusSlice.actions;
export default bizSecurityQusSlice.reducer;
