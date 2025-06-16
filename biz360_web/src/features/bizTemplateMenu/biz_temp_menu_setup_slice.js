import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle",
  updateLoading: "idle",
  list: [],
  read_only: 0,
  msg: "",
};
export const loadBizMenuTempData = createAsyncThunk("bizmenugroupslice/loadGroup", (data) => {
  return socket.post({ type: "get_template_menu_group", data });
});

export const updateBizMenuTempData = createAsyncThunk(
  "bizmenugroupslice/updateGroup",
  (data, { getState }) => {
    var menugroup = getState().biztempmenugroupdata?.list?.filter((d)=>d.selected==1).map((b)=>b.group_id)||[]; 
    return socket.post({
      type: "update_template_menu_group",
      data: {
        menu_id: data?.menu_id||0,
        menu_group: JSON.stringify(menugroup), 
      },
    });
  }
);


const bizMenuGroupSlice = createSlice({
  name: "bizmenugroupslice",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
    selectModule: (state, action) => { 
      let acitonArray = action.payload.split("_"); 
      state.list = state.list.reduce((a, b) => {
        return b.group_id == acitonArray[1]
          ? a.concat({ ...b, selected: b.selected ? 0 : 1 })
          : a.concat(b);
      }, []);
    },
    selectAllModule: (state, action) => {
      let acitonArray = action.payload;
      state.list = state.list.reduce((a, b) => {
        return a.concat({ ...b, selected: +acitonArray });
      }, []);
    }, 
  },

  extraReducers: (builder) => {
    builder.addCase(loadBizMenuTempData.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(loadBizMenuTempData.fulfilled, (state, action) => {
      state.list = action.payload.data.group_list;
      state.loading = "succeeded";
    });
    builder.addCase(loadBizMenuTempData.rejected, (state, action) => {
      state.msg = action.error.message;
      state.loading = action.error.name;
    });
    builder.addCase(updateBizMenuTempData.pending, (state) => {
      state.updateLoading = "pending";
    });
    builder.addCase(updateBizMenuTempData.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });
    builder.addCase(updateBizMenuTempData.rejected, (state, action) => {
      state.msg = "failed";
      state.updateLoading = action.error.name;
    });
  },
});

export default bizMenuGroupSlice.reducer;
export const { selectModule, initLoader, selectAllModule } = bizMenuGroupSlice.actions;
