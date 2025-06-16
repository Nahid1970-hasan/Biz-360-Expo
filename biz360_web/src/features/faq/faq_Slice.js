import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dataList:[],
  langList:[],
  groupList:[],
  groupLang:[],
  addUpdateLoading: "idle",
  msg: ''
};

export const loadFaq = createAsyncThunk("faqData/load", () => {
  let req = { type: "get_faq_list", data: {}};
  return socket.post(req);
});
export const loadFaqGroupData = createAsyncThunk("faqData/loadgroupData", () => {
  let req = { type: "get_faq_group_list", data: {} };  
  return socket.post(req);
});
export const FaqSave = createAsyncThunk("faqData/save", (data) => {
  let req = { type: "save_faq", data: data};
  return socket.post(req);
});
export const SaveFaqGroup = createAsyncThunk("faqData/savegroup", (data) => {
  let req = { type: "save_faq_group", data: data};
  return socket.post(req);
});
export const UpdateFaq = createAsyncThunk("faqData/update", (data) => {
  let req = { type: "update_faq", data: data};
  return socket.post(req);
});

export const UpdateFaqGroup = createAsyncThunk("faqData/updategroup", (data) => {
  let req = { type: "update_faq_group", data: data};
  return socket.post(req);
});
export const DeleteFaq = createAsyncThunk("faqData/delete", (data) => {
  let req = { type: "delete_faq", data: data};
  return socket.post(req);
});
export const DeleteFaqGroup = createAsyncThunk("faqData/deletegroup", (data) => {
  let req = { type: "delete_faq_group", data: data};
  return socket.post(req);
});
 
const FAQSlice = createSlice({
  name: "faqData",
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
    builder.addCase(loadFaq.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadFaq.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.dataList = action.payload.data.faq_list ||[]; 
      state.langList = action.payload.data?.language_list || [];
    });
    builder.addCase(loadFaq.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });


    builder.addCase(loadFaqGroupData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadFaqGroupData.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.groupList = action.payload.data.faq_group_list ||[]; 
      state.groupLang = action.payload.data?.language_list || [];
    });
    builder.addCase(loadFaqGroupData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(FaqSave.pending, (state) => {
      state.addUpdateLoading = "pending";
    });
    builder.addCase(FaqSave.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg; 
    });
    builder.addCase(FaqSave.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(SaveFaqGroup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });
    builder.addCase(SaveFaqGroup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg; 
    });
    builder.addCase(SaveFaqGroup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(UpdateFaq.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(UpdateFaq.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg; 
    });

    builder.addCase(UpdateFaq.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(UpdateFaqGroup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });
    builder.addCase(UpdateFaqGroup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg; 
    });
    builder.addCase(UpdateFaqGroup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    })
    builder.addCase(DeleteFaq.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(DeleteFaq.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg; 
    });

    builder.addCase(DeleteFaq.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(DeleteFaqGroup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });
    builder.addCase(DeleteFaqGroup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg; 
    });
    builder.addCase(DeleteFaqGroup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    })
  },
});

export default FAQSlice.reducer;
export const { initLoader } = FAQSlice.actions;