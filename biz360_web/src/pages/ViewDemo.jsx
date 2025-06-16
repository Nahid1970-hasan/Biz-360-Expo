import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoSubTitle, InfoTitle } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";

export const ViewDemoPage = () => {
    const { t, i18n } = useTranslation();

    useTitle(t('view_title'))  
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex md={12} padding="0 !important" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                    <InfoSubTitle background="aboutContent">
                        <Flex row="row">
                            <Flex md={12} padding="10px 0 !important">
                                <InfoTitle background="aboutTitle">
                                    <Typography fntsize="dsTextFontSize" fntweight="bold">
                                        {t("view_demo")}
                                    </Typography>
                                </InfoTitle>
                            </Flex>

                        </Flex>

                        
                        <Flex row="row">
                            <Flex md={6} padding="10px !important">
                                <Typography fntsize="cardTitleFontSize" txtalign="left" margin="10px 0" fntweight="bold">
                                    {t("How to be a Member / Sign Up")}
                                </Typography>
                                <iframe
                                    width="80%"
                                    height="300"
                                    src="https://www.youtube.com/embed/9HtgDtpo2co"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: '8px' }}
                                    title="Demo video"
                                ></iframe>
                            </Flex>
                            <Flex md={6} padding="10px 0 !important">
                                <Typography fntsize="cardTitleFontSize"  margin="10px 0 " fntweight="bold">
                                    {t("Payment Process")}
                                </Typography>
                                <iframe
                                    width="80%"
                                    height="300"
                                    src="https://www.youtube.com/embed/4WAuDNX4PUE"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        borderRadius: '8px',
                                        margin: '0 auto',
                                        display: 'block'
                                    }}
                                    title="Demo video"
                                ></iframe>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={6} padding="10px !important">
                                <Typography fntsize="cardTitleFontSize" txtalign="left" margin="10px 0" fntweight="bold">
                                    {t("How to Fill up Template")}
                                </Typography>
                                <iframe
                                    width="80%"
                                    height="300"
                                    src="https://www.youtube.com/embed/UYQaux4IWh8"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: '8px' }}
                                    title="Demo video"
                                ></iframe>
                            </Flex>
                            <Flex md={6} padding="10px 0 !important">
                                <Typography fntsize="cardTitleFontSize"  margin="10px 0 " fntweight="bold">
                                    {t("Site Operation by Member")}
                                </Typography>
                                <iframe
                                    width="80%"
                                    height="300"
                                    src="https://www.youtube.com/embed/lae7m1QQn_w"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        borderRadius: '8px',
                                        margin: '0 auto',
                                        display: 'block'
                                    }}
                                    title="Demo video"
                                ></iframe>
                            </Flex>
                        </Flex>
                       
                    </InfoSubTitle>
                </Flex>
            </Container>
        </div>
    );
};