import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  login: !!localStorage.getItem("session_key") ? true : false,
  fullname: localStorage.getItem("fullname") || "",
  read_only: JSON.parse(localStorage.read_only??0),
};

export const getLogin = createAsyncThunk("user/login", (body) => {
  let req = { type: "login", data: body }; 
  return socket.post(req);
});

export const getLogout = createAsyncThunk("user/logout", () => { 
  let req = { type: "logout", data: {} }; 
  return socket.post(req);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.loading != "idle") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = action.payload.tag == "success";
      state.msg = action.payload.data.msg; 
      state.fullname = action.payload.data.fullname;
      state.read_only = +action.payload.data.read_only; 
      localStorage.setItem("session_key", action.payload.data.session_key||"");
      localStorage.setItem("user_id", action.payload.data.user_id||0);
      localStorage.setItem("user_type", action.payload.data.user_type||"user");
      localStorage.setItem("i18nextLng", action.payload.data.default_lang||"en");
      localStorage.setItem("fullname", action.payload.data.fullname||""); 
      localStorage.setItem("menu", JSON.stringify(action.payload.data.modules||"[]"));
    });

    builder.addCase(getLogin.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = false;
      state.msg = action.error.message;
    });

    builder.addCase(getLogout.pending, (state, action) => {
      state.loading = "pending";
    });

    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = false; 
      state.msg = action.payload.data.msg;
      localStorage.clear();
      localStorage.setItem("i18nextLng", 'en');
    });

    builder.addCase(getLogout.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = true;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader } = userSlice.actions;
export default userSlice.reducer;
