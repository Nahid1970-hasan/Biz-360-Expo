import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    data: {},
};

export const loadDashboardData = createAsyncThunk("dashboardslice/loadData", (data) => {
    let req = { type: "get_member_dashboard", data: data };
    return socket.post(req);
});

const dashboardDataSlice = createSlice({
    name: "dashboardslice",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
        updateDashboardData: (state, action) => {
            state.data = action.payload || {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadDashboardData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadDashboardData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.data = action.payload.data || {};
            localStorage.setItem("menu", JSON.stringify(action.payload.data.menu_list.modules  || []));
            localStorage.setItem("dashboard", JSON.stringify(action.payload.data  || {}));
        });

        builder.addCase(loadDashboardData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

    },
});

export const { initLoader, updateDashboardData } = dashboardDataSlice.actions;
export default dashboardDataSlice.reducer;
