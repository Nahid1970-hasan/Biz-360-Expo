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
import { useLocation, useNavigate } from "react-router-dom";
import { HomeSeasonalFPage } from "./seasonalFTemp/HomeSeasonalF";
import { HomeBekariPage } from "./bekariTemp/HomeBekari";
import useTitle from "../hooks/useTitle";


export const Home = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [tempReady, setTempReady] = useState(0);
    // const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = location?.pathname.split("/")[1] || "";
    const [tempInfo, setTempInfo] = useState({});

    useEffect(() => {
        setTempReady(Object.keys(profilePubData?.bodyData).length);
    }, [profilePubData?.bodyData]);

     

    useEffect(() => {
        setTempInfo(profilePubData?.basicData || {});
    }, [profilePubData?.basicData]);


    return (
        <>
            <Suspense>
                <Container>
                    {
                        tempReady > 0 ? <>
                            {
                                tempInfo?.template_url == "shopmart" && <HomeBekariPage />
                            }
                            {
                                tempInfo?.template_url == "seasonal" && <HomeSeasonalFPage />
                            }
                        </> : <Center><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                            {t('temp_not_ready_to_view')}</Typography></Center>
                    }
                </Container>
            </Suspense>
        </>

    );
};
