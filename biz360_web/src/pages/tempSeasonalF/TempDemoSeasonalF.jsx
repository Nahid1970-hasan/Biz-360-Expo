import { Suspense, useState } from "react";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { ActiveButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ULine, UnderLine } from "../../component/style/styled_uline";
import { SizeBox } from "../../component/style/styled_sizebox";

import { useTranslation } from "react-i18next";
import { UpdateTempSeasonalFBasicInfoPage } from "./UpdateTempSeasonalFBasicInfo";
import { UpdateTempSeosonalHFPage } from "./UpdateTempSeasonalHF";
import { UpdateTempSeasonalFBDCPage } from "./UpdateTempSeasonalFBDC";
import { UpdateTempSeasonalFTCPage } from "./UpdateTempSeasonalFTC";
import { UpdateSeasonalTempPPPage } from "./UpdateTempSeasonalFPP";
import { UpdateTempSeasonalFCPlcPage } from "./UpdateTempSeasonalFCPLC";
import { UpdateTempSeasonalFFAQsPage } from "./UpdateTempSeasonalFFAQs";
import { UpdateTempSeasonalFOfferPage } from "./UpdateTempSeasonalFOffer";
import { UpdateTempSeasonalFAbtPage } from "./UpdateTempSeasonalFAbt";
import { UpdateTempSeasonalFContPage } from "./UpdateTempSeasonalFCont";

export const UpdateSeasonalFTempPage = () => {
    const [url_active, set_url_active] = useState("basic");
    const { t, i18n } = useTranslation();
    function onTabClick(url) {
        set_url_active(url);
    }

    return (<>
        <Suspense>
            <Flex row={"true"}>
                <Flex padding="0 5px 0 0 !important" md={3} sm={4} xs={12}>
                    <InfoCard height="88vh">
                        <div>
                            <ActiveButton height="40px" full="full" active={url_active == "basic" ? "true" : null} color="secondaryButton" type="button" onClick={() => onTabClick("basic")}>
                                {t('basic_info')}
                            </ActiveButton>
                            {url_active == "basic" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "hfcontent" ? "true" : null} type="button" onClick={() => onTabClick("hfcontent")}>
                                {t('header_footer')}
                            </ActiveButton>
                            {url_active == "hfcontent" && <UnderLine />}
                        </div>
                        <div >
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "bdcontent" ? "true" : null} type="button" onClick={() => onTabClick("bdcontent")}>
                                {t('home')}
                            </ActiveButton>
                            {url_active == "bdcontent" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "aboutus" ? "true" : null} type="button" onClick={() => onTabClick("aboutus")}>
                                {t('about_us')}
                            </ActiveButton>
                            {url_active == "aboutus" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "contactus" ? "true" : null} type="button" onClick={() => onTabClick("contactus")}>
                                {t('contact_us')}
                            </ActiveButton>
                            {url_active == "contactus" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "offers" ? "true" : null} type="button" onClick={() => onTabClick("offers")}>
                                {t('offers')}
                            </ActiveButton>
                            {url_active == "offers" && <UnderLine />}
                        </div>

                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "faqs" ? "true" : null} type="button" onClick={() => onTabClick("faqs")}>
                                {t('faqs')}
                            </ActiveButton>
                            {url_active == "faqs" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "terms_condition" ? "true" : null} type="button" onClick={() => onTabClick("terms_condition")}>
                                {t('terms_condition')}
                            </ActiveButton>
                            {url_active == "terms_condition" && <UnderLine />}
                        </div>

                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "privacy_policy" ? "true" : null} type="button" onClick={() => onTabClick("privacy_policy")}>
                                {t('privacy_policy')}
                            </ActiveButton>
                            {url_active == "privacy_policy" && <UnderLine />}
                        </div>

                        <div>
                            <ActiveButton height="40px" full="full" color="secondaryButton" active={url_active == "cookies_policy" ? "true" : null} type="button" onClick={() => onTabClick("cookies_policy")}>
                                {t('cookies_policy')}
                            </ActiveButton>
                            {url_active == "cookies_policy" && <UnderLine />}
                        </div>

                    </InfoCard>
                </Flex>
                <Flex padding="0 0 0 5px !important" md={9} sm={8} xs={12}>
                    <InfoCard height="88vh">
                        {url_active == "basic" ? <UpdateTempSeasonalFBasicInfoPage /> : <></>}
                        {url_active == "hfcontent" ? <UpdateTempSeosonalHFPage /> : <></>}
                        {url_active == "bdcontent" ? <UpdateTempSeasonalFBDCPage /> : <></>}
                        {url_active == "aboutus" ? <UpdateTempSeasonalFAbtPage /> : <></>}
                        {url_active == "contactus" ? <UpdateTempSeasonalFContPage /> : <></>}
                        {url_active == "terms_condition" ? <UpdateTempSeasonalFTCPage /> : <></>}
                        {url_active == "privacy_policy" ? <UpdateSeasonalTempPPPage /> : <></>}
                        {url_active == "cookies_policy" ? <UpdateTempSeasonalFCPlcPage /> : <></>}
                        {url_active == "faqs" ? <UpdateTempSeasonalFFAQsPage /> : <></>}
                        {url_active == "offers" ? <UpdateTempSeasonalFOfferPage /> : <></>}
                    </InfoCard> 
                </Flex>
            </Flex>
        </Suspense>
    </>)
}