import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    socialLinkList: [],
    importantLinkList: [],
    supportDataList: [],
};

export const updateTemplateContent = createAsyncThunk("admtempftsetup/loadSelectedData", (data) => {
    let req = { type: "update_template_footer", data: data };
    return socket.post(req);
});

const admFTSetupDataSlice = createSlice({
    name: "admtempftsetup",
    initialState,
    reducers: {
        initFTLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
        addDataList: (state, action) => {
            state.importantLinkList = action.payload.importantList;
            state.socialLinkList = action.payload.socialList;
            state.supportDataList = action.payload.supportdatalist;
        },
        selectIMLink: (state, action) => {
            let acitonArray = action.payload.split("_");
            state.importantLinkList = state.importantLinkList.reduce((a, b) => {
                return b.id == acitonArray[1]
                    ? a.concat({ ...b, status: b.status=="Active" ? "Inactive" : "Active" })
                    : a.concat(b);
            }, []);
        },
        selectSCLink: (state, action) => {
            let acitonArray = action.payload.split("_");
            state.socialLinkList = state.socialLinkList.reduce((a, b) => {
                return b.icon_id == acitonArray[1]
                    ? a.concat({ ...b, status: b.status=="Active" ? "Inactive" : "Active" })
                    : a.concat(b);
            }, []);
        },
        selectSPPList: (state, action) => {
            let acitonArray = action.payload.split("_");
            state.supportDataList = state.supportDataList.reduce((a, b) => {
                return b.id == acitonArray[1]
                    ? a.concat({ ...b, status: b.status=="Active" ? "Inactive" : "Active" })
                    : a.concat(b);
            }, []);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateTemplateContent.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateTemplateContent.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded"; 
            state.msg = action.payload.data.msg;
        });

        builder.addCase(updateTemplateContent.rejected, (state, action) => {
            state.addUpdateLoading = "failed";
            state.msg = action.error.message;
        }); 
    },
});

export const { initFTLoader, selectSCLink, selectIMLink, selectSPPList, addDataList } = admFTSetupDataSlice.actions;
export default admFTSetupDataSlice.reducer;
