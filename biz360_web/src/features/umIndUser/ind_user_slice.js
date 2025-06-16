import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    list: [],
};

export const loadINDUserData = createAsyncThunk("indusersdata/loadData", () => {
    let req = { type: "get_all_users_ind", data: {} };
    return socket.post(req);
});



export const updateINDUserData = createAsyncThunk("indusersdata/updateData", (data) => {
    let req = { type: "update_users_ind", data: data };
    return socket.post(req);
});

export const deleteINDUserData = createAsyncThunk("indusersdata/deleteData", (data) => {
    let req = { type: "delete_users_ind", data: data };
    return socket.post(req);
});




const indusersdataSlice = createSlice({
    name: "indusersdata",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadINDUserData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadINDUserData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.list = action.payload.data.users || [];
        });

        builder.addCase(loadINDUserData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });
        builder.addCase(updateINDUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateINDUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(updateINDUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(deleteINDUserData.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(deleteINDUserData.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.msg = action.payload.data.msg || "";
        });

        builder.addCase(deleteINDUserData.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

    },
});

export const { initLoader } = indusersdataSlice.actions;
export default indusersdataSlice.reducer;
