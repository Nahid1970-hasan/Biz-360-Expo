import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { loadPubProductListData } from "../features/pubprofile/pub_product_slice";
import { useLocation } from "react-router-dom";
import { PageNotFound } from "../pages/NotFound";
import { Loading } from "../component/Loading";
import { Flex } from "../component/style/styled_flex";
import { SizeBox } from "../component/style/styled_sizebox";
import { NotNetwork } from "../pages/NoNetwork";
import ProgressBar from "../component/ProgressBar";


export const UserFAQsPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const userpath = location?.pathname?.split("/")[1] || "";
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const prdtPubData = useSelector((state) => state.pubproductdata);
    const [faqData, setFaqData] = useState({}); 
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tempReady, setTempReady] = useState(0);

    useEffect(() => {
        setFaqData(JSON.parse(prdtPubData?.prdtList || "{}"));
    }, [prdtPubData?.prdtList]);

    useEffect(() => { 
        setTempReady(Object.keys(profilePubData?.bodyData).length); 
    }, [profilePubData?.bodyData]);

    useEffect(() => {
        window.scrollTo(0, 0);
        var data = {
            "user_url": userpath.split("/")[0] || "",
            "page_name": "faqs",
            "section_name": "section1"
        }
        dispatch(loadPubProductListData(data));
    }, [userpath]);

    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    return (  isLoading ? <ProgressBar />  : tempReady < 1 ? <PageNotFound /> : isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <Flex row={"true"}>
                        <Flex md={12} sm={12} xs={12}>
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">{faqData?.page_title || ""}</Typography>
                        </Flex>
                        {
                            faqData?.image_list?.map((d, i)=>    <Flex key={i} md={12} sm={12} xs={12}> 
                            <Typography fntsize="cardContentFontSize" fntweight="bold" txtalign="left">{d?.question || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{d?.answer || ""}</Typography>
                            <SizeBox height={"15px"} />
                           {d?.note.length? <Typography fntsize="cardContentFontSize" txtalign="left">{d?.note || ""}</Typography>:<></>}
                           {d?.note.length? <SizeBox height={"15px"} />:<></> } 
                        </Flex>)
                        }
                    </Flex>
                </Container>
            </Suspense> 
        </>

    );
};
