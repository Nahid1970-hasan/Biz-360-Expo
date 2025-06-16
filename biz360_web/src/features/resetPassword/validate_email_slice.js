import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",   
  msg: "",
};

export const getValidateEmail = createAsyncThunk(
  "validateemail/activateEmail",
  (data) => {
    let req = { type: "verify_email_address", data: data };
    return socket.post(req);
  }
); 

const validateEmailSlice = createSlice({
  name: "validateemail",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.loading != "idle") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getValidateEmail.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getValidateEmail.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(getValidateEmail.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default validateEmailSlice.reducer;
export const { initLoader } = validateEmailSlice.actions;
