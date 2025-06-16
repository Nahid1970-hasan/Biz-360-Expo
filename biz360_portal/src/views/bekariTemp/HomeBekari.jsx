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


export const HomeBekariPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const location = useLocation();
    const nevigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [tempReady, setTempReady] = useState(0);
   // const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = location?.pathname.split("/")[1] || "";
    const [section1data, setSection1Data] = useState({});
    const [section2data, setSection2Data] = useState({});
    const [section3data, setSection3Data] = useState({});
    const [section4data, setSection4Data] = useState({});
    const [section5data, setSection5Data] = useState({});
    const [section6data, setSection6Data] = useState({});
    const [section7data, setSection7Data] = useState({});

    useEffect(() => {
        var infoBodyData = profilePubData?.bodyData || {};
        setTempReady(Object.keys(profilePubData?.bodyData).length)
        setSection1Data(JSON.parse(infoBodyData?.section1 || "{}"));
        setSection2Data(JSON.parse(infoBodyData?.section2 || "{}"));
        setSection3Data(JSON.parse(infoBodyData?.section3 || "{}"));
        setSection4Data(JSON.parse(infoBodyData?.section4 || "{}"));
        setSection5Data(JSON.parse(infoBodyData?.section5 || "{}"));
        setSection6Data(JSON.parse(infoBodyData?.section6 || "{}"));
        setSection7Data(JSON.parse(infoBodyData?.section7 || "{}"));
    }, [profilePubData?.bodyData]);

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }
    const bannerDataList = section1data?.image_list?.filter((d) => d.visible == "yes");

    const catDataList = section2data?.image_list?.filter((d) => d.visible == "yes");
    const pTrndyDataList = section4data?.image_list?.filter((d) => d.visible == "yes");
    const brandDataList = section7data?.image_list?.filter((d) => d.visible == "yes");
    const colcDataList = section5data?.image_list?.filter((d) => d.visible == "yes")?.map((b)=>({...b, datalist: pTrndyDataList?.filter((h)=>h.sector_id==b.id) }));
  
    const gotoPage = (id, section) => {
        nevigate( "/"+username + "/products/" + section + "-" + id)
    }
 
    return (
        <>
            <Suspense>
                <Container>
                    {
                        tempReady > 0 ? <>
                            <Flex row="true">
                                <Flex md={12}>
                                    <CompBannerSection height="400px" bannerData={bannerDataList || []} slideLabel={false} />
                                </Flex>
                            </Flex>
                            <Flex row="true">
                                <Flex md={12}>
                                    <ShadowCard>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {section2data?.section2_title || t("browse_by_category")}
                                        </Typography>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <CompBannerSection height="150px" onClick={true} username={username} section={"category"} bannerData={catDataList || []} responsive={catResponsive} labelsize="lg" />
                                </Flex>
                            </Flex>
                            <SizeBox height="20px" />
                            <Flex row="True">
                                {
                                    section3data?.image_list?.map((d, i) =>
                                        <Flex md={4} key={i}>
                                            <InfoCard>  <KDImg noborder="true" height={"200px"} width={"100%"} src={d.url || ""}></KDImg></InfoCard>
                                        </Flex>)
                                }
                            </Flex>
                            <SizeBox height="20px" />
                            {colcDataList?.map((d, i) => d?.datalist?.length?
                            <div key={i}>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <ShadowCard>
                                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                                {d?.collection_title || t("section_title")}
                                            </Typography>
                                        </ShadowCard>
                                    </Flex>
                                    <Flex md={12} padding="10px 0 0 0!important">
                                        <InfoCard>
                                            <Flex row="true">
                                                {d?.datalist?.map((h, j) =>
                                                    <Flex key={i+"_"+j} md={3}>
                                                        <CompProductDetailsCard username={username} onClick={() => gotoPage(h.id, "item")} height={"200px"} src={h.url || ""} price={h.price || ""} tag={h.tag || ""} priceoff={h.priceoff || ""} label={h.label} />
                                                    </Flex>)}

                                            </Flex>
                                        </InfoCard>
                                    </Flex>
                                </Flex>

                                <SizeBox />
                            </div>:<div key={i}/>)}

                            <Flex row="true">
                                <Flex md={12}>
                                    <ShadowCard> <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section7data?.section7_title || t("popular_brands")}
                                    </Typography></ShadowCard>
                                </Flex>
                                <Flex md={12}>
                                    <CompBannerSection onClick={true} username={username} section={"brand"} bannerData={brandDataList || []} responsive={catResponsive} labelsize="md" />
                                </Flex>
                            </Flex>
                        </> : <Center><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                            {t('temp_not_ready_to_view')}</Typography></Center>
                    }
                </Container>
            </Suspense>
        </>

    );
};
