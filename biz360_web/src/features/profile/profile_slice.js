import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  profile: {},
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadBizprofile = createAsyncThunk("bizprofile/loadbizprofile", () => {
  return socket.post({ type: "get_profile_biz", data: {} });
});

export const updateBizUser = createAsyncThunk("bizprofile/updatebizuser", (data) => {
  return socket.post({ type: "update_profile_biz_user", data: data });
});
export const updateBizBussiness = createAsyncThunk("bizprofile/updatebizbussiness", (data) => {
  return socket.post({ type: "update_profile_biz_business", data: data });
});
export const updateBizCp1 = createAsyncThunk("bizprofile/updatebizcp1", (data) => {
  return socket.post({ type: "update_profile_biz_cp1", data: data });
});
export const updateBizCp2 = createAsyncThunk("bizprofile/updatebizcp2", (data) => {
  return socket.post({ type: "update_profile_biz_cp2", data: data });
});
export const updateBizSubcribe = createAsyncThunk("bizprofile/updatebizsubs", (data) => {
  return socket.post({ type: "update_profile_biz", data: data });
});
export const domainbizprofile = createAsyncThunk("bizprofile/domainbizprofile", (data) => {
  return socket.post({ type: "get_domain_biz", data: data });
});
export const saveDomainData = createAsyncThunk("bizprofile/saveDomain", (data) => {
  return socket.post({ type: "save_domain_biz", data: data });
});
export const userURLCheck = createAsyncThunk("bizprofile/userUrl", (data) => {
  return socket.post({ type: "check_user_url_biz", data: data });
});

const bizprofileSlice = createSlice({
  initialState,
  name: "bizprofile",
  reducers: {
    initLoader: (state) => {
      if (state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBizprofile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadBizprofile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.profile = action.payload.data?.profile || {};
    });
    builder.addCase(loadBizprofile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateBizUser.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateBizUser.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateBizUser.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(updateBizBussiness.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateBizBussiness.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateBizBussiness.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(updateBizCp1.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateBizCp1.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateBizCp1.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateBizCp2.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateBizCp2.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateBizCp2.rejected, (state, action) => {
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

    builder.addCase(domainbizprofile.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(domainbizprofile.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(domainbizprofile.rejected, (state, action) => {
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

export default bizprofileSlice.reducer;
export const { initLoader } = bizprofileSlice.actions;
