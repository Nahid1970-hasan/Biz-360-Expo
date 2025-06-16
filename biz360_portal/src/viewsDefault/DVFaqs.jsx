import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { PageNotFound } from "../pages/NotFound";
import { useTranslation } from "react-i18next";
import { SizeBox } from "../component/style/styled_sizebox";
import { Flex } from "../component/style/styled_flex";


export const DefaultFAQsPage = () => {
    const user = useSelector((state) => state.user);
    const profilePubData = useSelector((state) => state.dfprofiledata);
    const { t, i18n } = useTranslation(); 
    const [faqData, setFaqData] = useState({}); 

    useEffect(() => {
        var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.page4 || {}; 
        setFaqData(infoBodyData);
    }, [profilePubData?.bodyData]);

    return (
        <>
            <Suspense>
                <Container>
                    <Flex row={"true"}>
                        <Flex md={12} sm={12} xs={12}>
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">{faqData?.page_title || ""}</Typography>
                        </Flex>
                        {
                            faqData?.image_list?.map((d, i) => <Flex key={i} md={12} sm={12} xs={12}>
                                <Typography fntsize="cardContentFontSize" fntweight="bold" txtalign="left">{d?.question || ""}</Typography>
                                <SizeBox />
                                <Typography fntsize="cardContentFontSize" txtalign="left">{d?.answer || ""}</Typography>
                                <SizeBox height={"15px"} />
                                {d?.note.length ? <Typography fntsize="cardContentFontSize" txtalign="left">{d?.note || ""}</Typography> : <></>}
                                {d?.note.length ? <SizeBox height={"15px"} /> : <></>}
                            </Flex>)
                        }
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
