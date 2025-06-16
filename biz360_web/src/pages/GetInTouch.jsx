import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { CardBody, InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { t } from "i18next";
import { SizeBox } from "../component/style/styled_sizebox";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";

export const GetInTouchPage = () => {

    const { t, i18n } = useTranslation();
    useTitle(t('get_touch_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex row="row">

                    <Flex row="row">
                        <Flex md={12} padding="10px 0 10px 0!important">
                            <InfoTitle background="infoCardContent">
                                <Typography fntsize="dsTextFontSize" fntweight="bold">
                                    {t("get_touch")}
                                </Typography>
                            </InfoTitle>

                        </Flex>
                    </Flex>

                    <Flex row="row">
                        <Flex md={7} padding="0 !important">
                            <Flex row="row">
                                <Flex md={12} padding="0 0 10px 0">
                                    <InfoCard>
                                        <Typography fntsize="cardSubTitleFontSize" fntweight="bold">
                                            {t("contact_us")}
                                        </Typography>
                                    </InfoCard>
                                </Flex>
                                <Flex md={12} padding="0 0 10px 0">
                                    <InfoCard>
                                        <Typography txtalign="left" fntsize="bodyContentFontSize" fntweight="bold" margin="10px 0 5px 10px" incnum={1} incnumtype="decr">
                                            {t("biz_360")}
                                        </Typography>
                                        <Typography txtalign="left" fntsize="bodyContentFontSize" margin="0 10px">{t("3rd Floor, House 20, Road 12, PC Culture Housing Society")}</Typography>
                                        <Typography txtalign="left" fntsize="bodyContentFontSize" margin="5px 10px"> {t("Shekertek, Adabor, Dhaka-1207, Bangladesh")}</Typography>
                                        <Typography txtalign="left" fntsize="bodyContentFontSize" margin="0 10px">{t("Phone : 01730251360")}</Typography>

                                        <Flex row="row">
                                            <Flex md={12} padding="10px">
                                                <CardBody>
                                                    <iframe height="300px" width="100%" src="https://maps.google.com/maps?q=House%2020,%20Road%20no%2012,%20PC%20Culture%20Society&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>

                                                </CardBody>
                                            </Flex>
                                        </Flex>


                                    </InfoCard>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex md={5} padding="0 0 0 10px !important">
                            <Flex row="row">
                                <Flex md={12} padding="0 0 10px 0">
                                    <InfoCard>
                                        <Typography fntsize="cardSubTitleFontSize" fntweight="bold">
                                            {t("cust_service")}
                                        </Typography>
                                    </InfoCard>
                                </Flex>
                                <Flex md={12} padding="0 0 10px 0">
                                    <InfoCard>
                                        <Typography fntsize="cardSubTitleFontSize" txtalign="left" margin="10px">
                                            {t("Call us … ")}
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin=" 0 10px">
                                            <a href="tel:01703121360">{t("01703121360")} </a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="0 10px">
                                            <a href="tel:01723151360">{t("01723151360")}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="10px 0 0 10px">
                                            <a href="mailto:contact@Biz360Expo.com">contact@Biz360Expo.com</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="0 10px">
                                            <a href="mailto:marketing@Biz360Expo.com">marketing@Biz360Expo.com</a>
                                        </Typography>
                                    </InfoCard>
                                </Flex>
                            </Flex>

                        </Flex>
                    </Flex>

                </Flex>
            </Container>
        </div>
    );
};