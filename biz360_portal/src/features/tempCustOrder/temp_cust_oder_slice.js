import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  dataList: [],
  invoiceID:""
};

export const saveCustomerOdersTemp = createAsyncThunk("custordertemp/savedata", (data) => {
  let req = { type: "save_customer_orders", data: data };
  return socket.post(req);
});


const pubProfileSlice = createSlice({
  initialState,
  name: "custordertemp",
  reducers: {
    initODLoader: (state) => {
      if (state.loading != "idle") {
        state.loading = "idle";
      }
    },
    addOrderData: (state, action) => {
      state.dataList = action.payload || [];
    },
    updateOrderData: (state, action) => {
      let acitonArray = action.payload;
      state.dataList = state.dataList.reduce((a, b) => {
        return b.id == acitonArray.id
          ? a.concat({ ...b, order_quantity: acitonArray.order_quantity, total_price: (parseFloat(b.price) || 0) * acitonArray.order_quantity })
          : a.concat(b);
      }, []);
    },
    deleteOrderData: (state, action) => {
      state.dataList = state.dataList.filter((d) => d.id != action.payload.id);
    },
    deleteAllOrderData: (state, action) => {
      state.dataList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCustomerOdersTemp.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(saveCustomerOdersTemp.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.invoiceID = action.payload.data?.invoice_id||"";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveCustomerOdersTemp.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

  },
});

export default pubProfileSlice.reducer;
export const { initODLoader, addOrderData, updateOrderData, deleteOrderData, deleteAllOrderData } = pubProfileSlice.actions;