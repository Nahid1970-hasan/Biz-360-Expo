
import { useEffect, useRef } from "react";
import { Typography, ULine } from "../component/style/styled_typography";
import { Flex } from "../component/style/styled_flex";
import { InfoCard, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import { Container } from "../component/style/styled_contrainer";
import Aos from "aos";
import useTitle from "../hooks/useTitle";

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
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };
    return <div style={{ userSelect: "none" }}>
        <Container>

            <Flex row="row">
                <Flex md={12} padding="10px 0!important">
                    <InfoCard >
                        <Typography fntsize="bodyHeader" fntweight="bold">
                            {t("at_glance")}
                        </Typography>
                    </InfoCard>
                </Flex>

                <Flex row="row">
                    <Flex md={3} style={{
                        position: 'sticky',
                        top: '0',
                        alignSelf: 'flex-start',
                        height: '100vh',
                        overflowY: 'auto'
                    }} padding="0 5px 0 0!important">
                        <InfoCard background="infoCard">
                            <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0">
                                {t("table_content")}
                            </Typography>
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
                    <Flex md={9} padding="0 0 0 5px !important" style={{
                        overflowY: 'auto',
                        maxHeight: '100vh',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                        ref={scrollContainerRef}
                        // css={{
                        //     '&::-webkit-scrollbar': {
                        //       display: 'none'
                        //     }
                        //   }}
                    >

                        <Flex row="row">
                            <Flex md={12} padding="0 !important" >
                                <InfoCard background="infoCard">
                                    <div ref={perceptionRef} style={{ scrollMarginTop: '5px' }}>
                                        <Typography
                                            fntsize="buttonFontSize"
                                            txtalign="left"
                                            fntweight="bold"
                                            margin="5px 0"
                                        >
                                            {t("perception")}
                                        </Typography>
                                    </div>
                                  
                                        <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                            {t("percptn_content1")}
                                        </Typography>
                                        <Typography fntsize="bodyContentFontSize" txtalign="left" margin="10px 0">
                                            {t("percptn_content2")}
                                        </Typography>
                                </InfoCard>
                            </Flex>

                            <Flex md={12} padding="10px 0 5px 0!important" >
                                <InfoCard background="infoCard">
                                    <div ref={coreConceptRef} style={{ scrollMarginTop: '5px' }}>
                                        <Typography
                                            fntsize="buttonFontSize"
                                            txtalign="left"
                                            fntweight="bold"
                                            margin="5px 0"
                                        >
                                            {t("core_concept")}
                                        </Typography>
                                    </div>
                                        <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                            {t("core_consept_dsc")}
                                        </Typography>
                                </InfoCard>

                            </Flex>
                            <Flex md={12} padding="5px 0!important" >
                                <InfoCard background="infoCard">
                                    <div ref={aboutBizRef} style={{ scrollMarginTop: '5px' }}>
                                        <Typography
                                            fntsize="buttonFontSize"
                                            txtalign="left"
                                            fntweight="bold"
                                            margin="5px 0"
                                        >
                                            {t("about_biz360")}
                                        </Typography>
                                    </div>
                                        <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                            {t("about_biz360_dsc")}
                                        </Typography>

                                        <Typography fntsize="bodyContentFontSize" txtalign="left" margin="10px 0">
                                            {t("about_biz360_dsc2")}
                                        </Typography>

                                        <Typography fntsize="bodyContentFontSize" txtalign="left" margin="10px 0">
                                            {t("about_biz360_dsc3")}
                                        </Typography>
                                </InfoCard>
                            </Flex>
                            <Flex md={12} padding="5px 0!important" >
                                <InfoCard background="infoCard">
                                    <div ref={purposeRef} style={{ scrollMarginTop: '5px' }}>
                                        <Typography
                                            fntsize="buttonFontSize"
                                            txtalign="left"
                                            fntweight="bold"
                                            margin="5px 0"
                                        >
                                            {t("purpose")}
                                        </Typography>
                                    </div>
                                
                                    <Typography fntsize="bodySubTitleFontSize"  txtalign="left">
                                            {t("purpose_desc")}
                                        </Typography>
                                        <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                            <li>
                                                {t("pur_key1")}
                                            </li>
                                            <li>
                                                {t("pur_key2")}
                                            </li>
                                            <li>
                                                {t("pur_key3")}
                                            </li>
                                            <li>
                                                {t("pur_key4")}
                                            </li>
                                            <li>
                                                {t("pur_key5")}
                                            </li>
                                          
                                        </Typography>
                                 
                                </InfoCard>

                            </Flex>
                            <Flex md={12} padding="5px 0!important" >
                                <InfoCard background="infoCard">
                                    <div ref={keyBizRef} style={{ scrollMarginTop: '20px' }}>
                                        <Typography
                                            fntsize="buttonFontSize"
                                            txtalign="left"
                                            fntweight="bold"
                                            margin="5px 0"
                                        >
                                            {t("key_biz360")}
                                        </Typography>
                                    </div>
                                
                                        <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                            <li>
                                                {t("key_biz_1")}
                                            </li>
                                            <li>
                                                {t("key_biz_2")}
                                            </li>
                                            <li>
                                                {t("key_biz_3")}
                                            </li>
                                            <li>
                                                {t("key_biz_4")}
                                            </li>
                                            <li>
                                                {t("key_biz_5")}
                                            </li>
                                            <li>
                                                {t("key_biz_6")}
                                            </li>

                                            <li>
                                                {t("key_biz_7")}
                                            </li>
                                            <li>
                                                {t("key_biz_8")}
                                            </li>
                                        </Typography>
                                 
                                </InfoCard>

                            </Flex>


                        </Flex>


                    </Flex>
                </Flex>







            </Flex>

        </Container>
    </div >
}