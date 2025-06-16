import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { SizeBox } from "../component/style/styled_sizebox";
import { useTranslation } from "react-i18next";


export const DefaultAboutPage = () => {
    const user = useSelector((state) => state.user);
    const profilePubData = useSelector((state) => state.dfprofiledata);
    const { t, i18n } = useTranslation();
    const [abtData, setAbtData] = useState({});

    useEffect(() => {
        var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.page1 || {};
        setAbtData(infoBodyData)
    }, [profilePubData?.bodyData]);

    return (
        <>
            <Suspense>
                <Container>
                    <Flex row="true">
                        <Flex md={12}>
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">{abtData?.page_title || "{{"+t('page_title')+"}}"}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.page_subtitle || "{{"+t('page_subtitle')+"}}"}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{abtData?.section1_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.section1_subtitle || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{abtData?.section2_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.section2_subtitle || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{abtData?.section3_title || ""}</Typography>
                            <SizeBox />
                            <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.section3_subtitle || ""}</Typography>

                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
