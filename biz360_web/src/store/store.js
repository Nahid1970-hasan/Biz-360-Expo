import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/page/page_slice";
import userReducer from "../features/user/user_slice";

import pubMenuDataReducer from "../features/mainNav/main_nav_slice";

import pubRegReducer from "../features/pubRegistration/pub_registration_slice";
import getValidateEmailReducer from "../features/resetPassword/validate_email_slice";
import getForgetPassDataReducer from "../features/resetPassword/forget_password_slice";
import getResetPassDataReducer from "../features/resetPassword/reset_password_slice";
import getChangePassDataReducer from "../features/changePassword/changePassword_slice";

import getBizPubGroupDataReducer from "../features/membership/biz_pub_group_slice";

import getEmailConfDataReducer from "../features/emailConfig/email_config_slice";
import getSMSConfDataReducer from "../features/smsConfig/smsConfig_slice";


import getBizGroupDataReducer from "../features/bizGroup/biz_group_slice";
import getBizCompanyInfoReducer from "../features/bizCompanyInfo/biz_company_info_slice";

import getBizMainCatgDataReducer from "../features/bizMainCatg/biz_main_category_slice";

import getBizSubCatgDataReducer from "../features/bizSubCatg/biz_sub_category_slice";
import getBizTemplateDataReducer from "../features/bizTemplate/template_slice";
import getBizPublicMenuDataReducer from "../features/bizPubliceMenu/public_menu_Slice";
import getBizMenuGroupDataReducer from "../features/umBizUser/biz_menu_setup_slice";
import getBizSecurityQusReducer from "../features/bizSecurity/biz_security_qus_slice";
import getBizSubscriptionReducer from "../features/bizSubscription/biz_subscription_slice";

import getAuditLogReducer from "../features/auditLog/audit_log_slice";

import getKdrlUserDataReducer from "../features/umKdrlUser/kdrl_user_slice";
import getKdrlMenuGroupDataReducer from "../features/umKdrlUser/KDRL_menu_setup_slice";
import getInvMenuGroupDataReducer from "../features/umIndUser/inv_menu_setup_slice";
import getIndUserDataReducer from "../features/umIndUser/ind_user_slice";
import getBizUserDataReducer from "../features/umBizUser/biz_user_slice";
import getFeedbackReducer from "../features/feedback/feedback_Slice";
import getPaymentLookupReducer from "../features/payment/payment_lookup_Slice";

import bizProfile from "../features/profile/profile_slice";
import getseasonalProfile from "../features/profile/seasonal_profile_slice";
import invProfileReducer from "../features/profile/ind_profile_Slice";
import getAdminUpTempDataReducer from "../pages/template/admin_update_temp_slice";
import getBizTempMenuDataReducer from "../features/bizTemplateMenu/biz_template_menu_slice";
import getBizTempMenuGroupDataReducer from "../features/bizTemplateMenu/biz_temp_menu_setup_slice";
import getFtTempSetupDataReducer from "../pages/template/temp_footer_setup_data_slice";
import getBDCTempSetupDataReducer from "../pages/template/temp_body_setup_data_slice";
import getInvBizTempDataReducer from "../pages/memberTemplate/inv_biz_temp_slice";
import getInvBizTempHDDataReducer from "../pages/memberTemplate/inv_biz_temp_hd_slice";
import getInvBizTempFTDataReducer from "../pages/memberTemplate/inv_biz_temp_ft_slice";
import getInvBizTempBDDataReducer from "../pages/memberTemplate/inv_biz_temp_bd_slice";
import getInvPaymentReducer from "../features/invPayment/inv_payment_Slice";

import getAdContentSetupReducer from "../features/adContentSetup/ad_content_setup_Slice";
import getAdDisplaySetupReducer from "../features/adDisplaySetup/ad_dislay_setup_slice";
import getAdDimensionSetupReducer from "../features/adDimensionSetup/ad_dimension_setup_slice";
import getAdTimeSetupReducer from "../features/adTimeSetup/ad_time_setup_slice";
import getAdRateReducer from "../features/adRatesetup/ad_rate_setup_slice";
import getAdViewReducer from "../features/adView/ad_view_slice";
import getInvadtmentDataReducer from "../features/invAd/inv_advert_Slice";
import getInvBlogsDataReducer from "../features/invBlogs/inv_blogs_Slice";

