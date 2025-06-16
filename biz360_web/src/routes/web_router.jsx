import { createBrowserRouter, createHashRouter, createRoutesFromElements, Route, RouterProvider, useParams } from "react-router-dom";
import { LayoutLogin } from "../layout/layoutLogin";
import { LoginPage } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Home } from "../views/Home";
import { LayoutCustom } from "../layout/layoutCustom";
import React, { useEffect, useState } from "react";
import { UserAboutPage } from "../views/About";
import { ContactPage } from "../views/Contact";
import { Loading } from "../component/Loading";
import { LayoutAdmin } from "../layout/layout_admin";
import { EmailConfigPage } from "../pages/settings/EmailConfig";
import { SMSConfigPage } from "../pages/settings/SMSConfig";
import { BIZGroupPage } from "../pages/masterdata/BIZGroup";
import { BIZMainCatgPage } from "../pages/masterdata/BIZMainCatg";
import { BIZSubCatgPage } from "../pages/masterdata/BIZSubCatg";
import { KDRLUserPage } from "../pages/userManagement/KDRLUser";
import { INDUserPage } from "../pages/userManagement/INDUser";
import { BIZUserPage } from "../pages/userManagement/BIZUser";
import { TemplatePage } from "../pages/masterdata/Template";
import { PublicMenuPage } from "../pages/masterdata/PublicMenu";
import { ChangePassword } from "../pages/ChangePassword";
import { DashboardPage } from "../pages/Dashboard";
import { UpdateTemplatePage } from "../pages/template/UpdateTemplate";
import { PreviewTemplatePage } from "../pages/template/PreviewTemplate";
import { UpdateTempMenuPage } from "../pages/templateMenu/UpdateTemplateMenu";
import { AuditLogPage } from "../pages/AuditLog";
import { LogOutPage } from "../pages/logOut";
import { InvTemplatePage } from "../pages/inv/InvTemplate";
import { InvInvoicePage } from "../pages/inv/InvInvoice";
import { InvPaymentPage } from "../pages/inv/InvPayment";
import { InvAdvertisementPage } from "../pages/inv/InvAdvertisement";
import { InvBlogPage } from "../pages/inv/InvBlog";
import { AdminAuditLogPage } from "../pages/AdminAuditLog";
import { SecurityQusPage } from "../pages/masterdata/BizSecurityQus";
import { MUpdateTempNavPage } from "../pages/memberTemplate/mTempNavUpdate";
import { MUpdateTempBodyPage } from "../pages/memberTemplate/mTempBodyUpdate";
import { MUpdateTempFooterPage } from "../pages/memberTemplate/mTempFooterUpdate";
import { SubcriptionPage } from "../pages/masterdata/BizSubcription";
import { FAQPage } from "../pages/FAQ";
import { FeedbackPage } from "../pages/Feedback";
import { PaymentLookUpPage } from "../pages/PaymentLookUp";
import { AdContentSetupPage } from "../pages/Advertisement/AdContentSutup";
import { AdDisplaySetupPage } from "../pages/Advertisement/AdDisplaySetup";
import { AdDimensionPage } from "../pages/Advertisement/AdDimension";
import { AdTimePage } from "../pages/Advertisement/AdTime";
import { AdRatePage } from "../pages/Advertisement/AdRate";
import { ADViewPage } from "../pages/Advertisement/ADView";
import { CompanyInfoPage } from "../pages/masterdata/CompanyInfo";
import { AuditlogInv } from "../pages/AuditlogInv";
import { AdminChangePass } from "../pages/AdminChngPass";
import { AdminProfile } from "../pages/AdminProfile";
import { MUpdateTempAbtUsPage } from "../pages/memberTemplate/mTempAboutUsUpdate";
import { MUpdateTempContUsPage } from "../pages/memberTemplate/mTempContactUsUpdate";
import { MUpdateTempPrivacyPlcPage } from "../pages/memberTemplate/mTempPrivacyPlcUpdate";
import { MUpdateTempMSDataPage } from "../pages/memberTemplate/mTempUpdateMSData";
import { BizAdvertisementPage } from "../pages/Advertisement/BizAdvertisement";
import { MUpdateTempFAQsPage } from "../pages/memberTemplate/mTempFaqsUpdate";
import { MUpdateTempTermsConPage } from "../pages/memberTemplate/mTempTermsConUpdate";
import { MUpdateTempCookiesPlcPage } from "../pages/memberTemplate/mTempCookiesPlcUpdate";
import { BizBlogPage } from "../pages/Advertisement/BizBlog";
import { FAQGroupPage } from "../pages/FAQGroup";
import { MemberTempOrderPage } from "../pages/memberOrder/MemberTempOrder";
import { MemberTempReportsPage } from "../pages/memberOrder/MemberTempReports";
import { SubCPInfopage } from "../pages/Profile/SubCPInfopage";
import { SecurityPage } from "../pages/Profile/SecurityPage";
import { ApplicationPage } from "../pages/Profile/Application";
import { NotificationPage } from "../pages/Profile/Notification";
import { UpgradeMembershipPage } from "../pages/UpgradeMembership";
import { ComProfilePage } from "../pages/ComProfile";
import { IndvProfilePage } from "../pages/IndvProfile";
import { SeasonalProfilePage } from "../pages/SeasonalProfile";
import { MUpdateTempFooterContentPage } from "../pages/memberTemplate/mTempUpdateFooterContent";


