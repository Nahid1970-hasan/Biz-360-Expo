import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",
  addUpdateLoading: "idle",
  reLoading: "idle",
  list: [],
  cList: [],
  rList: [],
  msg: "",

};

export const loadMemberOrderData = createAsyncThunk(
  "tempmemberorderslice/loadData",
  (data) => {
    let req = { type: "get_member_orders", data: data };
    return socket.post(req);
  }
);

export const updateOrderData = createAsyncThunk("tempmemberorderslice/updateData", (data) => {
  let req = { type: "update_member_orders", data: data };
  return socket.post(req);
});
export const refreshOrderData = createAsyncThunk("tempmemberorderslice/refreshData", () => {
  let req = { type: "get_member_order_summary", data: {} };
  return socket.post(req);
});

const tempMemberOrderSlice = createSlice({
  name: "tempmemberorderslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
    initReLoader: (state) => {
      if (state.reLoading != "idle") {
        state.reLoading = "idle";
      }
    },

  },

  extraReducers: (builder) => {
    builder.addCase(loadMemberOrderData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadMemberOrderData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.member_orders || [];
      state.cList = action.payload.data.courier_list || [];
    });

    builder.addCase(loadMemberOrderData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateOrderData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateOrderData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg || "";
    });

    builder.addCase(updateOrderData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(refreshOrderData.pending, (state) => {
      state.reLoading = "pending";

    });

    builder.addCase(refreshOrderData.fulfilled, (state, action) => {
      state.reLoading = "succeeded";
      state.rList = action.payload.data.member_order || [];
    });

    builder.addCase(refreshOrderData.rejected, (state, action) => {
      state.reLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default tempMemberOrderSlice.reducer;
export const { initLoader, initReLoader } = tempMemberOrderSlice.actions;
