import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle } from "../component/style/styled_card";
import useTitle from "../hooks/useTitle";
import { useTranslation } from "react-i18next";
import arrow from "../assets/small-icon/bullet-Icon-biz360expo.png";
import { KDImg } from "../component/style/styled_img";

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
                <Flex md={12} sm={12} xs={12} padding="10px 0 !important">
                    <Flex row="row">
                        <Flex md={3} xs={12} padding="0 5px 0 0 !important">
                            <InfoCard>
                                <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                    {t("copyright")}
                                </Typography>
                                <ULine />
                            </InfoCard>
                        </Flex>
                        <Flex md={9} xs={12} padding="0 0 0 5px !important">
                            <InfoCard>
                                <Typography fntsize="buttonFontSize" txtalign="left" margin="0 0 5px 0" fntweight="bold">
                                    {t("cprt_notice")}
                                </Typography>
                                <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                    {t("cprt_desc")}
                                </Typography>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        <KDImg
                                          padding="5px 0 !important"
                                            src={arrow}
                                            height={"auto"}
                                            width={"auto"}
                                            noborder="true"
                                        />
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding=" 0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("cp_right_dec_1")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding=" 5px 0 0 0!important">
                                        <KDImg
                                            padding="5px 0 !important"
                                            src={arrow}
                                            height={"auto"}
                                            width={"auto"}
                                            noborder="true"
                                        />
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding=" 5px 0 0 0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("cp_right_dec_2")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding=" 5px 0 0 0!important">
                                        <KDImg
                                          padding="5px 0 !important"
                                            src={arrow}
                                            height={"auto"}
                                            width={"auto"}
                                            noborder="true"
                                        />
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding=" 5px 0 0 0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("cp_right_dec_3")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding=" 5px 0 0 0!important">
                                        <KDImg
                                          padding="5px 0 !important"
                                            src={arrow}
                                            height={"auto"}
                                            width={"auto"}
                                            noborder="true"
                                        />
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding=" 5px 0 0 0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("cp_right_dec_4")}</Typography>
                                    </Flex>
                                </Flex>




                            </InfoCard>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
        </div>
    );
};