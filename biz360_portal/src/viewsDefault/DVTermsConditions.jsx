import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import DisplayTheOutput from "rich-text-editor-for-react/display-output"

export const DefaultTermsConditionsPage = () => {
    const profilePubData = useSelector((state) => state.dfprofiledata); 
    const [pageData, setPageData] = useState("");

    useEffect(() => {
        var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.page5 || {};
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
