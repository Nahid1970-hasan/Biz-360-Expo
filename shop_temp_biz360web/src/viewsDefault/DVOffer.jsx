import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { InfoCard, ShadowCard } from "../component/style/styled_card";
import { CompProductDetailsCard } from "../features/TempContent/ProductLabelCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageNotFound } from "../pages/NotFound";
import { Flex } from "../component/style/styled_flex";
import { SizeBox } from "../component/style/styled_sizebox";
import { NotNetwork } from "../pages/NoNetwork";
import ProgressBar from "../component/ProgressBar";


export const DefaultOffersPage = () => {
    const profilePubData = useSelector((state) => state.dfprofiledata); 
    const location = useLocation();
    const nevigate = useNavigate();
    const { t, i18n } = useTranslation();
    const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = userpath.split("/")[0] || ""; 
    const [cntDataList, setCntDataList] = useState({});

    useEffect(() => {
        var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.page3 || {};
        setCntDataList(infoBodyData?.section1)
    }, [profilePubData?.bodyData]);

   
    const gotoPage = (id, section) => {
        nevigate("/p/" + username + "/products/" + section + "-" + id)
    }

    return (  
        <>
            <Suspense>
                <Container>
                    <Flex row="true">
                        <Flex md={12}> 
                            <SizeBox height="15px"/>
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                {cntDataList?.section1_title || t("offer_products")} {"( "+cntDataList?.data?.length+" Products Found )"}
                            </Typography> 
                        </Flex>
                        <Flex md={12} padding="10px 0 0 0!important">
                            <InfoCard>
                                <Flex row="true">
                                    {cntDataList?.data?.map((h, j) =>
                                        <Flex key={j} md={3}>
                                            <CompProductDetailsCard username={username} onClick={() => gotoPage(h.id, "item")} height={"200px"} src={h.url || ""} price={h.price || ""} tag={h.tag || ""} priceoff={h.priceoff || ""} label={h.label} />
                                        </Flex>)}

                                </Flex>
                            </InfoCard>
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
