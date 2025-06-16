import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    tempInfoData: {}, 
    userData: {},
    langList:[],
    menuList:[],
    bizGroupList:[]
};

export const loadSelectedMTempData = createAsyncThunk("invbizdatatemp/loadSelectedData", (data) => {
    let req = { type: "get_selected_template", data: data };
    return socket.post(req);
});


export const saveSelectedMTempData = createAsyncThunk("invbizdatatemp/saveSelectedData", (data) => {
    let req = { type: "save_member_template", data: data };
    return socket.post(req);
});
 
const invBizTempDataSlice = createSlice({
    name: "invbizdatatemp",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadSelectedMTempData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadSelectedMTempData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.tempInfoData = action.payload.data?.template_info || {};
            state.bizGroupList = action.payload.data?.biz_group || [];
            state.langList = action.payload.data?.language_list || {};
            state.menuList = action.payload.data?.menu_list || [];
        });

        builder.addCase(loadSelectedMTempData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });
        builder.addCase(saveSelectedMTempData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveSelectedMTempData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded"; 
            state.msg = action.payload.data?.msg;
            state.userData = action.payload.data?.dashboard ||{};
        });

        builder.addCase(saveSelectedMTempData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
 

    },
});

export const { initLoader } = invBizTempDataSlice.actions;
export default invBizTempDataSlice.reducer;
