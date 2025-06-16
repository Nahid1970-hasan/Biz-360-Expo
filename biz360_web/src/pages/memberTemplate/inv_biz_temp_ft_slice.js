import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    menuList: [],
    langList: [],
    footerData: "",
    msg: "",
};

export const loadMTempFooterData = createAsyncThunk("invbizdatafttemp/loadSelectedData", () => {
    let req = { type: "get_member_template_footer", data: {} };
    return socket.post(req);
});

export const saveMTempFooterData = createAsyncThunk("invbizdatafttemp/saveSelectedData", (data) => {
    let req = { type: "save_member_template_footer", data: data };
    return socket.post(req);
});

export const saveMTempFTMenuData = createAsyncThunk("invbizdatafttemp/saveMenuData", (data) => {
    let req = { type: "save_member_template_menu", data: data };
    return socket.post(req);
});

const invBizTempFTDataSlice = createSlice({
    name: "invbizdatafttemp",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {

        builder.addCase(loadMTempFooterData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadMTempFooterData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.footerData = action.payload.data?.page_footer || "{}";
            state.menuList = action.payload.data?.menu_list || [];
            state.langList = action.payload.data?.language_list ||[]; 
        });

        builder.addCase(loadMTempFooterData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveMTempFooterData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveMTempFooterData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data?.msg;
        });

        builder.addCase(saveMTempFooterData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveMTempFTMenuData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveMTempFTMenuData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data?.msg;
        });

        builder.addCase(saveMTempFTMenuData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

    },
});

export const { initLoader } = invBizTempFTDataSlice.actions;
export default invBizTempFTDataSlice.reducer;
