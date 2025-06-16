import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  headerData: {},
  bodyData: "{}",
  footerData: "{}",
  moduleList:[],
  langList:[],
  basicData:{}
};

export const loadDFProfileData = createAsyncThunk("pubdfprofile/loadData", (data) => {
  let req = { type: "get_default_home_content", data: data };
  return socket.post(req);
});


const pubDefaultSlice = createSlice({
  initialState,
  name: "pubdfprofile",
  reducers: {
    addProfileData: (state, action) => {  
      // state.footerData = action.payload?.data?.footerpanel || {};
      // state.langList = action.payload.data?.language_list || [];
      // state.moduleList = action.payload.data?.menu_list || [];
      // state.profileData = action.payload?.data?.home || {}; 
      // state.basicData = action.payload.data?.basic_info || {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDFProfileData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadDFProfileData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.langList = action.payload.data.language_list || [];
      state.moduleList = action.payload.data.menu_list || []; 
      state.basicData = action.payload.data.basic_info || {};
      state.headerData = action.payload?.data?.page_header || {}; 
      state.bodyData = action.payload?.data?.page_body || "{}"; 
      state.footerData = action.payload?.data?.page_footer || "{}"; 
    });

    builder.addCase(loadDFProfileData.rejected, (state, action) => {
      state.loading = "failed";
      state.msg = action.error.message;
    });

  },
});

export default pubDefaultSlice.reducer;
export const { addProfileData } = pubDefaultSlice.actions;