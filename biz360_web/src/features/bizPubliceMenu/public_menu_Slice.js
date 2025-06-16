import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    subUpdateLoading:"idle",
    msg: "",
    list: [],
    languageList: [],
    subList: [],
};



export const LoadPublicMenuData = createAsyncThunk("bizpublicdata/loadAllData", () => {
    let req = { type: "get_pub_main_menu", data: {} };
    return socket.post(req);
});
export const LoadSubMenuData = createAsyncThunk("bizpublicdata/loadSubData", (data) => {
    let req = { type: "get_pub_sub_menu", data: data };
    return socket.post(req);
});

export const saveModulesData = createAsyncThunk("bizpublicdata/saveData", (data) => {
    let req = { type: "save_pub_main_menu", data: data };
    return socket.post(req);
});

export const saveSubModulesData = createAsyncThunk("bizpublicdata/saveSubData", (data) => {
    let req = { type: "save_pub_sub_menu", data: data };
    return socket.post(req);
});


export const updateModulesData = createAsyncThunk("bizpublicdata/updateData", (data) => {
    let req = { type: "update_pub_main_menu", data: data };
    return socket.post(req);
});

export const updateSubModule = createAsyncThunk("bizpublicdata/updatesubData", (data) => {
    let req = { type: "update_pub_sub_menu", data: data };
    return socket.post(req);
});

export const deleteSubModule = createAsyncThunk("bizpublicdata/deleteSubData", (data) => {
    let req = { type: "delete_pub_sub_menu", data: data };
    return socket.post(req);
});


const bizPublicMenuDataSlice = createSlice({
    name: "bizpublicdata",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
           else if (state.subUpdateLoading != "idle") {
                state.subUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoadPublicMenuData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(LoadPublicMenuData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.list = action.payload.data?.main_menu || [];
            state.subList = action.payload.data?.sub_module || [];
            state.languageList = action.payload.data?.language_list || [];
        });

        builder.addCase(LoadPublicMenuData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(LoadSubMenuData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(LoadSubMenuData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.subList = action.payload.data?.sub_module || [];
            state.languageList = action.payload.data?.language_list || [];
        });

        builder.addCase(LoadSubMenuData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveModulesData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveModulesData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(saveModulesData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(updateModulesData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateModulesData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(updateModulesData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
        builder.addCase(saveSubModulesData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveSubModulesData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(saveSubModulesData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(deleteSubModule.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(deleteSubModule.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(deleteSubModule.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
        builder.addCase(updateSubModule.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateSubModule.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(updateSubModule.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });
    },
});

export const { initLoader } = bizPublicMenuDataSlice.actions;
export default bizPublicMenuDataSlice.reducer;
