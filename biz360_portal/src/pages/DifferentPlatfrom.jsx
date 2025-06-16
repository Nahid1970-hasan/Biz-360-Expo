import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";
import { SizeBox } from "../component/style/styled_sizebox";

export const DifferentPlatfrom = () => {

    const { t, i18n } = useTranslation();
    useTitle(t('diff_plat_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ userSelect: "none" }}>
            <Container>

                <Flex md={12} xs={12} padding="10px 0 !important">
                    <Flex row="row">
                        <Flex md={3} xs={12} padding="0 5px 0 0 !important">
                            <InfoCard>
                                <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                    {t("dif_plat")}
                                </Typography>
                                <ULine/>
                            </InfoCard>
                        </Flex>
                        <Flex md={9} xs={12} padding="0 0 0 5px !important">
                            <InfoCard>
                                <Typography fntsize="bodySubTitleFontSize" txtalign="left">{t("ben_key")}</Typography>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_1")}
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_1")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_2")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_2")}</Typography>
                                    </Flex>
                                </Flex>

                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_3")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_3")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_4")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_4")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_5")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_5")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_6")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_6")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_7")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_7")}</Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row" justifycontent="start">
                                    <Flex md={.3} xs={1} padding="0!important">
                                        {t("step_8")}                                     </Flex>
                                    <Flex md={11.7} xs={11} padding="0!important">
                                        <Typography fntsize="bodyContentFontSize" txtalign="justify"> {t("biz_plat_8")}</Typography>
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