export const WebRouter = () => {
  
  return (<RouterProvider router={createHashRouter(createRoutesFromElements(
        <> 
          <Route element={<LayoutLogin />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/app" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />} />
            <Route path="cemail" element={<EmailConfigPage />} />
            <Route path="csms" element={<SMSConfigPage />} />

            <Route path="chgpass" element={<AdminChangePass />} />
            <Route path="profile" element={<AdminProfile />} />

            <Route path="cgcatg" element={<BIZGroupPage />} />
            <Route path="cmcatg" element={<BIZMainCatgPage />} />
            <Route path="cscatg" element={<BIZSubCatgPage />} />
            <Route path="cstmplt" element={<TemplatePage />} />
            <Route path="csmenu" element={<UpdateTempMenuPage />} />
            <Route path="cpubmnu" element={<PublicMenuPage />} />
            <Route path="ccominfo" element={<CompanyInfoPage />} />
            <Route path="cssques" element={<SecurityQusPage />} />
            <Route path="csubrate" element={<SubcriptionPage />} />

            <Route path="csacst" element={<AdContentSetupPage />} />
            <Route path="csadst" element={<AdDisplaySetupPage />} />
            <Route path="csadmst" element={<AdDimensionPage />} />
            <Route path="csadust" element={<AdTimePage />} />
            <Route path="csartst" element={<AdRatePage />} />
            <Route path="csaview" element={<ADViewPage />} />

            <Route path="csfaq" element={<FAQPage />} />
            <Route path="csfaqgrp" element={<FAQGroupPage />} />
            <Route path="csfback" element={<FeedbackPage />} />

            <Route path="cpmtlook" element={<PaymentLookUpPage />} />

            <Route path="cumcom" element={<KDRLUserPage />} />
            <Route path="cumind" element={<INDUserPage />} />
            <Route path="cumorg" element={<BIZUserPage />} />
            <Route path="badset" element={<BizAdvertisementPage />} />
            <Route path="bblog" element={<BizBlogPage />} />
            <Route path="dmpro" element={<SeasonalProfilePage />} />
            <Route path="dmpass" element={<SubCPInfopage />} />
            <Route path="dmsecrty" element={<SecurityPage />} />
            <Route path="dmapplctin" element={<ApplicationPage />} />
            <Route path="dmntfictin" element={<NotificationPage />} />

            <Route path="inupmem" element={<UpgradeMembershipPage />} />
            <Route path="bizpro" element={<ComProfilePage />} />
            <Route path="incp" element={<ChangePassword />} />
            <Route path="inpro" element={<IndvProfilePage />} />
            <Route path="iadtlog" element={<AuditlogInv />} />

            <Route path="badtlog" element={<AuditLogPage />} />
            <Route path="cadtlog" element={<AdminAuditLogPage />} />


            <Route path="intmpl" element={<InvTemplatePage />} />
            <Route path="ininv" element={<InvInvoicePage />} />
            <Route path="inpmt" element={<InvPaymentPage />} />
            <Route path="iadset" element={<InvAdvertisementPage />} />
            <Route path="iblog" element={<InvBlogPage />} />

            <Route path="t/:id" element={<UpdateTemplatePage />} errorElement={<NotFound />} />
            <Route path="demo/:id" element={<PreviewTemplatePage />} errorElement={<NotFound />} />


            <Route path="intheader" element={<MUpdateTempNavPage />} errorElement={<NotFound />} /> 
            <Route path="intfooter" element={<MUpdateTempFooterContentPage />} errorElement={<NotFound />} />
            <Route path="home" element={<MUpdateTempBodyPage />} errorElement={<NotFound />} />
            <Route path="about-us" element={<MUpdateTempAbtUsPage />} errorElement={<NotFound />} />
            <Route path="contact-us" element={<MUpdateTempContUsPage />} errorElement={<NotFound />} />
            <Route path="faqs" element={<MUpdateTempFAQsPage />} errorElement={<NotFound />} />
            <Route path="privacy-policy" element={<MUpdateTempPrivacyPlcPage />} errorElement={<NotFound />} />
            <Route path="termscon" element={<MUpdateTempTermsConPage />} errorElement={<NotFound />} />
            <Route path="cookies-policy" element={<MUpdateTempCookiesPlcPage />} errorElement={<NotFound />} />
            <Route path="orders" element={<MemberTempOrderPage />} errorElement={<NotFound />} />
            <Route path="reports" element={<MemberTempReportsPage />} errorElement={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route> 
        </>
      ),
        {
          basename: import.meta.env.VITE_BASE_URL
        })} />
      )};