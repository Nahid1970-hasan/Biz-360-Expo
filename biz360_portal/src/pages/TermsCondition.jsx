import "aos/dist/aos.css";
import 'react-international-phone/style.css';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Center } from "../component/style/styled_center";
import { Typography, ULine } from "../component/style/styled_typography";
import { InfoCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";
import { SizeBox } from "../component/style/styled_sizebox";

export const TermsPage = () => {
    const { t, i18n } = useTranslation();
    useTitle(t('term_title'));

    // Refs for each section
    const rightsRef = useRef(null);
    const packageRef = useRef(null);
    const trialRef = useRef(null);
    const renewalRef = useRef(null);
    const refundRef = useRef(null);
    const responsibilityRef = useRef(null);
    const dataSecurityRef = useRef(null);
    const lawEnforcementRef = useRef(null);
    const demarketingRef = useRef(null);
    const changesRef = useRef(null);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (ref) => {
        if (ref.current && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const target = ref.current;
            const offset = 20; // Adjust this value as needed
            
            // Calculate position relative to scroll container
            const containerTop = container.getBoundingClientRect().top + window.pageYOffset;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
            const scrollPosition = targetTop - containerTop - offset;

            container.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Center>
                    <Flex row="row">
                        {/* Left Navigation Panel */}
                        <Flex md={3} xs={12}
                            sx={{
                                position: {
                                    xs: 'static',
                                    md: 'sticky'
                                },
                                top: 0,
                                alignSelf: 'flex-start',
                                overflowY: {
                                    xs: 'visible',
                                    md: 'auto'
                                },
                                height: {
                                    xs: 'auto',
                                    sm: 'auto',
                                    md: 'auto',
                                    lg: '100vh'
                                }
                            }}
                            padding="10px 5px 10px 0 !important">
                            <InfoCard>
                                <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                    {t("term_service")}
                                </Typography>
                                <ULine />

                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(rightsRef)}>
                                    {t("trms_right_title")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(packageRef)}>
                                    {t("package")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(trialRef)}>
                                    {t("trial_period")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(renewalRef)}>
                                    {t("mem_renewal")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(refundRef)}>
                                    {t("refund_policy")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(responsibilityRef)}>
                                    {t("mem_responsibility")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(dataSecurityRef)}>
                                    {t("data_security")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(lawEnforcementRef)}>
                                    {t("dis_law_env")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(demarketingRef)}>
                                    {t("demarketing")}
                                </Typography>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" margin="10px 0 0 0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => scrollToSection(changesRef)}>
                                    {t("chng_policy")}
                                </Typography>
                            </InfoCard>
                        </Flex>

                        {/* Main Content Panel */}
                        <Flex md={9} xs={12}
                            ref={scrollContainerRef}
                            style={{
                                overflowY: 'auto',
                                height: '100vh',
                                position: 'relative',
                                scrollBehavior: 'smooth',
                                paddingRight: '10px',
                            }}
                            padding="10px 0 10px 5px !important">
                            <InfoCard>
                                {/* Rights and Responsibilities Section */}
                                <div ref={rightsRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("trms_right_title")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_1")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_1")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_2")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_2")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_3")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_3")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left" >
                                            {t("step_4")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_4")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Package Section */}
                                <div ref={packageRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("package")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_5")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_5")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Trial Period Section */}
                                <div ref={trialRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("trial_period")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_6")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_6")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Membership Renewal Section */}
                                <div ref={renewalRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("mem_renewal")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_7")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_7")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Refund Policy Section */}
                                <div ref={refundRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("refund_policy")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_8")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_8")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Member Responsibility Section */}
                                <div ref={responsibilityRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("mem_responsibility")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_9")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_9")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Data Security Section */}
                                <div ref={dataSecurityRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("data_security")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_10")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_10")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Law Enforcement Section */}
                                <div ref={lawEnforcementRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("dis_law_env")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_11")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_11")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Demarketing Section */}
                                <div ref={demarketingRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("demarketing")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_12")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_12")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                                <SizeBox />

                                {/* Changes to Policy Section */}
                                <div ref={changesRef} style={{ scrollMarginTop: '20px' }}>
                                    <Typography fntsize="buttonFontSize" txtalign="left" fntweight="bold">
                                        {t("chng_policy")}
                                    </Typography>
                                </div>
                                <Flex row="row">
                                    <Flex md={0.3} xs={1} padding="5px 0 0 0 !important">
                                        <Typography txtalign="left">
                                            {t("step_13")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={11.7} xs={11} padding="5px 0  0 0  !important">
                                        <Typography txtalign="justify" fntsize="bodyContentFontSize">
                                            {t("trm_rdesc_13")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                            </InfoCard>
                        </Flex>
                    </Flex>
                </Center>
            </Container>
        </div>
    );
};