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
import { Link } from "react-router-dom";

export const SiteMappage = () => {
    const { t, i18n } = useTranslation();

    useTitle(t('sitemap_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex md={12} sm={12} padding="10px 0!important">
                    <InfoCard>
                        <Flex row="row">
                            <Flex md={12} sm={12} padding="0 0 10px 0!important">
                                <Typography fntsize="bodyHeader" fntweight="bold">
                                    {t("site_map")}
                                </Typography>
                            </Flex>
                            <ULine />
                        </Flex> 
                         <SizeBox/>
                        <Flex row="row">
                            <Flex md={2} padding="0 10px !important">
                                <Typography margin="10px 0 0 0" fntweight="bold" fntsize="infoCardSubTitleFontSize">
                                    {t("home_page")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/" target="blank">{t("home")}</Link>
                                    </Typography>
                                </ShadowCard>

                            </Flex>
                            <Flex md={2} padding="0 !important">
                                <Typography margin="10px 0 0 0" fntweight="bold" fntsize="infoCardSubTitleFontSize">
                                    {t("at_glance")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pabout" target="blank">{t("perception")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pabout" target="blank">{t("core_concept")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pabout" target="blank">{t("about_biz360")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pabout" target="blank">{t("purpose")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pabout" target="blank">{t("key_biz360")}</Link>

                                    </Typography>
                                </ShadowCard>
                            </Flex>
                            <Flex md={2} padding="0 0 0 10px !important">
                                <Typography margin="10px 0 0 0" fntweight="bold" fntsize="infoCardSubTitleFontSize">
                                    {t("membership")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pmember" target="blank">{t("benefits_of_membership")}</Link>

                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pmemsup" target="blank">{t("signup")}</Link>

                                    </Typography>
                                </ShadowCard>

                            </Flex>
                            <Flex md={2} padding="0 10px !important">
                                <Typography margin="10px 0 0 0" fntweight="bold" fntsize="infoCardSubTitleFontSize">
                                    {t("page_price")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/ppricing" target="blank">{t("package_price")}</Link>
                                    </Typography>
                                </ShadowCard>

                            </Flex>
                            <Flex md={2} padding="0 10px !important">
                                <Typography margin="10px 0 0 0" fntweight="bold" fntsize="infoCardSubTitleFontSize">
                                    {t("get_touch")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pgintch" target="blank">{t("contact_us")}</Link>


                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/pgintch" target="blank">{t("cust_service")}</Link>

                                    </Typography>
                                </ShadowCard>
                            </Flex>
                            <Flex md={2} padding="0 !important">
                                <Typography margin="10px 0 0 0" fntweight="bold" fntsize="infoCardSubTitleFontSize">
                                    {t("others")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/difplatfrm" target="blank">{t("dif_plat")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/identitybiz" target="blank">{t("identity_biz")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/cpyright" target="blank">{t("copyright")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/crvalue" target="blank">{t("principles")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">
                                    <Typography>
                                        <Link to="/crvalue" target="blank">{t("core_value")}</Link>
                                    </Typography>
                                </ShadowCard>
                                <ShadowCard top="10px">

                                    <Typography>
                                        <Link to="/termcond" target="blank">{t("term_service")}</Link>
                                    </Typography>

                                </ShadowCard>
                                <ShadowCard top="10px">

                                    <Typography>
                                        <Link to="/pfaq">    {t("faq")}</Link>
                                    </Typography>

                                </ShadowCard>
                            </Flex>
                        </Flex>
                    </InfoCard>

                </Flex>

            </Container>
        </div>
    );
};