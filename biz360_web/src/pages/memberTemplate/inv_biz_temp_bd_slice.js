import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "", 
    homeData: {}, 
    businessInfo: {}, 
    langList: [],
    unitList:[]
};
 
export const loadMTempBodyData = createAsyncThunk("invbizdatabdtemp/loadSelectedData", (data) => {
    let req = { type: "get_member_template_body", data: data };
    return socket.post(req);
});

export const saveMTempBodyData = createAsyncThunk("invbizdatabdtemp/saveSelectedData", (data) => {
    let req = { type: "save_member_template_body", data: data };
    return socket.post(req);
});

export const updateMTempBodyContentData = createAsyncThunk("invbizdatabdtemp/updateSelectedData", (data) => {
    let req = { type: "update_member_content_item", data: data };
    return socket.post(req);
});

const invBizTempBDDataSlice = createSlice({
    name: "invbizdatabdtemp",
    initialState,
    reducers: {
        initBDLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
        addBDSC1Data: (state, action) => { 
            state.homeData.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        
        builder.addCase(loadMTempBodyData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadMTempBodyData.fulfilled, (state, action) => {
            state.loading = "succeeded"; 
            state.homeData = action.payload.data?.page_body || {};  
            state.businessInfo = action.payload.data?.business_info || {};  
            state.langList = action.payload.data?.language_list ||[]; 
            state.unitList = action.payload.data?.unit_list ||[]; 
        });

        builder.addCase(loadMTempBodyData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveMTempBodyData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveMTempBodyData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";  
            state.msg = action.payload.data?.msg; 
        });

        builder.addCase(saveMTempBodyData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
 
        builder.addCase(updateMTempBodyContentData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateMTempBodyContentData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";  
            state.msg = action.payload.data?.msg; 
        });

        builder.addCase(updateMTempBodyContentData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
 
    },
});

export const { initBDLoader, addBDSC1Data } = invBizTempBDDataSlice.actions;
export default invBizTempBDDataSlice.reducer;
