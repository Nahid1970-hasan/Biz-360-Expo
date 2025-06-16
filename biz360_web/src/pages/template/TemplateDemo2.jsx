import { Suspense, useState } from "react";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { ActiveButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ULine, UnderLine } from "../../component/style/styled_uline";
import { SizeBox } from "../../component/style/styled_sizebox";
import { UpdateTempBasicInfoPage } from "./UpdateTemBasicInfo";
import { UpdateTempContentInfoPage } from "./UpdateTempContentInfo";
import { UpdateTempBodyContentPage } from "./UpdateTempBodyContent";
import { UpdateTempAbtContentPage } from "./UpdateTempAbtContent";
import { UpdateTempContactContentPage } from "./UpdateTempContactContent";
import { UpdateTempBodyOfferPage } from "./UpdateTempOfferContent";
import { UpdateTempFAQsPage } from "./SetupTempFaqs";
import { UpdateTempTermsConPage } from "./SetupTempTermsCon";
import { UpdateTempCookiesPlcPage } from "./setupTempCookiesPlc";
import { UpdateTempPrivacyPlcPage } from "./SetupTempPrivacyPlc";
import { useTranslation } from "react-i18next";


export const UpdateDemo2TemplatePage = () => {
    const [url_active, set_url_active] = useState("basic");
    const { t, i18n } = useTranslation();
    function onTabClick(url) {
        set_url_active(url);
    }

    return (<>
        <Suspense>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    <InfoCard>
                        <CardHeaderButton start={'start'}>
                            <div>
                                <ActiveButton height="40px" active={url_active == "basic" ? "true" : null} color="secondaryButton" type="button" onClick={() => onTabClick("basic")}>
                                    {t('basic_info')}
                                </ActiveButton>
                                {url_active == "basic" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "hfcontent" ? "true" : null} type="button" onClick={() => onTabClick("hfcontent")}>
                                    {t('header_footer')}
                                </ActiveButton>
                                {url_active == "hfcontent" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "bdcontent" ? "true" : null} type="button" onClick={() => onTabClick("bdcontent")}>
                                    {t('home')}
                                </ActiveButton>
                                {url_active == "bdcontent" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "aboutus" ? "true" : null} type="button" onClick={() => onTabClick("aboutus")}>
                                    {t('about_us')}
                                </ActiveButton>
                                {url_active == "aboutus" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "contactus" ? "true" : null} type="button" onClick={() => onTabClick("contactus")}>
                                    {t('contact_us')}
                                </ActiveButton>
                                {url_active == "contactus" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "offers" ? "true" : null} type="button" onClick={() => onTabClick("offers")}>
                                    {t('offers')}
                                </ActiveButton>
                                {url_active == "offers" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "faqs" ? "true" : null} type="button" onClick={() => onTabClick("faqs")}>
                                    {t('faqs')}
                                </ActiveButton>
                                {url_active == "faqs" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "terms_condition" ? "true" : null} type="button" onClick={() => onTabClick("terms_condition")}>
                                    {t('terms_condition')}
                                </ActiveButton>
                                {url_active == "terms_condition" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "privacy_policy" ? "true" : null} type="button" onClick={() => onTabClick("privacy_policy")}>
                                    {t('privacy_policy')}
                                </ActiveButton>
                                {url_active == "privacy_policy" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "cookies_policy" ? "true" : null} type="button" onClick={() => onTabClick("cookies_policy")}>
                                    {t('cookies_policy')}
                                </ActiveButton>
                                {url_active == "cookies_policy" && <UnderLine />}
                            </div>
                        </CardHeaderButton>
                    </InfoCard>
                </Flex>
                <Flex padding="0 !important" md={12} sm={12} xs={12}><ULine /></Flex>
                <SizeBox />
            </Flex>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    {url_active == "basic" ? <UpdateTempBasicInfoPage /> : <></>}
                    {url_active == "hfcontent" ? <UpdateTempContentInfoPage /> : <></>}
                    {url_active == "bdcontent" ? <UpdateTempBodyContentPage /> : <></>}
                    {url_active == "aboutus" ? <UpdateTempAbtContentPage /> : <></>}
                    {url_active == "contactus" ? <UpdateTempContactContentPage /> : <></>}
                    {url_active == "offers" ? <UpdateTempBodyOfferPage /> : <></>}
                    {url_active == "faqs" ? <UpdateTempFAQsPage /> : <></>}
                    {url_active == "terms_condition" ? <UpdateTempTermsConPage /> : <></>}
                    {url_active == "privacy_policy" ? <UpdateTempPrivacyPlcPage /> : <></>}
                    {url_active == "cookies_policy" ? <UpdateTempCookiesPlcPage /> : <></>}
                </Flex>
            </Flex>
        </Suspense>
    </>)
}