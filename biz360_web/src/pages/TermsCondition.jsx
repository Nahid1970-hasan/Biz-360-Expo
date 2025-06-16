
import "aos/dist/aos.css";
import 'react-international-phone/style.css';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";
import { InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";




export const TermsPage = () => {

        const { t, i18n } = useTranslation();
        useTitle(t('term_title'))

    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Container>
                <Center>

                    <Flex row="row">
                        <Flex md={12}>
                            <InfoTitle background="aboutTitle">
                                <Typography fntsize="infoCardTitleFontSize">
                                    Terms and Conditions for Membership
                                </Typography></InfoTitle>

                            <InfoSubTitle background="aboutContent">
                                <Typography fntsize="cardSubTitleFontSize" txtalign="left" >
                                    {t("sub_term")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography fntsize="cardContentFontSize" txtalign="left" margin="5px">
                                        <li>
                                            {t("condition_1")}
                                        </li>
                                        <li>
                                            {("The Authority reserves the right to notify members regarding illegal activity, unsocial manner, unprofessional conduct etc.")}
                                        </li>
                                        <li>
                                            {t("The Authority reserves the right to remove any content uploaded by the Member, which is deemed as illegal, offensive, unsocial, unprofessional etc.")}
                                        </li>
                                        <li>
                                            {t("The Authority reserves the right to even cancel the membership of any member due to illegal activity, unsocial manner, unprofessional conduct etc. without notice.")}
                                        </li>

                                        <li>
                                            {t("The Members must be solely accountable for the contents entered/ uploaded/ updated by him/her or by their organizations and/or the contents available on their portal. They will remain liable for any legal proceedings regarding those contents. The Authority is not at all responsible for these contents.")}
                                        </li>
                                        <li>
                                            {t("The Members must be solely responsible for the product, service, solution, guidance, consultancy etc. that he/she or their organizations provide to other parties who are members of the Platform or not any member of the Platform. They will remain liable for any legal proceedings on these product, service, solution, guidance, consultancy etc. The Authority is not at all responsible for these product, service, solution, guidance, consultancy etc.")}
                                        </li>


                                    </Typography>

                                    <Typography fntsize="cardContentFontSize" txtalign="left" margin="10px 5px 0 5px !important" fntweight="bold" color="error">
                                        There is no refund or return once payment is made.
                                    </Typography>

                                </ShadowCard>

                            </InfoSubTitle>
                        </Flex>




                        <Flex md={12} padding="0 0 10px 0!important">

                            <InfoSubTitle background="aboutContent">
                                <Typography fntsize="cardSubTitleFontSize" txtalign="left" fntweight="bold">
                                    {t("General Terms and Conditions")}
                                </Typography>
                                <ShadowCard top="10px">
                                    <Typography fntsize="cardContentFontSize" txtalign="left" >
                                       {t("The Authority is not responsible for losses or damages due to use/follow any product, service, solution, guidance, consultancy etc. of a Member of the Platform. It is the own responsibility of the user/follower, not any liability to The Authority.")}
                                    </Typography>
                                    <Typography fntsize="cardContentFontSize" txtalign="left" >
                                       {t("We maintain secrecy of your business and whatever considered as confidential apart from those have been exposed by you.")}
                                    </Typography>

                                </ShadowCard>
                            </InfoSubTitle>

                        </Flex>

                        
                    </Flex>


                </Center>
            </Container>
        </>
    );
};
