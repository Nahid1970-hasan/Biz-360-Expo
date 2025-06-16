import { useEffect, useRef } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { t } from "i18next";
import { KDImg } from "../component/style/styled_img";
import logo from "../assets/Icon.jpg";
import demo from "../assets/demo/400x600px-3.jpg";
import demo2 from "../assets/demo/400x600px.jpg";
import demo3 from "../assets/demo/400x600px-2.jpg";
import feedback from "../assets/demo/Feedback.jpg";
import contact from "../assets/demo/400x600px-1.jpg";
import feedb from "../assets/demo/fed.jpg";
import feeddemo from "../assets/demo/feeddemo.jpg";

import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";


export const CoreValue = () => {

    const { t, i18n } = useTranslation();

    useTitle(t('principle_title'))    
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    const principlesRef = useRef(null);
    const corevalueRef = useRef(null);

    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    };

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <InfoSubTitle background="aboutContent">
                    <Flex row="row">
                        <Flex md={3} padding="0 !important" >
                            <InfoTitle background="aboutTitle">
                                <Typography fntsize="dsTextFontSize" fntweight="bold">
                                    {t("principles")}
                                </Typography>
                            </InfoTitle>

                            <Flex row="row">
                                <Flex md={12} padding=" 10px 0 0 0 !important">
                                    <InfoCard>
                                        <ShadowCard>
                                            <KDImg src={demo} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                        <Typography fntsize="cardSubTitleFontSize" margin="10px 0">
                                            {t("cust_first")}
                                        </Typography>
                                    </InfoCard>
                                </Flex>
                                <Flex md={12} padding=" 10px 0 0 0 !important">
                                    <InfoCard>
                                        <ShadowCard>
                                            <KDImg src={demo2} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                        <Typography fntsize="cardSubTitleFontSize" margin="10px 0">
                                            {t("long_comnt")}
                                        </Typography>
                                    </InfoCard>

                                </Flex>
                                <Flex md={12} padding=" 10px 0 0 0 !important">
                                    <InfoCard>
                                        <ShadowCard>
                                            <KDImg src={logo} height={"100px"} width={"100%"} noborder="true" /> </ShadowCard>

                                        <Typography fntsize="cardSubTitleFontSize" margin="10px 0">
                                            {t("rearch_dev")}
                                        </Typography>
                                    </InfoCard>
                                


                                </Flex>
                                <Flex md={12} padding=" 10px 0 0 0 !important">
                                    <InfoCard>
                                        <ShadowCard>
                                            <KDImg src={contact} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                        <Typography fntsize="cardSubTitleFontSize" margin="10px 0">
                                            {t("cont_pro_dev")}
                                        </Typography>
                                    </InfoCard>
                                  


                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex md={9} padding="0 10px !important" >
                            <Flex row="row">
                                <Flex md={12} padding=" 0 !important">
                                    <InfoTitle background="aboutTitle">
                                        <Typography fntsize="dsTextFontSize" fntweight="bold">
                                            {t("core_value")}
                                        </Typography>
                                    </InfoTitle>
                                    <Flex row="row">
                                      
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("team_work")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={demo2} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("team_work_dec")}</Typography>
                                            </InfoCard>

                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("pro_centric")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={contact} height={"100%"} width={"100%"} noborder="true" />  </ShadowCard>

                                                <Typography margin="5px 0">{t("pro_centric_dec")}</Typography>
                                            </InfoCard>

                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("hight_qualty")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={demo3} height={"100%"} width={"100%"} noborder="true" />  </ShadowCard>

                                                <Typography margin="5px 0">{t("hight_qualty_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                        
                                    </Flex>
                                    <Flex row="row">
                                  
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("tech_dev")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={feedb} height={"auto"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("tech_dev_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("invtion_change")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={feedback} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("invtion_change_dec")}</Typography>
                                            </InfoCard>

                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("cra_work")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={feeddemo} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("cra_work_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                              
                                    </Flex>
                                    <Flex row="row">
                             
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("trans_neutrl")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={logo} height={"100px"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("trans_neutrl_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("accounttibility")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={logo} height={"100px"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("accounttibility_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("commitment")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={feedb} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("commitment_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                  
                                    </Flex>
                                    <Flex row="row">
                                
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("trans_neutrl")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={logo} height={"100px"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("trans_neutrl_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important">
                                            <InfoCard>
                                                <Typography fntweight="bold" margin="0 0 10px 0">{t("feedback")}</Typography>
                                                <ShadowCard>
                                                    <KDImg src={feedback} height={"100%"} width={"100%"} noborder="true" /> </ShadowCard>

                                                <Typography margin="5px 0">{t("feedback_dec")}</Typography>
                                            </InfoCard>
                                        </Flex>
                                        <Flex md={4} padding="10px 5px!important"></Flex>
                                   
                                    </Flex>

                                </Flex>

                            </Flex>
                        </Flex>

                    </Flex>
                </InfoSubTitle>
            </Container>
        </div>
    );
};