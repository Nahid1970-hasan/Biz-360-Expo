import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    tempInfoData: {},
    langList:[],
    menuList:[],
    bizGroupList:[]
};

export const loadSelectedTemp = createAsyncThunk("admupdatetemp/loadSelectedData", (data) => {
    let req = { type: "get_selected_template", data: data };
    return socket.post(req);
});
 
const admUpTempSlice = createSlice({
    name: "admupdatetemp",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadSelectedTemp.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadSelectedTemp.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.tempInfoData = action.payload.data.template_info || {};
            state.bizGroupList = action.payload.data.biz_group || [];
            state.langList = action.payload.data.language_list || {};
            state.menuList = action.payload.data.menu_list || [];
        });

        builder.addCase(loadSelectedTemp.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });
 

    },
});

export const { initLoader } = admUpTempSlice.actions;
export default admUpTempSlice.reducer;
