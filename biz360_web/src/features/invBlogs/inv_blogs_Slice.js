import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  UpdateLoading:"idle",
  msg: "", 
  list:[],
  topicList:[],
  langlist:[],
  estCost:""
};

export const loadInvBlogsData = createAsyncThunk("invblogs/loadData", () => {
  let req = { type: "get_member_blog", data: {} };  
  return socket.post(req);
});

export const saveInvBlogsData = createAsyncThunk("invblogs/saveData", (data) => {
  let req = { type: "save_blog", data: data};  
  return socket.post(req);
});
export const updateInvBlogsLike = createAsyncThunk("invblogs/likeData", (data) => {
    let req = { type: "update_blog_like", data: data};  
    return socket.post(req);
  });
  export const updateBlogsDislike = createAsyncThunk("invblogs/dislikeData", (data) => {
    let req = { type: "update_blog_dislike", data: data};  
    return socket.post(req);
  });
  export const getInvBlogsData = createAsyncThunk("invblogs/deleteData", (data) => {
    let req = { type: "get_blog_comment", data: data};  
    return socket.post(req);
  });
  export const updateBlogsComment = createAsyncThunk("invblogs/costData", (data) => {
    let req = { type: "update_blog_comment", data: data};  
    return socket.post(req);
  });

const invBlogsSlice = createSlice({
  name: "invblogs",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
      else if( state.UpdateLoading != "idle") {
        state.UpdateLoading = "idle";
      }
     
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvBlogsData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvBlogsData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.member_ads||[];  
      state.topicList = action.payload.data.topic_list ||[];   
      });

    builder.addCase(loadInvBlogsData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveInvBlogsData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInvBlogsData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveInvBlogsData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateInvBlogsLike.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateInvBlogsLike.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";  
        state.msg = action.payload.data.msg||"";  
      });
  
      builder.addCase(updateInvBlogsLike.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });
      builder.addCase(updateBlogsDislike.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateBlogsDislike.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";  
        state.msg = action.payload.data.msg||"";  
      });
  
      builder.addCase(updateBlogsDislike.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });

      builder.addCase(getInvBlogsData.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(getInvBlogsData.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";  
        state.msg = action.payload.data.msg||"";  
      });
  
      builder.addCase(getInvBlogsData.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });

      builder.addCase(updateBlogsComment.pending, (state) => {
        state.UpdateLoading = "pending";
      });
  
      builder.addCase(updateBlogsComment.fulfilled, (state, action) => {
        state.UpdateLoading = "succeeded";  
        state.estCost = action.payload.data.est_cost||"";  
      });
  
      builder.addCase(updateBlogsComment.rejected, (state, action) => {
        state.UpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });

  },
});

export const { initLoader } = invBlogsSlice.actions;
export default invBlogsSlice.reducer;
