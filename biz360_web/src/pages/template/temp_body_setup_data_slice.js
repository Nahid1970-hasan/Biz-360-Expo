import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    msg: "",
    section1Data: [],
    section2Data: [],
    section3Data: [], 
    section4Data: {}, 
};

export const updateTempBDCSC = createAsyncThunk("admtempbdcsetup/loadSelectedData", (data) => {
    let req = { type: "update_template_body", data: data };
    return socket.post(req);
});

const admBDCSetupDataSlice = createSlice({
    name: "admtempbdcsetup",
    initialState,
    reducers: {
        initBDCLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
            }
        },
        addDataList: (state, action) => { 
            if(action.payload.type=="support"){ 
                state.section1Data = action.payload.sc1data;
                state.section2Data = action.payload.sc2data;
                state.section3Data = action.payload.sc3data;
                state.section4Data = action.payload.sc4data;
            }  
        },
        selectSPPList: (state, action) => {
            let acitonArray = action.payload.split("_");
            state.section1Data = state.section1Data.reduce((a, b) => {
                return b.id == acitonArray[1]
                    ? a.concat({ ...b, status: b.status=="Active" ? "Inactive" : "Active" })
                    : a.concat(b);
            }, []);
        },
        selectLC1List: (state, action) => {
            let acitonArray = action.payload.split("_");
            state.section2Data = state.section2Data.reduce((a, b) => {
                return b.id == acitonArray[1]
                    ? a.concat({ ...b, status: b.status=="Active" ? "Inactive" : "Active" })
                    : a.concat(b);
            }, []);
        },
        selectLC2List: (state, action) => {
            let acitonArray = action.payload.split("_");
            state.section3Data = state.section3Data.reduce((a, b) => {
                return b.id == acitonArray[1]
                    ? a.concat({ ...b, status: b.status=="Active" ? "Inactive" : "Active" })
                    : a.concat(b);
            }, []);
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(updateTempBDCSC.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(updateTempBDCSC.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded"; 
            state.msg = action.payload.data.msg;
        });

        builder.addCase(updateTempBDCSC.rejected, (state, action) => {
            state.addUpdateLoading = "failed";
            state.msg = action.error.message;
        }); 
    },
});

export const { initBDCLoader,  selectSPPList,selectLC1List, selectLC2List, addDataList } = admBDCSetupDataSlice.actions;
export default admBDCSetupDataSlice.reducer;
