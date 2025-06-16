import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { useLocation } from "react-router-dom";
import { Flex } from "../component/style/styled_flex";
import { SizeBox } from "../component/style/styled_sizebox";
import { Frame } from "../component/style/styled_iframe";
import { useTranslation } from "react-i18next";
import { loadPubProductListData } from "../features/pubprofile/pub_product_slice";
import { Loading } from "../component/Loading";
import { NotNetwork } from "../pages/NoNetwork";
import ProgressBar from "../component/ProgressBar";
import { PageNotFound } from "../pages/NotFound";


export const UserContactPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const prdtPubData = useSelector((state) => state.pubproductdata);
    const [basicInfo, setBasicInfo] = useState("");
    const user = useSelector((state) => state.user);
    const [fullname, setfullname] = useState();
    const userpath = location?.pathname?.split("/")[1] || "";
    const [sectionCntData, setSectionCntData] = useState({});
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tempReady, setTempReady] = useState(0);

    useEffect(() => {
        var scData = JSON.parse(prdtPubData?.prdtList || "{}") || {};
        setSectionCntData(scData);
    }, [prdtPubData?.prdtList]);

    useEffect(() => { 
        setTempReady(Object.keys(profilePubData?.bodyData).length); 
    }, [profilePubData?.bodyData]);

    useEffect(() => {
        window.scrollTo(0, 0);
        var data = {
            "user_url": userpath,
            "page_name": "contact-us",
            "section_name": "section1"
        }
        dispatch(loadPubProductListData(data));
    }, [userpath]);

    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    return ( isLoading ? <ProgressBar /> :  tempReady < 1 ? <PageNotFound /> :  isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <Flex row="true">
                        <Flex md={12}>
                            <SizeBox height="15px" />
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">{sectionCntData?.page_title || "{{" + t("contact_us") + "}}"}</Typography>
                            <Flex row="true">
                                <Flex md={11.99}>
                                    <Typography fntsize="cardContentFontSize" txtalign="left">{sectionCntData?.page_subtitle || "{{" + t("contact_us_subtitle") + "}}"}</Typography>
                                    <SizeBox />
                                </Flex>
                                <Flex md={6}>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                    {sectionCntData?.panel1_title || "{{" + t("support") + "}}"}
                                </Typography>
                                <SizeBox />
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{sectionCntData?.panel1_name}</a>
                                </Typography>
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{sectionCntData?.panel1_mobile}</a>
                                </Typography>
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{sectionCntData?.panel1_email}</a>
                                </Typography>
                                <Flex row="true">
                                    <Flex md={6}>
                                        <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                            {sectionCntData?.panel2_title || "{{" + t("location_1") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel2_name}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel2_mobile}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel2_email}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel2_address}</a>
                                        </Typography>
                                       
                                    </Flex>
                                    <Flex md={6}>
                                        <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                            {sectionCntData?.panel3_title || "{{" + t("location_2") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel3_name}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel3_mobile}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel3_email}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{sectionCntData?.panel3_address}</a>
                                        </Typography>
                                       
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex md={6}>
                                {sectionCntData?.panel4_visible ? <Frame
                                    height={"250px"}
                                    width={"100%"}
                                    src={"https://maps.google.com/maps?q=House%2020,%20Road%20no%2012,%20PC%20Culture%20Society&t=&z=19&ie=UTF8&iwloc=&output=embed"}
                                ></Frame> : <></>}
                            </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
           
        </>

    );
};
