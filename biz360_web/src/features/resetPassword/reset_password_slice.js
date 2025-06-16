import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",   
  msg: "",
  display_msg:"",
};

export const getResetPassword = createAsyncThunk(
  "resetpass/getResetPass",
  (data) => {
    let req = { type: "reset_password", data: data };
    return socket.post(req);
  }
); 

const resetPasswordSlice = createSlice({
  name: "resetpass",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.loading == "succeeded" ||
        state.loading == "failed"
      ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getResetPassword.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getResetPassword.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
      state.display_msg = action.payload.data.display_msg;
      
    });

    builder.addCase(getResetPassword.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default resetPasswordSlice.reducer;
export const { initLoader } = resetPasswordSlice.actions;
