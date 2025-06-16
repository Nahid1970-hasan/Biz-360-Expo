import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { useLocation } from "react-router-dom";
import { loadPubProfileData } from "../features/pubprofile/pub_profile_data";
import { loadPubProductData, loadPubProductListData } from "../features/pubprofile/pub_product_slice";
import { Flex } from "../component/style/styled_flex";
import { InfoCard, ShadowCard } from "../component/style/styled_card";
import { SizeBox } from "../component/style/styled_sizebox";
import { Loading } from "../component/Loading";
import { NotNetwork } from "../pages/NoNetwork";
import ProgressBar from "../component/ProgressBar";
import { PageNotFound } from "../pages/NotFound";
import DisplayTheOutput from "rich-text-editor-for-react/display-output"

export const UserAboutPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const prdtPubData = useSelector((state) => state.pubproductdata);

    //  const userpath = location?.pathname?.split("/p/")[1] || "";
    const username = location?.pathname?.split("/")[1] || "";
    const [isAxisError, setIsAxiosError] = useState(false);
    const [invalidPage, setInvalidPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        var pgdt = JSON.parse(prdtPubData?.prdtList || "{}");
        setPageData(pgdt);
    }, [prdtPubData?.prdtList]);


    useEffect(() => {
        window.scrollTo(0, 0);
        var isvalid = !!(profilePubData?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            var data = {
                "user_url": username,
                "page_name": "about-us",
                "section_name": "section1"
            }
            dispatch(loadPubProductListData(data));
            setInvalidPage(false);
        } else {
            setInvalidPage(true);
        }

    }, [location?.pathname]);

    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    return ( invalidPage ? <PageNotFound /> : isLoading ? <ProgressBar /> : isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <Flex row="true">
                        <Flex md={12}>
                            <DisplayTheOutput
                                html={pageData?.page_data || ""}
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
