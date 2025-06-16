import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../component/style/styled_typography";
import { Container } from "../../component/style/styled_contrainer";
import { Center } from "../../component/style/styled_center";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { Flex } from "../../component/style/styled_flex";
import { InfoCard, ShadowCard } from "../../component/style/styled_card";
import { Button, PrimaryButton } from "../../component/style/styled_button";
import { KDImg } from "../../component/style/styled_img";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { CompBannerSection } from "../../features/TempContent/BannerSection";
import { CompProductDetailsCard } from "../../features/TempContent/ProductLabelCard";
import { useTranslation } from "react-i18next";
import { SizeBox } from "../../component/style/styled_sizebox";
import { useLocation, useNavigate } from "react-router-dom";
import { SeasonalItemDetailsCard } from "./SeasonalFItemDetailsCard";
import useMediaQuery from "../../component/MediaQuery";
import { CompProductCard } from "../../features/TempContent/ProductCard";


export const HomeSeasonalFPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const custTempOrder = useSelector((state) => state.custOrderData);
    const location = useLocation();
    const nevigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [tempReady, setTempReady] = useState(0);
    const isMobile = useMediaQuery("(max-width: 768px)");
    // const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = location?.pathname.split("/")[1] || "";
    const [section1data, setSection1Data] = useState({});
    const [section2data, setSection2Data] = useState({});
    const [section3data, setSection3Data] = useState({});
    const [section8data, setSection8Data] = useState({});
    const [section9data, setSection9Data] = useState({});

    useEffect(() => {
        var infoBodyData = profilePubData?.bodyData || {};
        setTempReady(Object.keys(profilePubData?.bodyData).length)
        setSection1Data(JSON.parse(infoBodyData?.section1 || "{}"));
        setSection2Data(JSON.parse(infoBodyData?.section2 || "{}"));
        setSection3Data(JSON.parse(infoBodyData?.section3 || "{}"));
        setSection8Data(JSON.parse(infoBodyData?.section8 || "{}"));
        setSection9Data(JSON.parse(infoBodyData?.section9 || "{}"));
    }, [profilePubData?.bodyData]);

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }
    const bannerDataList = section1data?.image_list?.filter((d) => d.visible == "yes");
    const catDataList = section2data?.image_list?.filter((d) => d.visible == "yes");
    const colcDataList = section9data?.image_list?.filter((d) => d.visible == "yes");

    const gotoPage = (id, section) => {
        nevigate("/" + username + "/products/" + section + "-" + id)
    }

    return (
        <>
            <Suspense>

                {
                    tempReady > 0 ? <>
                        {bannerDataList?.length > 0 ? <Flex row="true">

                            <Flex md={12}>
                                <CompBannerSection height={isMobile ? "180px" : "300px"} bannerData={bannerDataList || []} slideLabel={false} />
                            </Flex>

                        </Flex> : <></>}
                        {catDataList?.length > 0 ? <Flex row="true">
                            <Flex md={12} padding="0 10px 10px 10px !important">
                                <ShadowCard background="homeinfo">
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section2data?.section2_title || t("browse_by_category")}
                                    </Typography>
                                </ShadowCard>
                            </Flex>
                            <ShadowCard>
                                <Flex md={12} padding="0!important">
                                    {isMobile ? catDataList.length > 1 : catDataList.length > 6 ?
                                        <CompBannerSection height="150px" onClick={true} username={username} section={"category"} bannerData={catDataList || []} responsive={catResponsive} labelsize="lg" />
                                        : <Flex row="row">
                                            {
                                                catDataList?.map((slideImage, index) =>
                                                    <Flex md={2} sm={4} xs={6} key={index}>
                                                        <CompProductCard height="150px" onClick={() => gotoPage(slideImage.id, "category")} src={slideImage.url || ""} label={slideImage.label || ""} size={"lg"} />
                                                    </Flex>)
                                            }
                                        </Flex>}
                                </Flex>
                            </ShadowCard>

                        </Flex>
                            : <></>}
                        <SizeBox  />
                        <Flex row="True">
                            <Flex md={12} padding="0 10px 10px 10px !important">
                                <ShadowCard background="homeinfo">
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {t("exclusive_offer")}
                                    </Typography>
                                </ShadowCard>
                            </Flex>
                            <ShadowCard>
                                <Flex row="row">
                                    {
                                        section3data?.image_list?.map((d, i) =>
                                            <Flex md={4} key={i}>
                                                <InfoCard>  <KDImg noborder="true" height={"200px"} width={"100%"} src={d.url || ""}></KDImg></InfoCard>
                                            </Flex>)
                                    }
                                </Flex>

                            </ShadowCard>

                        </Flex>
                        <SizeBox />
                        {colcDataList?.length > 0 ? <Flex row="true">
                            <Flex md={12} padding="0 10px 10px 10px !important">
                                <ShadowCard background="homeinfo">
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {colcDataList?.section9_title || t("product_package")}
                                    </Typography>
                                </ShadowCard>
                            </Flex>
                            <ShadowCard>
                            <Flex md={12} padding="10px 0 0 0!important">
                                <InfoCard>
                                    <Flex row="true">
                                        {colcDataList?.map((d, j) =>
                                            <Flex key={j} md={3}>
                                                <SeasonalItemDetailsCard username={username} onClick={() => gotoPage(d.id, "item")} height={"200px"} src={d.url || ""} size="sm" data={d} />
                                            </Flex>)}

                                    </Flex>
                                </InfoCard>
                            </Flex>
                            </ShadowCard>
                            
                        </Flex> : <></>}

<SizeBox/>
                    </> : <Center><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                        {t('temp_not_ready_to_view')}</Typography></Center>
                }


            </Suspense>
        </>

    );
};