import getFaqReducer from "../features/faq/faq_Slice";
import getMMImgUploadDataReducer from "../pages/memberTemplate/mmb_image_upload_slice";
import getAminProfileReducer from "../features/profile/admin_profile_slice";

import getMemberOrderDataReducer from "../pages/memberOrder/member_temp_order_slice";
import getMemberReportDataReducer from "../pages/memberOrder/member_temmp_report_slice";
import getMemberDashboardDataReducer from "../features/dashboard/dashboard_Slice";
import getBizMemSubscriptionReducer from "../features/bizMemSubscription/biz_mem_subscription_slice";
import getMemInvoicePaymentReducer from "../features/memInvoice/member_invoice_slice";
export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    bizprofile: bizProfile,
    seasonalprofile: getseasonalProfile,
    invprofile: invProfileReducer,
    pubmenu: pubMenuDataReducer,
    pubreg: pubRegReducer,
    validemaildata: getValidateEmailReducer,
    forgetpassdata: getForgetPassDataReducer,
    resetpassdata: getResetPassDataReducer,
    changePassword: getChangePassDataReducer,
    bizpubgroupdata: getBizPubGroupDataReducer,
    emailconfigdata: getEmailConfDataReducer,
    smsconfigdata: getSMSConfDataReducer,
    auditlogdata: getAuditLogReducer,
    admprofile: getAminProfileReducer,

    bizgroupdata: getBizGroupDataReducer,
    bizmaincatgdata: getBizMainCatgDataReducer,
    bizsubcatgdata: getBizSubCatgDataReducer,
    biztempdata: getBizTemplateDataReducer,
    bizpublicdata: getBizPublicMenuDataReducer,
    bizcompanyinfo: getBizCompanyInfoReducer,
    bizsecurityqus: getBizSecurityQusReducer,
    bizsubscription: getBizSubscriptionReducer,
    bizmemsubscription: getBizMemSubscriptionReducer,

    kdrlusersdata: getKdrlUserDataReducer,
    kdrlmenugroupdata: getKdrlMenuGroupDataReducer,
    indusersdata: getIndUserDataReducer,
    invmenugroupdata: getInvMenuGroupDataReducer,
    bizmenugroupdata: getBizMenuGroupDataReducer,

    bizusersdata: getBizUserDataReducer,

    faqData: getFaqReducer,
    feedback: getFeedbackReducer,
    paymentLookup: getPaymentLookupReducer,
    memberorderdata: getMemberOrderDataReducer,
    memberreportdata: getMemberReportDataReducer,
    memberdashboarddata: getMemberDashboardDataReducer,
    
    admupdatetempdata: getAdminUpTempDataReducer,
    biztempmenudata: getBizTempMenuDataReducer,
    biztempmenugroupdata: getBizTempMenuGroupDataReducer,
    admfttempsetupdata: getFtTempSetupDataReducer,
    admbdctempsetupdata: getBDCTempSetupDataReducer,

    invbiztempdata: getInvBizTempDataReducer,
    invbiztemphddata: getInvBizTempHDDataReducer,
    invbiztempftdata: getInvBizTempFTDataReducer,
    invbiztempbddata: getInvBizTempBDDataReducer,
    invpayment: getInvPaymentReducer,
    meminvoicedata: getMemInvoicePaymentReducer,
    invadvertisment: getInvadtmentDataReducer,
    invblogs: getInvBlogsDataReducer,

    adContentdata: getAdContentSetupReducer,
    adDisplyData: getAdDisplaySetupReducer,
    adDimensiondata: getAdDimensionSetupReducer,
    adtimedata: getAdTimeSetupReducer,
    adratedata: getAdRateReducer,
    adviewdata: getAdViewReducer,
    mmbimgupload: getMMImgUploadDataReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});