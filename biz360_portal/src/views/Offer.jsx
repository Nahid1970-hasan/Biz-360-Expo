import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { loadPubProductListData } from "../features/pubprofile/pub_product_slice";


export const UserOffersPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const [offerData, setOfferData] = useState({});
    const location = useLocation();
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
   // const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = location?.pathname?.split("/")[1] || "";
    const [tempReady, setTempReady] = useState(0);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [invalidPage, setInvalidPage] = useState(true);

    useEffect(() => {
        var infoBodyData = profilePubData?.bodyData || {};
        setTempReady(Object.keys(profilePubData?.bodyData).length);
        setOfferData(JSON.parse(infoBodyData?.section4 || "{}"));
    }, [profilePubData?.bodyData]);

    const offerDataList = offerData?.image_list?.filter((d) => !!d.tag);

    const gotoPage = (id, section) => {
        nevigate("/" + username + "/products/" + section + "-" + id)
    }

    useEffect(() => {
        window.scrollTo(0, 0); 
        var isvalid = !!(profilePubData?.pageList?.find((d) => d == location.pathname) || "");
        setInvalidPage(!isvalid); 
    }, [location.pathname]);

    return (tempReady < 1 ? <PageNotFound /> : invalidPage ? <PageNotFound />  : isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <Flex row="true">
                        <Flex md={12}>
                            <SizeBox height="15px" />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                {t("offers")} {"( " + offerDataList?.length + " Products Found )"}
                            </Typography>
                        </Flex>
                        <Flex md={12} padding="10px 0 0 0!important">
                            <InfoCard>
                                <Flex row="true">
                                    {offerDataList?.map((h, j) =>
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
