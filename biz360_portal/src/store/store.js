import { configureStore } from "@reduxjs/toolkit"; 
import pageReducer from "../features/page/page_slice"; 
import userReducer from "../features/user/user_slice";   

import getPubProfileDataReducer from "../features/pubprofile/pub_profile_data";
import getPubDFDataReducer from "../features/pubprofile/default_profile_data";
import pubMenuDataReducer from "../features/mainNav/main_nav_slice";

import getPubProductDataReducer from "../features/pubprofile/pub_product_slice";
import getBizPubGroupDataReducer from "../features/membership/biz_pub_group_slice";
import pubRegReducer from "../features/pubRegistrastion/pub_registration_slice";
import getFaqReducer from "../features/faq/faq_Slice";
import getCustOrderDataReducer from "../features/tempCustOrder/temp_cust_oder_slice";
import getDisrictDataReducer from "../features/district/get_district_list";
import pubViewDemoDataReducer from "../features/viewdemo/view_demo_slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,  
    pubmenu: pubMenuDataReducer, 
    districtdata: getDisrictDataReducer, 
    pubprofiledata: getPubProfileDataReducer, 
    pubproductdata: getPubProductDataReducer, 
    dfprofiledata: getPubDFDataReducer, 
    bizpubgroupdata: getBizPubGroupDataReducer,
    pubreg: pubRegReducer,
    faqData: getFaqReducer,
    custOrderData: getCustOrderDataReducer,
     viewdata: pubViewDemoDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
