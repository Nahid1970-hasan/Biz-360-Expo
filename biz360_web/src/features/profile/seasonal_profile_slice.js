import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  profile: {},
  langList:[],
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadSeasonalProfile = createAsyncThunk("seasonalprofile/loadProfile", () => {
  return socket.post({ type: "get_profile_seasonal", data: {} });
});

export const updateSeasonal = createAsyncThunk("seasonalprofile/updateSeasonal", (data) => {
  return socket.post({ type: "update_profile_seasonal_user", data: data });
});

export const updateSeasonalInfo = createAsyncThunk("seasonalprofile/updatecpInfo", (data) => {
  return socket.post({ type: "update_profile_seasonal_cp", data: data });
});

export const updateSeasonalSub = createAsyncThunk("seasonalprofile/updatebizsubs", (data) => {
  return socket.post({ type: "update_profile_seasonal", data: data });
});
export const domainSeasonalProfile = createAsyncThunk("seasonalprofile/domainProfile", (data) => {
  return socket.post({ type: "get_domain_seasonal", data: data });
});
export const saveDomainData = createAsyncThunk("seasonalprofile/saveDomain", (data) => {
  return socket.post({ type: "save_domain_seasonal", data: data });
});
export const userURLCheck = createAsyncThunk("seasonalprofile/userUrl", (data) => {
  return socket.post({ type: "check_user_url_seasonal", data: data });
});



const seasonalProfileSlice = createSlice({
  initialState,
  name: "seasonalprofile",
  reducers: {
    initLoader: (state) => {
      if (state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSeasonalProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadSeasonalProfile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.profile = action.payload.data?.users || {};
      state.langList = action.payload.data?.language_list ||[];
    });
    builder.addCase(loadSeasonalProfile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSeasonal.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateSeasonal.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateSeasonal.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSeasonalInfo.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateSeasonalInfo.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateSeasonalInfo.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });



    builder.addCase(updateSeasonalSub.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateSeasonalSub.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateSeasonalSub.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(domainSeasonalProfile.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(domainSeasonalProfile.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(domainSeasonalProfile.rejected, (state, action) => {
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

export default seasonalProfileSlice.reducer;
export const { initLoader } = seasonalProfileSlice.actions;
