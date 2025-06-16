import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  profile: {},
  langList:[],
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadAdminProfile = createAsyncThunk("admprofile/loadProfile", () => {
  return socket.post({ type: "get_users_profile_com", data: {} });
});

export const saveAdminUser = createAsyncThunk("admprofile/saveuser", (data) => {
  return socket.post({ type: "save_users_com", data: data });
});
export const updateAdminUser = createAsyncThunk("admprofile/updateuser", (data) => {
    return socket.post({ type: "update_users_com", data: data });
  });

  export const deleteAdminUser = createAsyncThunk("admprofile/deleteuser", (data) => {
    return socket.post({ type: "delete_users_com", data: data });
  });

const admProfileSlice = createSlice({
  initialState,
  name: "admprofile",
  reducers: {
    initLoader: (state) => {
      if (state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdminProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadAdminProfile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.profile = action.payload.data?.users || {};
      state.langList = action.payload.data?.language_list ||[];
    });
    builder.addCase(loadAdminProfile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveAdminUser.pending, (state, action) => {
        state.updateLoading = "pending";
      });
  
      builder.addCase(saveAdminUser.fulfilled, (state, action) => {
        state.updateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(saveAdminUser.rejected, (state, action) => {
        state.updateLoading = action.error.name;
        state.msg = action.error.message;
      });

    builder.addCase(updateAdminUser.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateAdminUser.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateAdminUser.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdminUser.pending, (state, action) => {
        state.updateLoading = "pending";
      });
  
      builder.addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.updateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(deleteAdminUser.rejected, (state, action) => {
        state.updateLoading = action.error.name;
        state.msg = action.error.message;
      });
    
  },
});

export default admProfileSlice.reducer;
export const { initLoader } = admProfileSlice.actions;
