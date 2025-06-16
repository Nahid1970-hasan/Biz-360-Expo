import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  loading: "idle",
  updateLoading: "idle",
  menuList: [],
  langlist:[],
  read_only: 0,
  msg: "",
};
export const loadInvMenuData = createAsyncThunk("invmenugroupdata/loadGroup", (data) => {
    return socket.post({ type: "get_users_roles_ind", data });
});

export const updateInvMenuData = createAsyncThunk(
    "invmenugroupdata/updateGroup",
    (data, { getState }) => {
        var menugroup = getState().invmenugroupdata?.menuList?.filter((d) => d.selected == 1).map((b) => b.module_id) || [];
        return socket.post({
            type: "update_users_roles_ind",
            data: {
                ...data, 
                user_modules: getState().invmenugroupdata?.menuList,
            },
        });
    }
);


const invmenugroupdataSlice = createSlice({
  name: "invmenugroupdata",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
    selectModule: (state, action) => { 
      let acitonArray = action.payload.split("_"); 
    //   state.list = state.list.reduce((a, b) => {
    //     return b.module_id == acitonArray[1]
    //       ? a.concat({ ...b, selected: b.selected ? 0 : 1 })
    //       : a.concat(b);
    //   }, []);
    state.menuList = state.menuList.map((d) =>
        d.module_id == acitonArray[1]
          ? {
              ...d,
              sub_module: d.sub_module.reduce((a, b) => {
                return b.sub_id == acitonArray[2]
                  ? a.concat({ ...b, selected: b.selected ? 0 : 1 })
                  : a.concat(b);
              }, []),
            }
          : d
      );
    },
    selectAllModule: (state, action) => {
      let acitonArray = action.payload;
    //   state.list = state.list.reduce((a, b) => {
    //     return a.concat({ ...b, selected: +acitonArray });
    //   }, []);
    state.menuList = state.menuList.map((d) =>
        Object.assign({
         ...d,
         sub_module: d.sub_module.reduce((a, b) => {
           return  a.concat({ ...b, selected: +acitonArray});
         }, []),
       })
     );
    }, 
  },

  extraReducers: (builder) => {
    builder.addCase(loadInvMenuData.pending, (state, action) => {
        state.loading = "pending";
    });
    builder.addCase(loadInvMenuData.fulfilled, (state, action) => {
        state.menuList = action.payload.data.user_modules;
        state.langlist = action.payload.data.language_list||[];
        state.loading = "succeeded";
    });
    builder.addCase(loadInvMenuData.rejected, (state, action) => {
        state.msg = action.error.message;
        state.loading = action.error.name;
    });
    builder.addCase(updateInvMenuData.pending, (state) => {
        state.updateLoading = "pending";
    });
    builder.addCase(updateInvMenuData.fulfilled, (state, action) => {
        state.updateLoading = "succeeded";
        state.msg = action.payload.data.msg;
    });
    builder.addCase(updateInvMenuData.rejected, (state, action) => {
        state.msg = "failed";
        state.updateLoading = action.error.name;
    });
  },
});

export default invmenugroupdataSlice.reducer;
export const { selectModule, initLoader, selectAllModule } = invmenugroupdataSlice.actions;
