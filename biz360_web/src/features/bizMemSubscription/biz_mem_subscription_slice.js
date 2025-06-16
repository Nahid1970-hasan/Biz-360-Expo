import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", //"idle" 
  msg: "", 
  list:[],
  userData: {},
};

export const loadBizMemSubsData = createAsyncThunk("bizmemsubscription/loadData", () => {
  let req = { type: "get_member_sn_rates", data: {} };
  return socket.post(req);
});

export const saveBizMemSubsData = createAsyncThunk("bizmemsubscription/saveData", (data) => {
  let req = { type: "generate_member_invoice", data: data };
  return socket.post(req);
});

 
const bizSubscriptionSlice = createSlice({
  name: "bizmemsubscription",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadBizMemSubsData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBizMemSubsData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data?.sn_rates || []; 
    });

    builder.addCase(loadBizMemSubsData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveBizMemSubsData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveBizMemSubsData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.userData = action.payload.data?.dashboard ||{};
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(saveBizMemSubsData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export const { initLoader } = bizSubscriptionSlice.actions;
export default bizSubscriptionSlice.reducer;
