import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { Flex } from "../component/style/styled_flex";
import { InfoCard, ShadowCard } from "../component/style/styled_card";
import { Button, PrimaryButton } from "../component/style/styled_button";
import { KDImg } from "../component/style/styled_img";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { CompBannerSection } from "../features/TempContent/BannerSection";
import { CompProductDetailsCard } from "../features/TempContent/ProductLabelCard";
import { useTranslation } from "react-i18next";
import { SizeBox } from "../component/style/styled_sizebox";


export const DefaultHome = () => {
    const profilePubData = useSelector((state) => state.dfprofiledata);
    const { t, i18n } = useTranslation();
    const [tempReady, setTempReady] = useState(0);

    const [section1data, setSection1Data] = useState({});
    const [section2data, setSection2Data] = useState({});
    const [section3data, setSection3Data] = useState({});
    const [section4data, setSection4Data] = useState({});
    const [sectio5data, setSection5Data] = useState({});
    const [section6data, setSection6Data] = useState({});
    const [section7data, setSection7Data] = useState({});

    useEffect(() => {
        var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.home || {}; 
        setTempReady(Object.keys(infoBodyData).length)
        setSection1Data(infoBodyData?.section1 || {});
        setSection2Data(infoBodyData?.section2 || {});
        setSection3Data(infoBodyData?.section3 || {});
        setSection4Data(infoBodyData?.section4 || {});
        setSection5Data(infoBodyData?.section5 || {});
        setSection6Data(infoBodyData?.section6 || {});
        setSection7Data(infoBodyData?.section7 || {});
    }, [profilePubData?.bodyData]);

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }

    return (
        <>
            <Suspense>
                <Container>
                   {
                    tempReady>0?<>
                     <Flex row="true">
                        <Flex md={12}>
                            <CompBannerSection height="400px" bannerData={section1data?.data || []} slideLabel={false} />
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
                            <CompBannerSection height="150px" bannerData={section2data?.data || []} responsive={catResponsive} labelsize="lg" />
                        </Flex>
                    </Flex>
                    <SizeBox />
                    <Flex row="True">
                        {
                            section3data?.data?.map((d, i) =>
                                <Flex md={4} key={i}>
                                    <InfoCard>  <KDImg noborder="true" height={"200px"} width={"100%"} src={d.url || ""}></KDImg></InfoCard>
                                </Flex>)
                        }
                    </Flex>
                    <Flex row="true">
                        <Flex md={12}>
                            <ShadowCard><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                {section4data?.section4_title || t("trandy_collection_title")}
                            </Typography></ShadowCard>
                        </Flex>
                        <Flex md={12} padding="10px 0 0 0!important">
                            <InfoCard>
                                <Flex row="true">
                                    {section4data?.data?.map((d, i) =>
                                        <Flex key={i} md={3}>
                                            <CompProductDetailsCard height={"200px"} src={d.url || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                        </Flex>)}
                                </Flex>
                            </InfoCard>
                        </Flex>
                    </Flex>
                    <SizeBox />
                    <Flex row="true">
                        <Flex md={12}>
                            <ShadowCard>
                                <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                {sectio5data?.section5_title || t("most_popular_title")}
                            </Typography></ShadowCard>
                        </Flex>
                        <Flex md={12} padding="10px 0 0 0!important">
                            <InfoCard>
                                <Flex row="true">
                                    {sectio5data?.data?.map((d, i) =>
                                        <Flex key={i} md={3}>
                                            <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                        </Flex>)}
                                </Flex>
                            </InfoCard>
                        </Flex>
                    </Flex>
                    <SizeBox />
                    {
                        section6data?.data.length>0? <Flex row="true">
                        <Flex md={12}>
                          <ShadowCard>  <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                {section6data?.section6_title || t("flash_sale_title")}
                            </Typography></ShadowCard>
                        </Flex>
                        <Flex md={12} padding="10px 0 0 0!important">
                            <InfoCard>
                                <Flex row="true">
                                    {section6data?.data?.map((d, i) =>
                                        <Flex key={i} md={3}>
                                            <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                        </Flex>)}
                                </Flex>
                            </InfoCard>
                        </Flex>
                    </Flex>:<></>
                    }
                   
                    <SizeBox />
                    {
                         section7data?.data?.length>0? <Flex row="true">
                          <Flex md={12}>
                             <ShadowCard> <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                  {section7data?.section7_title || t("popular_brands")}
                              </Typography></ShadowCard>
                          </Flex>
                          <Flex md={12}>
                              <CompBannerSection bannerData={section7data?.data || []} responsive={catResponsive} labelsize="md" />
                          </Flex>
                      </Flex>:<></>
                    }
                    </>:<Center><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                    {t('temp_not_ready_to_view')}</Typography></Center>
                   }
                </Container>
            </Suspense>
        </>

    );
};
