import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";

import DisplayTheOutput from "rich-text-editor-for-react/display-output"
import { Flex } from "../component/style/styled_flex";

export const DefaultPrivacyPolicyPage = () => {
    const profilePubData = useSelector((state) => state.dfprofiledata); 
        const [pageData, setPageData] = useState("");
    
        useEffect(() => {
            var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.page6 || {};
            setPageData(infoBodyData?.page_data || "")
        }, [profilePubData?.bodyData]);
    
        return (
            <>
                <Suspense>
                    <Container>
                        <Flex row="true">
                            <Flex md={12}>
                                <DisplayTheOutput
                                    html={pageData}
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
    