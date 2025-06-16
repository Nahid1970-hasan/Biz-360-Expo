import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";


var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", //"idle" 
    payLoading: "idle", //"idle" 
    msg: "",
    list: [],
    payMethod: [],
    invoiceData: {}
};

export const loadMemberInvoiceData = createAsyncThunk("memberinvoicesdata/loadData", () => {
    let req = { type: "get_member_invoice", data: {} };
    return socket.post(req);
});

export const loadMemberInvoiceDetails = createAsyncThunk("memberinvoicesdata/loadDetailData", (data) => {
    let req = { type: "get_member_invoice_detail", data: data };
    return socket.post(req);
});

export const saveMemberInvoicePayment = createAsyncThunk(
    "memberinvoicesdata/savepayment",
    (data) => {
        let req = { type: "save_member_payment", data: data };
        return socket.post(req);
    }
);

const memberInvoiceSlice = createSlice({
    name: "memberinvoicesdata",
    initialState,
    reducers: {
        initLoader: (state) => {
            if (state.addUpdateLoading != "idle") {
                state.addUpdateLoading = "idle";
                state.invoiceData = {};
            }
        },
         payInitLoader: (state) => {
            if (state.payLoading != "idle") {
                state.payLoading = "idle"; 
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loadMemberInvoiceData.pending, (state) => {
            state.loading = "pending";
        });

        builder.addCase(loadMemberInvoiceData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.list = action.payload.data.invoice_list || [];
            state.payMethod = action.payload.data.payment_method || [];
        });

        builder.addCase(loadMemberInvoiceData.rejected, (state, action) => {
            state.loading = action.error.name;
            state.msg = action.error.message;
        });

        builder.addCase(loadMemberInvoiceDetails.pending, (state) => {
            state.addUpdateLoading = "pending";
        });

        builder.addCase(loadMemberInvoiceDetails.fulfilled, (state, action) => {
            state.addUpdateLoading = "succeeded";
            state.invoiceData = action.payload.data || {};
        });

        builder.addCase(loadMemberInvoiceDetails.rejected, (state, action) => {
            state.addUpdateLoading = action.error.name;
            state.msg = action.error.message;
        });

          builder.addCase(saveMemberInvoicePayment.pending, (state) => {
            state.payLoading = "pending";
        });

        builder.addCase(saveMemberInvoicePayment.fulfilled, (state, action) => {
            state.payLoading = "succeeded";
            state.msg = action.payload.data.msg;
        });

        builder.addCase(saveMemberInvoicePayment.rejected, (state, action) => {
            state.payLoading = action.error.name;
            state.msg = action.error.message;
        });

    },
});

export const { initLoader, payInitLoader } = memberInvoiceSlice.actions;
export default memberInvoiceSlice.reducer;
