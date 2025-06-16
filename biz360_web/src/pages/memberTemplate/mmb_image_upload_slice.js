import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  imgUploading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateimgUploading: "idle",
  msg: "", 
  langList:[],
  moduleList:[],
  photoUrl:""
};

export const uploadIMGUsers = createAsyncThunk("pubmmimgupload/uploadData", (data) => { 
  return socket.upload(data);
});

 

const pubMMImageUploadSlice = createSlice({
  name: "pubmmimgupload",
  initialState,
  reducers: { 
    initImgLoader: (state) => {
      if ( state.imgUploading != "idle" || state.imgUploading != "pending") {
        state.imgUploading = "idle";
        state.photoUrl="";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadIMGUsers.pending, (state) => {
      state.imgUploading = "pending";
    });

    builder.addCase(uploadIMGUsers.fulfilled, (state, action) => {
      state.imgUploading = "succeeded";  
      state.photoUrl = action.payload.data.file_url||""; 
      state.msg = action.payload.data.msg||''; 

    });

    builder.addCase(uploadIMGUsers.rejected, (state, action) => {
      state.imgUploading = action.error.name; 
      state.msg = action.error.message;
    });
 
  },
});

export const { initImgLoader } = pubMMImageUploadSlice.actions;
export default pubMMImageUploadSlice.reducer;
