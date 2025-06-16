import { configureStore } from "@reduxjs/toolkit"; 
import pageReducer from "../features/page/page_slice"; 
import userReducer from "../features/user/user_slice";   

import getPubProfileDataReducer from "../features/pubprofile/pub_profile_data";
import getPubDFDataReducer from "../features/pubprofile/default_profile_data";
import pubMenuDataReducer from "../features/mainNav/main_nav_slice";

import getPubProductDataReducer from "../features/pubprofile/pub_product_slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,  
    pubmenu: pubMenuDataReducer, 
    pubprofiledata: getPubProfileDataReducer, 
    pubproductdata: getPubProductDataReducer, 
    dfprofiledata: getPubDFDataReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
