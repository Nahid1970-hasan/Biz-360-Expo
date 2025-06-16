import { createRoutesFromElements, Route, RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";

import { LayoutHome } from "../layout/layout_home";
import { MemberNotFound, NotFound, PageNotFound } from "../pages/NotFound";
import { HomePage } from "../pages/Homepage";
import { Home } from "../views/Home";
import { LayoutTemp } from "../layout/layout_temp";
import { UserAboutPage } from "../views/About";
import { UserContactPage } from "../views/Contact";
import { AboutUsPage } from "../pages/AboutUs";
import { PricingPage } from "../pages/Pricing";
import { Top20sPage } from "../pages/Top20s";
import { DemoMemberPage } from "../pages/DemoPage";
import { LayoutDefaultTemp } from "../layout/layout_default_layout";
import { DefaultHome } from "../viewsDefault/DVHome";
import { DefaultAboutPage } from "../viewsDefault/DVAbout";
import { DefaultContactPage } from "../viewsDefault/DVContact";
import { UserSkillPage } from "../views/Skill";
import { UserTermsConditionsPage } from "../views/TermsConditions";
import { UserFAQsPage } from "../views/Faqs";
import { UserPrivacyPolicyPage } from "../views/PrivacyPolicy";
import { DefaultSkillPage } from "../viewsDefault/DVSkill";
import { DefaultTermsConditionsPage } from "../viewsDefault/DVTermsConditions";
import { DefaultFAQsPage } from "../viewsDefault/DVFaqs";
import { DefaultPrivacyPolicyPage } from "../viewsDefault/DVPrivacyPolicy";
import { ItemDetailsInfoPage } from "../views/ItemDetailsInfo";
import { UserOffersPage } from "../views/Offer";
import { UserCookiesPolicyPage } from "../views/CookiesPolicy";
import { DefaultOffersPage } from "../viewsDefault/DVOffer";
import { DefaultItemDetailsPage } from "../viewsDefault/DVItemDetailsInfo";
import { DefaultCookiesPolicyPage } from "../viewsDefault/DVCookiesPolicy";
import { FooterFeedback } from "../pages/FooterFeedback";
import { DifferentPlatfrom } from "../pages/DifferentPlatfrom";
import { BizIdentityPage } from "../pages/BizIdentity";
import { CopyrightPage } from "../pages/CopyRight";
import { CoreValue } from "../pages/CoreValue";
import { DisclaimerStatement } from "../pages/DisclaimerStatement";
import { ViewDemoPage } from "../pages/ViewDemo";
import { GetInTouchPage } from "../pages/GetInTouch";
import { TermsPage } from "../pages/TermsCondition";
import { PrivacyPage } from "../pages/Privacy";
import { Membership } from "../pages/MemberPage";
import { PubFaqPage } from "../pages/PubFaq";
import { UserOrderPage } from "../views/seasonalFTemp/Order";
import { PricingDemoPage } from "../pages/PricingDemo";
import { SiteMappage } from "../pages/SiteMap";
import { MemberSignup } from "../pages/MemberSignup";
import { MembershipStep5Page } from "../pages/MembershipStep5";

export const WebRouterTemp = () => {
 
  return (<RouterProvider router={createHashRouter(createRoutesFromElements(
    <>
      <Route element={<LayoutHome />}>
        <Route path="/" element={<HomePage />} />  
        <Route path="/pabout" element={<AboutUsPage />} />
        <Route path="/ppricing" element={<PricingDemoPage />} />
        <Route path="/dpricing" element={<PricingPage />} />
        <Route path="/ptop20" element={<Top20sPage />} />
        <Route path="/pmember" element={<DemoMemberPage />} />
        <Route path="/memsup" element={<Membership />} />
        <Route path="/pmemsup" element={<MemberSignup />} />
        <Route path="/ftfeedback" element={<FooterFeedback />} />
        <Route path="/difplatfrm" element={<DifferentPlatfrom />} />
        <Route path="/identitybiz" element={<BizIdentityPage />} />
        <Route path="/cpyright" element={<CopyrightPage />} />
        <Route path="/crvalue" element={<CoreValue />} />
        <Route path="/pfaq" element={<PubFaqPage />} />
        <Route path="/disclmrst" element={<DisclaimerStatement />} />
        <Route path="/viwdemo" element={<ViewDemoPage />} />
        <Route path="/pgintch" element={<GetInTouchPage />} />
        <Route path="/termcond" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/bizperpose" element={<MembershipStep5Page />} />
        <Route path="/sitemap" element={<SiteMappage/>} />  
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/:username" element={<LayoutTemp />} errorElement={<MemberNotFound />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about-us" element={<UserAboutPage />} />
        <Route path="contact-us" element={<UserContactPage />} />
        <Route path="offers" element={<UserOffersPage />} />
        <Route path="orders" element={<UserOrderPage />} />
        <Route path="products" element={<MemberNotFound msg={"Products Not Found"} />} />
        <Route path="products/:id" element={<ItemDetailsInfoPage />} errorElement={<MemberNotFound msg={"Products Not Found"} />} />
        <Route path="skill-page" element={<UserSkillPage />} />
        <Route path="termscon" element={<UserTermsConditionsPage />} />
        <Route path="faqs" element={<UserFAQsPage />} />
        <Route path="privacy-policy" element={<UserPrivacyPolicyPage />} />
        <Route path="cookies-policy" element={<UserCookiesPolicyPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="d/:id" element={<LayoutDefaultTemp />} errorElement={<PageNotFound />}>
        <Route index element={<DefaultHome />} />
        <Route path="home" element={<DefaultHome />} />
        <Route path="about-us" element={<DefaultAboutPage />} />
        <Route path="contact-us" element={<DefaultContactPage />} />
        <Route path="skill-page" element={<DefaultSkillPage />} />
        <Route path="products/:id" element={<DefaultItemDetailsPage />} />
        <Route path="termscon" element={<DefaultTermsConditionsPage />} />
        <Route path="faqs" element={<DefaultFAQsPage />} />
        <Route path="privacy-policy" element={<DefaultPrivacyPolicyPage />} />
        <Route path="cookies-policy" element={<DefaultCookiesPolicyPage />} />
        <Route path="offers" element={<DefaultOffersPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route> 
    </>
  ),
    {
      basename: import.meta.env.VITE_BASE_URL
    })} />)
};