import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    list: [],
};

export const loadKDRLUserData = createAsyncThunk("kdrluserslice/loadData", () => {
    let req = { type: "get_all_users_com", data: {} };
    return socket.post(req);
});

export const saveKDRLUserData = createAsyncThunk("kdrluserslice/saveData", (data) => {
    let req = { type: "save_users_com", data: data };
    return socket.post(req);
});

export const updateKDRLUserData = createAsyncThunk("kdrluserslice/updateData", (data) => {
    let req = { type: "update_users_com", data: data };
    return socket.post(req);
});

export const deleteKDRLUserData = createAsyncThunk("kdrluserslice/deleteData", (data) => {
    let req = { type: "delete_users_com", data: data };
    return socket.post(req);
});

const kdrlUserSlice = createSlice({
    name: "kdrluserslice",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loadKDRLUserData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadKDRLUserData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.list = action.payload.data.users || [];
        });

        builder.addCase(loadKDRLUserData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(saveKDRLUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(saveKDRLUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(saveKDRLUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(updateKDRLUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateKDRLUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(updateKDRLUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(deleteKDRLUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(deleteKDRLUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(deleteKDRLUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

       

    },
});

export const {initLoader} = kdrlUserSlice.actions;
export default kdrlUserSlice.reducer;
