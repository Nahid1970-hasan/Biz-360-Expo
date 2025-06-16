import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  fullname:"",
  headerData: {},
  bodyData: "{}",
  footerData: "{}",
  moduleList: [],
  langList: [],
  pageList: [],
  basicData: {}
};

export const loadPubProfileData = createAsyncThunk("pubmenudata/loadData", (data) => {
  let req = { type: "get_member_home_content", data: data };
  return socket.post(req);
});


const pubProfileSlice = createSlice({
  initialState,
  name: "pubprofile",
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
    builder.addCase(loadPubProfileData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubProfileData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.fullname = action.payload.data.fullname || "";
      state.langList = action.payload.data.language_list || [];
      state.moduleList = action.payload.data.menu_list || []; 
      state.pageList = action.payload.data.menu_list?.map((d)=>d.page_name) || []; 
      state.basicData = action.payload.data.basic_info || {};
      state.headerData = action.payload?.data?.page_header || {}; 
      state.bodyData = action.payload?.data?.page_body || "{}"; 
      state.footerData = action.payload?.data?.page_footer || "{}"; 
    });

    builder.addCase(loadPubProfileData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

  },
});

export default pubProfileSlice.reducer;
export const { addProfileData } = pubProfileSlice.actions;