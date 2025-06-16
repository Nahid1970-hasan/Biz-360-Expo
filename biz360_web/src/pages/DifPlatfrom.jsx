import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";

export const DifferentPlatfrom = () => {

    const { t, i18n } = useTranslation();
    useTitle(t('diff_plat_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Container>
                <Flex row="row">

                    <Flex md={12} padding="10px 0 !important">
                        <InfoCard >
                            <Typography fntsize="dsTextFontSize" fntweight="bold">
                                {t("dif_plat")}
                            </Typography>
                        </InfoCard>
                    </Flex>
                    <Flex md={12} padding="0!important" >
                        <InfoCard>
                            <Typography fntsize="cardSubTitleFontSize" txtalign="left" fntweight="bold" margin="0 0 5px 0">
                               {t("biz_360_platform")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_1")}   {t("biz_plat_1")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_2")} {t("biz_plat_2")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_3")}   {t("biz_plat_3")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_4")}     {t("biz_plat_4")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_5")}   {t("biz_plat_5")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_6")}   {t("biz_plat_6")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_7")}    {t("biz_plat_7")}
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="0 0 5px 0">
                            {t("step_8")}     {t("biz_plat_8")}
                            </Typography>




                        </InfoCard>
                    </Flex>



                </Flex>
            </Container>
        </>
    );
};