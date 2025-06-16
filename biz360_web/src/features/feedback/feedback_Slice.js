import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    list: [],
    addUpdateLoading:"idle",
    msg: ''
  };
  export const loadFeedbackData = createAsyncThunk("feedback/feedbackload", (data) => {
    let req = { type: "get_feedback", data: data };

    return socket.post(req);
  });

  export const updateFeedbackData = createAsyncThunk("feedback/feedbackupdate", (data) => {
    let req = { type: "update_feedback", data: data };

    return socket.post(req);
  });
  export const deleteFeedbackData = createAsyncThunk("feedback/feedbackDelete", (data) => {
    let req = { type: "delete_feedback", data: data };

    return socket.post(req);
  });


  const loadFeedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
      initLoader: (state) => {
        if (
          state.addUpdateLoading != "idle" 
        ) {
          state.addUpdateLoading = "idle";
        }
        
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loadFeedbackData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadFeedbackData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.list = action.payload.data.feedback ||[]; 
      });
  
      builder.addCase(loadFeedbackData.rejected, (state, action) => {
        state.loading = action.error.name;
      });
      builder.addCase(updateFeedbackData.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateFeedbackData.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg; 
      });
  
      builder.addCase(updateFeedbackData.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(deleteFeedbackData.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(deleteFeedbackData.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(deleteFeedbackData.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
    },
  });

  export default loadFeedbackSlice.reducer;
  export const { initLoader } = loadFeedbackSlice.actions;