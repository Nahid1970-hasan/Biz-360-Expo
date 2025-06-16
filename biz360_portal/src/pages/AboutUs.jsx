
import { useEffect, useRef } from "react";
import { Typography, ULine } from "../component/style/styled_typography";
import { Flex } from "../component/style/styled_flex";
import { InfoCard, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import { Container } from "../component/style/styled_contrainer";
import Aos from "aos";
import useTitle from "../hooks/useTitle";
import arrow from "../assets/small-icon/bullet-icon-biz360expo.png";
import { KDImg } from "../component/style/styled_img";


export const AboutUsPage = () => {
    const { t, i18n } = useTranslation();
    const perceptionRef = useRef(null);
    const coreConceptRef = useRef(null);
    const aboutBizRef = useRef(null);
    const purposeRef = useRef(null);
    const keyBizRef = useRef(null);
    const scrollContainerRef = useRef(null);
    useTitle(t('glance_title'));


    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (ref) => {
        if (ref.current && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const target = ref.current;
            const containerRect = container.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const scrollPosition = targetRect.top - containerRect.top + container.scrollTop;

            container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };
    return <div style={{ userSelect: "none" }}>
        <Container>

            <Flex md={12} padding="10px 0!important">


                <Flex row="row">
                    <Flex md={3} xs={12}
                        sx={{
                            position: {
                                xs: 'static', // Not sticky on mobile
                                md: 'sticky'  // Sticky on medium and larger screens
                            },
                            top: 0,
                            alignSelf: 'flex-start',
                            overflowY: {
                                xs: 'visible',  // Avoid scroll on mobile
                                md: 'auto'      // Enable scroll for larger screens
                            },
                            height: {
                                xs: 'auto',     // Ensure auto height on mobile
                                sm: 'auto',     // Still auto for small screens
                                md: 'auto',
                                lg: '100vh'     // Full viewport height only on large screens
                            }
                        }}
                        padding="0 5px 10px 0!important">
                        <InfoCard background="infoCard">
                            <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                {t("at_glance")}
                            </Typography>
                            {/* <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0">
                                {t("table_content")}
                            </Typography> */}
                            <ULine />

                            <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0"
                                style={{ cursor: 'pointer' }}
                                onClick={() => scrollToSection(perceptionRef)}                            >
                                {t("perception")}
                            </Typography>
                            <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0"
                                style={{ cursor: 'pointer' }}
                                onClick={() => scrollToSection(coreConceptRef)}
                            >
                                {t("core_concept")}
                            </Typography>
                            <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0"
                                style={{ cursor: 'pointer' }}
                                onClick={() => scrollToSection(aboutBizRef)}
                            >
                                {t("about_biz360")}
                            </Typography>
                            <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0"
                                style={{ cursor: 'pointer' }}
                                onClick={() => scrollToSection(purposeRef)}
                            >
                                {t("purpose")}
                            </Typography>
                            <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0"
                                style={{ cursor: 'pointer' }}
                                onClick={() => scrollToSection(keyBizRef)}                            >
                                {t("key_biz360")}
                            </Typography>

                        </InfoCard>
                    </Flex>
                   <Flex md={9} xs={12} padding="0 0 0 5px !important"
    style={{
        overflowY: 'auto',
        maxHeight: '100vh',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    }}
    ref={scrollContainerRef}
>
    <Flex row="row">
        <Flex md={12} xs={12} padding="0 !important">
            <InfoCard background="infoCard">
                <div ref={perceptionRef} style={{ scrollMarginTop: '20px' }}>
                    <Typography
                        fntsize="buttonFontSize"
                        txtalign="left"
                        fntweight="bold"
                        margin="5px 0"
                    >
                        {t("perception")}
                    </Typography>
                </div>
                <Typography fntsize="bodyContentFontSize" txtalign="justify">
                    {t("percptn_content1")}
                </Typography>
                <Typography fntsize="bodyContentFontSize" txtalign="justify" margin="10px 0">
                    {t("percptn_content2")}
                </Typography>
            </InfoCard>
        </Flex>

        <Flex md={12} xs={12} padding="10px 0 5px 0!important">
            <InfoCard background="infoCard">
                <div ref={coreConceptRef} style={{ scrollMarginTop: '20px' }}>
                    <Typography
                        fntsize="buttonFontSize"
                        txtalign="left"
                        fntweight="bold"
                        margin="5px 0"
                    >
                        {t("core_concept")}
                    </Typography>
                </div>
                <Typography fntsize="bodyContentFontSize" txtalign="justify">
                    {t("core_consept_dsc")}
                </Typography>
            </InfoCard>
        </Flex>

        <Flex md={12} xs={12} padding="5px 0!important">
            <InfoCard background="infoCard">
                <div ref={aboutBizRef} style={{ scrollMarginTop: '20px' }}>
                    <Typography
                        fntsize="buttonFontSize"
                        txtalign="left"
                        fntweight="bold"
                        margin="5px 0"
                    >
                        {t("about_biz360")}
                    </Typography>
                </div>
                <Typography fntsize="bodyContentFontSize" txtalign="justify">
                    {t("about_biz360_dsc")}
                </Typography>
                <Typography fntsize="bodyContentFontSize" txtalign="justify" margin="10px 0">
                    {t("about_biz360_dsc2")}
                </Typography>
                <Typography fntsize="bodyContentFontSize" txtalign="justify" margin="10px 0">
                    {t("about_biz360_dsc3")}
                </Typography>
            </InfoCard>
        </Flex>

        <Flex md={12} xs={12} padding="5px 0!important">
            <InfoCard background="infoCard">
                <div ref={purposeRef} style={{ scrollMarginTop: '20px' }}>
                    <Typography
                        fntsize="buttonFontSize"
                        txtalign="left"
                        fntweight="bold"
                        margin="5px 0"
                    >
                        {t("purpose")}
                    </Typography>
                </div>
                <Typography fntsize="bodyContentFontSize" txtalign="justify">
                    {t("purpose_desc")}
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("pur_key1")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("pur_key2")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("pur_key3")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("pur_key4")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("pur_key5")}</Typography>
                    </Flex>
                </Flex>
            </InfoCard>
        </Flex>

        <Flex md={12} xs={12} padding="5px 0 10px 0!important">
            <InfoCard background="infoCard">
                <div ref={keyBizRef} style={{ scrollMarginTop: '5px' }}>
                    <Typography
                        fntsize="buttonFontSize"
                        txtalign="left"
                        fntweight="bold"
                        margin="5px 0"
                    >
                        {t("key_biz360")}
                    </Typography>
                    <Typography fntsize="bodyContentFontSize" txtalign="justify">
                        {t("key_desc")}
                    </Typography>
                </div>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_1")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_2")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_3")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_4")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_5")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_6")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_7")}</Typography>
                    </Flex>
                </Flex>
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
                    <Flex md={11.7} xs={11} padding="0!important">
                        <Typography fntsize="bodyContentFontSize" txtalign="left">{t("key_biz_8")}</Typography>
                    </Flex>
                </Flex>
            </InfoCard>
        </Flex>
    </Flex>
</Flex>
                </Flex>







            </Flex>

        </Container>
    </div >
}