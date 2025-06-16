import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { useLocation } from "react-router-dom";
import { PageNotFound } from "../pages/NotFound";
import ProgressBar from "../component/ProgressBar";
import { NotNetwork } from "../pages/NoNetwork";
import { loadPubProductListData } from "../features/pubprofile/pub_product_slice";
import { Flex } from "../component/style/styled_flex";
import DisplayTheOutput from "rich-text-editor-for-react/display-output"

export const UserPrivacyPolicyPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const userpath = location?.pathname?.split("/")[1] || "";
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const prdtPubData = useSelector((state) => state.pubproductdata);
    const [basicInfo, setBasicInfo] = useState(""); 
    const [pageData, setPageData] = useState({});
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tempReady, setTempReady] = useState(0);

    useEffect(() => {
        setBasicInfo(profilePubData?.basicData || {});
    }, [profilePubData?.profileData]);

    useEffect(() => { 
        setTempReady(Object.keys(profilePubData?.bodyData).length); 
    }, [profilePubData?.bodyData]);

    useEffect(() => {
        setPageData(JSON.parse(prdtPubData?.prdtList || "{}"));
    }, [prdtPubData?.prdtList]);


    useEffect(() => {
        window.scrollTo(0, 0);
        var data = {
            "user_url": userpath ,
            "page_name": "privacy-policy",
            "section_name": "section1"
        }
        dispatch(loadPubProductListData(data));
    }, [userpath]);

    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    return (tempReady < 1 ? <PageNotFound /> :  isLoading ? <ProgressBar />  :  isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <Flex row="true">
                        <Flex md={12}>
                            <DisplayTheOutput
                                html={pageData?.page_data}
                                backgroundColor='#fff'
                                primaryColor='#30b256'
                            />
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
