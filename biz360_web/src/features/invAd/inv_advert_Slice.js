import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { socket } from "../../utils/socket";
 

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading:  "idle", //"idle" 
  UpdateLoading:"idle",
  msg: "", 
  list:[],
  conList:[],
  displayList:[],
  dimensionList:[],
  langlist:[],
  estCost:""
};

export const loadInvAdvtismentData = createAsyncThunk("invadvertisment/loadData", () => {
  let req = { type: "get_member_ad", data: {} };  
  return socket.post(req);
});

export const saveInvAdvtismentData = createAsyncThunk("invadvertisment/saveData", (data) => {
  let req = { type: "save_member_ad", data: data};  
  return socket.post(req);
});
export const updateInvAdvtismentData = createAsyncThunk("invadvertisment/updateData", (data) => {
    let req = { type: "update_member_ad", data: data};  
    return socket.post(req);
  });
  export const deleteInvAdvtismentData = createAsyncThunk("invadvertisment/deleteData", (data) => {
    let req = { type: "delete_member_ad", data: data};  
    return socket.post(req);
  });
  export const calcAdCost = createAsyncThunk("invadvertisment/costData", (data) => {
    let req = { type: "calc_member_ad_estcost", data: data};  
    return socket.post(req);
  });

const invadvertismentSlice = createSlice({
  name: "invadvertisment",
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
    builder.addCase(loadInvAdvtismentData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvAdvtismentData.fulfilled, (state, action) => {
      state.loading = "succeeded";  
      state.list = action.payload.data.member_ads||[];  
      state.conList = action.payload.data.content_list ||[];  
      state.displayList = action.payload.data.display_list||[];  
      state.dimensionList = action.payload.data.dimension_list||[];  
      });

    builder.addCase(loadInvAdvtismentData.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(saveInvAdvtismentData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInvAdvtismentData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";  
      state.msg = action.payload.data.msg||"";  
    });

    builder.addCase(saveInvAdvtismentData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name; 
      state.msg = action.error.message;
    });

    builder.addCase(updateInvAdvtismentData.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateInvAdvtismentData.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";  
        state.msg = action.payload.data.msg||"";  
      });
  
      builder.addCase(updateInvAdvtismentData.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });

      builder.addCase(deleteInvAdvtismentData.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(deleteInvAdvtismentData.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";  
        state.msg = action.payload.data.msg||"";  
      });
  
      builder.addCase(deleteInvAdvtismentData.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });

      builder.addCase(calcAdCost.pending, (state) => {
        state.UpdateLoading = "pending";
      });
  
      builder.addCase(calcAdCost.fulfilled, (state, action) => {
        state.UpdateLoading = "succeeded";  
        state.estCost = action.payload.data.est_cost||"";  
      });
  
      builder.addCase(calcAdCost.rejected, (state, action) => {
        state.UpdateLoading = action.error.name; 
        state.msg = action.error.message;
      });

  },
});

export const { initLoader } = invadvertismentSlice.actions;
export default invadvertismentSlice.reducer;
