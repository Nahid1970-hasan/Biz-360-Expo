import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "", 
  langList:[],
  moduleList:[]
};

export const loadPubMenu = createAsyncThunk("pubmenudata/loadData", () => {
  let req = { type: "get_public_menu", data: {} };  
  return socket.post(req);
});

const pubMenuSlice = createSlice({
  name: "pubmenudata",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.loading != "idle" || state.loading != "pending") {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPubMenu.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubMenu.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.langList = action.payload.data.language_list||[]; 
      state.moduleList = action.payload.data.modules||[]; 
    });

    builder.addCase(loadPubMenu.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initLoader } = pubMenuSlice.actions;
export default pubMenuSlice.reducer;
