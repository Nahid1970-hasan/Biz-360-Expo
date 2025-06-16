import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { useLocation } from "react-router-dom";
import { loadPubProfileData } from "../features/pubprofile/pub_profile_data";
import { loadPubProductData, loadPubProductListData } from "../features/pubprofile/pub_product_slice";
import { Flex } from "../component/style/styled_flex";
import { ShadowCard } from "../component/style/styled_card";
import { SizeBox } from "../component/style/styled_sizebox";
import { Loading } from "../component/Loading";
import { NotNetwork } from "../pages/NoNetwork";
import ProgressBar from "../component/ProgressBar";
import { PageNotFound } from "../pages/NotFound";


export const UserAboutPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const prdtPubData = useSelector((state) => state.pubproductdata);
    const [basicInfo, setBasicInfo] = useState("");
    const [sectionAbtData, setSectionAbtData] = useState({});
    const user = useSelector((state) => state.user);
    const [fullname, setfullname] = useState();
  //  const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = location?.pathname?.split("/")[1] || "";
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tempReady, setTempReady] = useState(0);

    useEffect(() => {
        setSectionAbtData(JSON.parse(prdtPubData?.prdtList || "{}"));
    }, [prdtPubData?.prdtList]);
 
    useEffect(() => { 
        setTempReady(Object.keys(profilePubData?.bodyData).length); 
    }, [profilePubData?.bodyData]);

    useEffect(() => {
        window.scrollTo(0, 0);
        var data = {
            "user_url": username,
            "page_name": "about-us",
            "section_name": "section1"
        }
        dispatch(loadPubProductListData(data));
    }, [location?.pathname]);

    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    return (  tempReady < 1 ? <PageNotFound /> :  isLoading ? <ProgressBar />  :  isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <Flex row={"true"}>
                        <Flex  md={12}>
                            <SizeBox height="15px" />
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">{sectionAbtData?.page_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{sectionAbtData?.page_subtitle || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{sectionAbtData?.panel1_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{sectionAbtData?.panel1_subtitle || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{sectionAbtData?.panel2_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{sectionAbtData?.panel2_subtitle || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{sectionAbtData?.panel3_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{sectionAbtData?.panel3_subtitle || ""}</Typography>
                            <SizeBox height="15px" />

                        </Flex>
                    </Flex>
                </Container>
            </Suspense> 
        </>

    );
};
