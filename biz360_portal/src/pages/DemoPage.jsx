import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { InfoCard } from "../component/style/styled_card";
import { SizeBox } from "../component/style/styled_sizebox";
import 'react-international-phone/style.css';
import { Toast } from "../component/Toast";
import { NotNetwork } from "./NoNetwork";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Typography, ULine } from "../component/style/styled_typography";
import useTitle from "../hooks/useTitle";
import arrow from "../assets/small-icon/bullet-Icon-biz360expo.png";
import { KDImg } from "../component/style/styled_img";


export const DemoMemberPage = () => {

    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    useTitle(t('ben_title'))

    return bizGroupData.loading == "nonetwork" ? <NotNetwork /> : (
        <div style={{ userSelect: "none" }}>
            {(regDataPub.loading == "idle" || regDataPub.loading == "pending") ? <></> : (
                regDataPub.loading != "succeeded" && <Toast color="error" msg={regDataPub.msg} />)}
            <Suspense>
                <Container>
                    <Flex md={12} xs={12} padding="10px 0 !important">
                        <Flex row="row">
                            <Flex md={3} xs={12} padding="0 5px 0 0 !important">
                                <InfoCard>
                                    <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                        {t("benefit_of_membership")}
                                    </Typography>
                                    <ULine />
                                </InfoCard>
                            </Flex>
                            <Flex md={9} xs={12} padding="0 0 0 5px !important">
                                <InfoCard>
                                    <Typography fntsize="bodySubTitleFontSize" txtalign="left" fntweight="bold">
                                        {t("ben_key")}
                                    </Typography>
                                    <SizeBox />

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_1")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key1")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_2")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key2")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_3")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key3")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_4")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key4")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_5")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key5")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_6")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key6")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_7")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key7")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_8")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key8")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_9")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key9")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_10")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key10")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_11")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key11")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                    <Flex row="row" justifycontent="start" margin="5px 0">
                                        <Flex md={.4} xs={1} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="left" >
                                                {t("step_12")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={11.6} xs={11} padding="0!important">
                                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                                {t("ben_key12")}
                                            </Typography>
                                        </Flex>
                                    </Flex>
                                </InfoCard>
                            </Flex>
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </div>
    );
};
