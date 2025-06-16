import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    list: [],
};

export const loadBIZUserData = createAsyncThunk("bizusersdata/loadData", () => {
    let req = { type: "get_all_users_biz", data: {} };
    return socket.post(req);
});

export const saveBIZUserData = createAsyncThunk("bizusersdata/saveData", () => {
    let req = { type: "save_users_biz", data: {} };
    return socket.post(req);
});

export const updateBIZUserData = createAsyncThunk("bizusersdata/updateData", (data) => {
    let req = { type: "update_users_biz", data: data };
    return socket.post(req);
});

export const deleteBIZUserData = createAsyncThunk("bizusersdata/deleteData", (data) => {
    let req = { type: "delete_users_biz", data: data};
    return socket.post(req);
});




const bizusersdataSlice = createSlice({
    name: "bizusersdata",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadBIZUserData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadBIZUserData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.list = action.payload.data.users || [];
        });

        builder.addCase(loadBIZUserData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveBIZUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveBIZUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(saveBIZUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(updateBIZUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateBIZUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(updateBIZUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(deleteBIZUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(deleteBIZUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(deleteBIZUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

    },
});

export const { initLoader } = bizusersdataSlice.actions;
export default bizusersdataSlice.reducer;
