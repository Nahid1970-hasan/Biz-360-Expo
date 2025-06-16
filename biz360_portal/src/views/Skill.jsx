import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
 
import { Flex } from "../component/style/styled_flex";
import { useLocation } from "react-router-dom";
import { PageNotFound } from "../pages/NotFound";
import ProgressBar from "../component/ProgressBar";

export const UserSkillPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const location = useLocation();
    const [basicInfo, setBasicInfo] = useState("");
    const user = useSelector((state) => state.user);
    const [fullname, setfullname] = useState(); 
    const [invalidPage, setInvalidPage] = useState(true);
    const [tempReady, setTempReady] = useState(0);

    useEffect(() => { 
        setTempReady(Object.keys(profilePubData?.bodyData).length); 
    }, [profilePubData?.bodyData]);

    useEffect(() => {
        setBasicInfo(profilePubData?.basicData || {});
    }, [profilePubData?.profileData]);
    
    useEffect(() => {
        window.scrollTo(0, 0); 
        var isvalid = !!(profilePubData?.pageList?.find((d) => d == location.pathname) || "");
        setInvalidPage(!isvalid); 
    }, [location.pathname]);

    return ( tempReady < 1 ? <PageNotFound /> : invalidPage? <PageNotFound /> : 
        <>
            <Suspense>
                <Container>

                    <Center>
                        <Typography fntsize="headingLargeFontSize" >
                            {"HI"} {basicInfo?.biz_name || ""}
                        </Typography>

                    </Center>
                    <Flex row="true">
                        <Flex md={12}>
                          
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
