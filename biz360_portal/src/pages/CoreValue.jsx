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
import Cust_first from "../assets/our-principle/customer-first-icon-biz360expo.png";
import long_com from "../assets/our-principle/long-commitment-icon-biz360expo.png";
import pro_dev from "../assets/our-principle/professional-development-icon-biz360expo.png";
import reach_dev from "../assets/our-principle/research-development-icon-biz360expo.png";

import teamwork from "../assets/core-value/teamwork-icon-biz360expo.png";
import process from "../assets/core-value/process-icon-biz360expo.png";
import quality from "../assets/core-value/quality-icon-biz360expo.png";
import customer from "../assets/core-value/customer-support-icon-biz360expo.png";
import technology from "../assets/core-value/technology-and-development-icon-biz360expo.png";
import innovation from "../assets/core-value/innovation-and-change-icon-biz360expo.png";
import creativework from "../assets/core-value/creative-work-icon-biz360expo.png";
import transparency from "../assets/core-value/transparency-and-neutral-icon-biz360expo.png";
import accountibility from "../assets/core-value/accountability-icon-biz360expo.png";
import commitment from "../assets/core-value/commitment-icon-biz360expo.png";
import feedback from "../assets/core-value/feedback-icon-biz360expo.png";

import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";
import { Center } from "../component/style/styled_center";
import { SizeBox } from "../component/style/styled_sizebox";

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
                <Flex row="row">
                    <Flex md={3} padding="10px 5px  0 0!important">
                        <InfoCard >
                            <Typography fntsize="dsTextFontSize" fntweight="bold">
                                {t("principles")}
                            </Typography>
                        </InfoCard>
                    </Flex>
                    <Flex md={9} padding="10px 0 0 5px !important">
                        <InfoCard>
                            <Flex row="row">
                                <Flex md={3} padding="0 5px 0 0 !important">
                                    <ShadowCard height="160px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("cust_first")}</Typography>
                                            <KDImg src={Cust_first}
                                                margin="10px 0 0 0"
                                                height={"80px"}
                                                width={"120px"}
                                                noborder="true"
                                            />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="160px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("long_comnt")}</Typography>
                                            <KDImg src={long_com}
                                                margin="10px 0 0 0"
                                                height={"80px"}
                                                width={"120px"}
                                                noborder="true" />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="160px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("rearch_dev")}</Typography>
                                            <KDImg src={reach_dev}
                                                margin="10px 0 0 0"
                                                height={"80px"}
                                                width={"120px"}
                                                noborder="true" />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 0 0 5px !important">
                                    <ShadowCard height="160px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("cont_pro_dev")}</Typography>
                                            <KDImg src={pro_dev}
                                                height={"80px"}
                                                width={"120px"}
                                                noborder="true" />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                </Flex>

                <Flex row="row">
                    <Flex md={3} padding="10px 5px 10px 0 !important">
                        <InfoCard>
                            <Typography fntsize="dsTextFontSize" fntweight="bold">
                                {t("core_value")}
                            </Typography>
                        </InfoCard>
                    </Flex>
                    <Flex md={9} padding="10px 0 10px 5px !important">
                        <InfoCard>
                            <Flex row="row">
                                <Flex md={3} padding="0 5px 0 0 !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("team_work")}</Typography>
                                            <KDImg src={teamwork}
                                                height={"80px"}
                                                width={"120px"}
                                                noborder="true" />
                                            <Typography margin="5px 0">{t("team_work_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("pro_centric")}</Typography>
                                            <KDImg src={process}
                                                height={"80px"}
                                                width={"120px"}
                                                noborder="true" />
                                            <Typography margin="5px 0">{t("pro_centric_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("hight_qualty")}</Typography>
                                            <KDImg src={quality} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("hight_qualty_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 0 0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("cus_support")}</Typography>
                                            <KDImg src={customer} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("cus_support_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                            </Flex>
                            <SizeBox />
                            <Flex row="row">
                                <Flex md={3} padding="0 5px 0 0!important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("tech_dev")}</Typography>
                                            <KDImg src={technology} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("tech_dev_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("invtion_change")}</Typography>
                                            <KDImg src={innovation} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("invtion_change_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("cra_work")}</Typography>
                                            <KDImg src={creativework} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("cra_work_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 0 0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("trans_neutrl")}</Typography>
                                            <KDImg src={transparency} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("trans_neutrl_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                            </Flex>
                            <SizeBox />
                            <Flex row="row">
                                <Flex md={3} padding="0 5px 0 0 !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("accounttibility")}</Typography>
                                            <KDImg src={accountibility} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("accounttibility_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px!important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("commitment")}</Typography>
                                            <KDImg src={commitment} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("commitment_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 5px !important">
                                    <ShadowCard height="210px">
                                        <Center>
                                            <Typography fntweight="bold" margin="0 0 10px 0">{t("feedback")}</Typography>
                                            <KDImg src={feedback} height={"80px"}
                                                width={"120px"} noborder="true" />
                                            <Typography margin="5px 0">{t("feedback_dec")}</Typography>
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                </Flex>
            </Container>
        </div>
    );
};