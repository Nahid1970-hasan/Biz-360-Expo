import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoSubTitle, InfoTitle } from "../component/style/styled_card";
import useTitle from "../hooks/useTitle";
import { useTranslation } from "react-i18next";

export const CopyrightPage = () => {
    const { t, i18n } = useTranslation();

    useTitle(t('copy_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex row="row">
                    <Flex md={12} padding="0 !important" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                        <InfoSubTitle background="aboutContent">
                            <Flex row="row">

                                <Flex md={12} padding="10px 0 !important">
                                    <InfoTitle background="aboutTitle">
                                        <Typography fntsize="dsTextFontSize" fntweight="bold">
                                            {t("copyright")}
                                        </Typography>
                                    </InfoTitle>

                                    {/* <ShadowCard top="10px">
                                        <Typography fntsize="cardContentFontSize" txtalign="left" >
                                            {t("core_consept_dsc")}
                                        </Typography>
                                       
                                    </ShadowCard> */}

                                </Flex>

                            </Flex>
                        </InfoSubTitle>
                    </Flex>

                </Flex>
            </Container>
        </div>
    );
};