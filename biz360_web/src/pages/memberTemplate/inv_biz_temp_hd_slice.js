import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "", 
    headerData: {},
    menuList: [],
    langList: []
};
 
export const loadMTempHeaderData = createAsyncThunk("invbizdatahdtemp/loadSelectedData", (data) => {
    let req = { type: "get_member_template_header", data: data };
    return socket.post(req);
});

export const saveMTempMenuNameData = createAsyncThunk("invbizdatahdtemp/saveSelectedData", (data) => {
    let req = { type: "save_member_template_menu", data: data };
    return socket.post(req);
});
 
const invBizTempHDDataSlice = createSlice({
    name: "invbizdatahdtemp",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        
        builder.addCase(loadMTempHeaderData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadMTempHeaderData.fulfilled, (state, action) => {
            state.loading = "succeeded"; 
            state.headerData = action.payload.data?.header_info ||{}; 
            state.menuList = action.payload.data?.menu_list ||[]; 
            state.langList = action.payload.data?.language_list ||[]; 
        });

        builder.addCase(loadMTempHeaderData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveMTempMenuNameData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveMTempMenuNameData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded"; 
            // state.menuList = action.payload.data?.menu_list ||[]; 
            state.msg = action.payload.data?.msg; 
        });

        builder.addCase(saveMTempMenuNameData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
 

    },
});

export const { initLoader } = invBizTempHDDataSlice.actions;
export default invBizTempHDDataSlice.reducer;
