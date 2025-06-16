import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  preloading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  postloading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  userInfo: {},
  tabpos: 0,
  display_msg: ""
};

export const saveUserInfo = createAsyncThunk("pubregslice/savedata", (data) => {
  let req = { type: "save_pre_signup", data: data }; 
  return socket.post(req);
});

export const checkUserPreInfo = createAsyncThunk("pubregslice/checkpredata", (data) => {
  let req = { type: "check_pre_signup_info", data: data };
  return socket.post(req);
});

export const checkUserInfo = createAsyncThunk("pubregslice/checkuserdatacode", (data) => {
  let req = { type: "check_pre_signup_code", data: data };
  return socket.post(req);
});

const pubRegSlice = createSlice({
  name: "pubregslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.loading != "idle") {
        state.loading = "idle";
      }
    },
    initPreLoader: (state) => {
      if (state.preloading != "idle") {
        state.preloading = "idle";
      }
    },
    initPostLoader: (state) => {
      if (state.postloading != "idle") {
        state.postloading = "idle";
      }
    },
    updateUserInfo: (state, action) => {  
      state.userInfo = action.payload.info;  
      state.tabpos = action.payload.tabpos;  
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(saveUserInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(saveUserInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
      state.display_msg = action.payload.data.display_msg || "";
    });

    builder.addCase(saveUserInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(checkUserPreInfo.pending, (state) => {
      state.preloading = "pending";
    });

    builder.addCase(checkUserPreInfo.fulfilled, (state, action) => {
      state.preloading = "succeeded";
      state.msg = action.payload.data.msg;
      state.display_msg = action.payload.data?.display_msg || "";
    });

    builder.addCase(checkUserPreInfo.rejected, (state, action) => {
      state.preloading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(checkUserInfo.pending, (state, action) => {
      state.postloading = "pending";
    });

    builder.addCase(checkUserInfo.fulfilled, (state, action) => {
      state.postloading = "succeeded";
      state.msg = action.payload.data.msg;
      state.display_msg = action.payload.data?.display_msg || "";
    });

    builder.addCase(checkUserInfo.rejected, (state, action) => {
      state.postloading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader, initPreLoader,initPostLoader, updateUserInfo } = pubRegSlice.actions;
export default pubRegSlice.reducer;
