import { useSelector } from "react-redux";
import { Typography } from "../../component/style/styled_typography"
import { Suspense, useEffect, useState } from "react";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { useTranslation } from "react-i18next";
import { KDImg } from "../../component/style/styled_img";
import { InfoCard, ShadowCard } from "../../component/style/styled_card";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { PrimaryButton } from "../../component/style/styled_button";
import { CompBannerSection } from "../../component/TempContent/BannerSection";
import { CompProductDetailsCard } from "../../component/TempContent/ProductLabelCard";
import { SetupTempBDCSC2Modal } from "./SetupTempBDCSC2Modal";

export const UpdateTemp2BodyContent = () => {
    const admTempData = useSelector((state) => state.admupdatetempdata);

    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");
    const [bannerData, setBannerData] = useState([]);
    const [section2data, setSection2Data] = useState({});
    const [section3data, setSection3Data] = useState({});
    const [section4data, setSection4Data] = useState({});
    const [sectio5data, setSection5Data] = useState({});
    const [section6data, setSection6Data] = useState({});
    const [section7data, setSection7Data] = useState({});

    const [section1Open, setSection1Open] = useState(false);

    const { t } = useTranslation();
    useEffect(() => {
        var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.home || {};
        setBannerData(infoBodyData?.section1?.data || []);
        setSection2Data(infoBodyData?.section2 || {});
        setSection3Data(infoBodyData?.section3 || {});
        setSection4Data(infoBodyData?.section4 || {});
        setSection5Data(infoBodyData?.section5 || {});
        setSection6Data(infoBodyData?.section6 || {});
        setSection7Data(infoBodyData?.section7 || {});
    }, [admTempData]);

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }
    return (<>
        <Suspense>
            <Flex row="true">
                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <Flex row="row">
                            <Flex md={6} padding="0!important">
                            <InlineDiv>
                            <Label>{t("section_1", { lng: menuLang })} {"(" + t("content_section") + ")"}</Label>
                           
                        </InlineDiv>
                            </Flex>
                            <Flex md={6} padding="0!important">
                            <InlineDiv>
                            <Label>{t("section_1", { lng: menuLang })} {"(" + t("banner_section") + ")"}</Label>
                            <PrimaryButton onClick={() => { setSection1Open(true) }}>{t("update")}</PrimaryButton>
                        </InlineDiv>
                            </Flex>
                        </Flex>
                        
                    </InfoCard>
                </Flex>
                <Flex md={6} padding="5px 5px!important">
                    <ShadowCard>
                        <InfoCard>
                            <Typography> {t("content")}</Typography>
                            {/* <CompBannerSection height="400px" bannerData={bannerData} slideLabel={false} /> */}
                        </InfoCard>
                    </ShadowCard>
                </Flex>
                <Flex md={6} padding="5px 5px!important">
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="True">
                                {
                                    section3data?.data?.map((d, i) =>
                                        <Flex md={4} key={i}>
                                            <KDImg noborder="true" height={"250px"} width={"100%"} src={d.url || ""}></KDImg>
                                        </Flex>)
                                }
                            </Flex>                        </InfoCard>
                    </ShadowCard>
                </Flex>
                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_2", { lng: menuLang })} {"(" + t("category_filter_section") + ")"}</Label>
                        </InlineDiv>
                    </InfoCard>

                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="true">
                                <Flex md={12}>
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section2data?.section2_title || t("browse_by_category")}
                                    </Typography>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <CompBannerSection height="150px" bannerData={section2data?.data || []} responsive={catResponsive} labelsize="lg" />
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>
                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_3", { lng: menuLang })} {"(" + t("exclusive_image_section") + ")"}</Label>
                        </InlineDiv>
                    </InfoCard>
                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="True">
                                {
                                    section3data?.data?.map((d, i) =>
                                        <Flex md={4} key={i}>
                                            <KDImg noborder="true" height={"250px"} width={"100%"} src={d.url || ""}></KDImg>
                                        </Flex>)
                                }
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>
                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_4", { lng: menuLang })} {"(" + t("trandy_collection_section") + ")"}</Label>
                        </InlineDiv>
                    </InfoCard>

                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="true">
                                <Flex md={12}>
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section4data?.section4_title || t("trandy_collection_title")}
                                    </Typography>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <Flex row="true">
                                        {section4data?.data?.map((d, i) =>
                                            <Flex key={i} md={3}>
                                                <CompProductDetailsCard height={"200px"} src={d.url || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                            </Flex>)}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>
                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_5", { lng: menuLang })} {"(" + t("most_popular_section") + ")"}</Label>
                        </InlineDiv>
                    </InfoCard>

                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="true">
                                <Flex md={12}>
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {sectio5data?.section5_title || t("most_popular_title")}
                                    </Typography>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <Flex row="true">
                                        {sectio5data?.data?.map((d, i) =>
                                            <Flex key={i} md={3}>
                                                <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                            </Flex>)}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>

                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_6", { lng: menuLang })} {"(" + t("flash_sale") + ")"}</Label>
                        </InlineDiv>
                    </InfoCard>

                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="true">
                                <Flex md={12}>
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section6data?.section6_title || t("most_popular_title")}
                                    </Typography>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <Flex row="true">
                                        {section6data?.data?.map((d, i) =>
                                            <Flex key={i} md={3}>
                                                <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                            </Flex>)}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>

                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_7", { lng: menuLang })} {"(" + t("popular_brands") + ")"}</Label>
                        </InlineDiv>
                    </InfoCard>

                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="true">
                                <Flex md={12}>
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section7data?.section7_title || t("popular_brands")}
                                    </Typography>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <CompBannerSection bannerData={section7data?.data || []} responsive={catResponsive} labelsize="md" />
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>
            </Flex>
        </Suspense>
        <SetupTempBDCSC2Modal open={section1Open} setOpen={setSection1Open} data={{}} />
    </>)
}