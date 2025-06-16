
import { useEffect } from "react";
import { Center } from "../component/style/styled_center";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";

export const PrivacyPage = () => {

    const { t, i18n } = useTranslation();
    useTitle(t('privacy_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return <div style={{ userSelect: "none" }}>
        <Container>
            <Flex row="row">
                <Flex md={12}>
                    <InfoTitle background="aboutTitle">
                        <Typography fntsize="cardTitleFontSize" fntweight="bold">
                            {t("Privacy & Policy")}
                        </Typography>
                    </InfoTitle>

                </Flex>

                <Flex md={12} padding="0 0 10px 0!important">
                    <InfoSubTitle background="aboutContent">
                        <Typography fntsize="cardSubTitleFontSize" txtalign="left" fntweight="bold">
                            {t("Introduction")}
                        </Typography>
                        <ShadowCard top="10px">
                            <Typography fntsize="cardContentFontSize" txtalign="left" >
                                Welcome to <b>Biz360Expo</b>. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you register and use our platform, which offers trial and paid memberships for individuals and commercial users across various business categories.
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="10px 0 5px 0">
                                By signing up and using our services, you agree to the practices described in this policy.                            </Typography>
                        </ShadowCard>
                    </InfoSubTitle>
                </Flex>

                <Flex md={12} padding="0 0 10px 0!important">
                    <InfoSubTitle background="aboutContent">
                        <Typography fntsize="cardSubTitleFontSize" txtalign="left" fntweight="bold">
                            {t("Information We Collect")}
                        </Typography>
                        <ShadowCard top="10px">
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="5px 0">
                                When you register on our platform, we collect the following types of information:
                            </Typography>
                            <Typography fntsize="cardContentFontSize" txtalign="left" margin="5px 10px">
                                <li>
                                    {t("Contact Information (Name, Email, Mobile Number)")}
                                </li>
                                <li>
                                    {t("Login Credentials (Username and Password)")}
                                </li>
                                <li>
                                    {t("Business Information (Business Name, Category, and Description)")}
                                </li>
                                <li>
                                    {t("Personal Identification Documents (e.g., National ID or Business Documents)")}
                                </li>
                                <li>
                                    {t("Uploaded Content (including images, product/service listings, etc.)")}
                                </li>

                            </Typography>



                        </ShadowCard>
                    </InfoSubTitle>
                </Flex>



            </Flex>
        </Container>

    </div>
}