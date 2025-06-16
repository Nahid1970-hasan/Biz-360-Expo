import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  profile: {},
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadINDprofile = createAsyncThunk("invprofile/loadINDprofile", () => {
  return socket.post({ type: "get_profile_ind", data: {} });
});

export const updateInvUser = createAsyncThunk("invprofile/updateInvUser", (data) => {
  return socket.post({ type: "update_profile_ind_user", data: data });
});

export const updateINDCpInfo = createAsyncThunk("invprofile/updatecpInfo", (data) => {
  return socket.post({ type: "update_profile_ind_cp", data: data });
});

export const updateBizSubcribe = createAsyncThunk("invprofile/updatebizsubs", (data) => {
  return socket.post({ type: "update_profile_biz", data: data });
});
export const domaininvprofile = createAsyncThunk("invprofile/domaininvprofile", (data) => {
  return socket.post({ type: "get_domain_biz", data: data });
});
export const saveDomainData = createAsyncThunk("invprofile/saveDomain", (data) => {
  return socket.post({ type: "save_domain_biz", data: data });
});
export const userURLCheck = createAsyncThunk("invprofile/userUrl", (data) => {
  return socket.post({ type: "check_user_url_biz", data: data });
});

const invprofileSlice = createSlice({
  initialState,
  name: "invprofile",
  reducers: {
    initLoader: (state) => {
      if (state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadINDprofile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadINDprofile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.profile = action.payload.data?.users || {};
    });
    builder.addCase(loadINDprofile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateInvUser.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateInvUser.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvUser.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateINDCpInfo.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateINDCpInfo.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateINDCpInfo.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });



    builder.addCase(updateBizSubcribe.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateBizSubcribe.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateBizSubcribe.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(domaininvprofile.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(domaininvprofile.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(domaininvprofile.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveDomainData.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(saveDomainData.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveDomainData.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(userURLCheck.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(userURLCheck.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(userURLCheck.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default invprofileSlice.reducer;
export const { initLoader } = invprofileSlice.actions;
