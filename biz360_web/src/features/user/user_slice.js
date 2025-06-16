import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  lgloading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  langList: JSON.parse(localStorage.getItem("language_list") || '[]'),
  mainList: JSON.parse(localStorage.getItem("groupList") || '[]'),
  dashboard: JSON.parse(localStorage.getItem("dashboard") || '{}'),
  basicInfo: JSON.parse(localStorage.getItem("basic_info") || '{}'),
  login: !!localStorage.getItem("session_key") ? true : false,
  fullname: localStorage.getItem("fullname") || "",
  mobile: localStorage.getItem("mobile") || "",
  mobile: localStorage.getItem("mobile") || "",
  user_type: localStorage.getItem("user_type", "")
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
      if (state.loading != "idle") {
        state.loading = "idle";
      }
    },
    updateDashboard: (state, action) => {
      state.dashboard = action.payload || {};
      window.location.reload();
      localStorage.setItem("menu", JSON.stringify(action.payload?.menu_list?.modules || "[]"));
      localStorage.setItem("dashboard", JSON.stringify(action.payload || {}));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = action.payload.tag == "success";
      state.mainList = action.payload.data?.biz_main || [];
      state.fullname = action.payload.data?.fullname || "";
      state.mobile = action.payload.data?.mobile || "";
      state.user_type = action.payload.data?.user_type || "";
      if (action.payload.data?.user_type == "BIZ") {
        var comInfo = {};
        comInfo.seasonal_trader = action.payload.data?.seasonal_trader || "";
        comInfo.photo = action.payload.data?.photo || "";
        comInfo.logo = action.payload.data?.logo || "";
        comInfo.hash_url = action.payload.data?.hash_url || "";
        comInfo.user_url = action.payload.data?.user_url || "";
        comInfo.biz_name = action.payload.data?.biz_name || "";
        comInfo.group_id = action.payload.data?.group_id || 0;
        comInfo.user_type = action.payload.data?.user_type || "";
        comInfo.default_lang = action.payload.data?.default_lang || "en";
        localStorage.setItem("basic_info", JSON.stringify(comInfo));
        state.basicInfo = comInfo;
      }
      if (action.payload.data?.user_type == "IND") {
        var indInfo = {};
        indInfo.seasonal_trader = action.payload.data?.seasonal_trader || "";
        indInfo.photo = action.payload.data?.photo || "";
        indInfo.logo = action.payload.data?.logo || "";
        indInfo.hash_url = action.payload.data?.hash_url || "";
        indInfo.user_url = action.payload.data?.user_url || "";
        indInfo.fullname = action.payload.data?.fullname || "";
        indInfo.group_id = action.payload.data?.group_id || 0;
        indInfo.user_type = action.payload.data?.user_type || "";
        indInfo.default_lang = action.payload.data?.default_lang || "en";
        localStorage.setItem("basic_info", JSON.stringify(indInfo));
        state.basicInfo = indInfo;
      }

      if (action.payload.data?.user_type == "COM") {
        var admInfo = {};
        admInfo.photo = action.payload.data?.photo || "";
        admInfo.logo = action.payload.data?.logo || "";
        admInfo.user_url = action.payload.data?.user_url || "";
        admInfo.fullname = action.payload.data?.fullname || "";
        admInfo.user_type = action.payload.data?.user_type || "";
        admInfo.default_lang = action.payload.data?.default_lang || "en";
        localStorage.setItem("basic_info", JSON.stringify(admInfo));
        state.basicInfo = admInfo;
      }

      state.dashboard = action.payload.data.dashboard;
      state.langList = action.payload.data.language_list;
      // state.read_only = +action.payload.data.read_only; 
      localStorage.setItem("session_key", action.payload.data.session_key || "");
      localStorage.setItem("user_id", action.payload.data.user_id || 0);
      localStorage.setItem("user_type", action.payload.data?.user_type || "");
      localStorage.setItem("i18nextLng", action.payload.data?.default_lang || "en");
      localStorage.setItem("fullname", action.payload.data.fullname || "");
      localStorage.setItem("mobile", action.payload.data.mobile || "");
      localStorage.setItem("dashboard", JSON.stringify(action.payload.data?.dashboard || {}));
      localStorage.setItem("groupList", JSON.stringify(action.payload.data?.biz_main || []));
      localStorage.setItem("language_list", JSON.stringify(action.payload.data?.language_list || []));
      localStorage.setItem("menu", JSON.stringify(action.payload.data.modules || "[]"));
    });

    builder.addCase(getLogin.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = false;
      state.msg = action.error.message;
    });

    builder.addCase(getLogout.pending, (state, action) => {
      state.lgloading = "pending";
    });

    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.lgloading = "succeeded";
      state.login = false;
      state.msg = action.payload.data.msg;
      localStorage.clear();
      localStorage.setItem("i18nextLng", 'en');
    });

    builder.addCase(getLogout.rejected, (state, action) => {
      state.lgloading = action.error.name;
      state.login = true;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader, updateDashboard } = userSlice.actions;
export default userSlice.reducer;
