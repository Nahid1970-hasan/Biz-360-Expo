import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    list: [],
    languageList: [],
    tempList: [],
};



export const LoadBizTemplateData = createAsyncThunk("biztempdata/loadAllData", () => {
    let req = { type: "get_template_list", data: {} };
    return socket.post(req);
});
export const LoadGetTemplateData = createAsyncThunk("biztempdata/getTemplateData", (data) => {
    let req = { type: "get_selected_template_list", data:data };
    return socket.post(req);
});


export const saveBizTemplate = createAsyncThunk("biztempdata/saveData", (data) => {
    let req = { type: "save_template", data: data };
    return socket.post(req);
});


export const updateTemplate = createAsyncThunk("biztempdata/updateData", (data) => {
    let req = { type: "update_template", data: data };
    return socket.post(req);
});

export const deleteTemplate = createAsyncThunk("biztempdata/deleteData", (data) => {
    let req = { type: "delete_template", data: data };
    return socket.post(req);
});


const bizTemplatedataSlice = createSlice({
    name: "biztempdata",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoadBizTemplateData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(LoadBizTemplateData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.list = action.payload.data?.biz_group || [];
            state.tempList = action.payload.data?.template_list || [];
            state.languageList = action.payload.data?.language_list || [];
        });

        builder.addCase(LoadBizTemplateData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(LoadGetTemplateData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(LoadGetTemplateData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.tempList = action.payload.data.template_list || [];
        });

        builder.addCase(LoadGetTemplateData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });
        builder.addCase(saveBizTemplate.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveBizTemplate.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(saveBizTemplate.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(updateTemplate.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateTemplate.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(updateTemplate.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(deleteTemplate.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(deleteTemplate.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(deleteTemplate.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
    },
});

export const { initLoader } = bizTemplatedataSlice.actions;
export default bizTemplatedataSlice.reducer;
