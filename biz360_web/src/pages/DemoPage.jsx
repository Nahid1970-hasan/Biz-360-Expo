import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { PrimaryButton } from "../component/style/styled_button";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { SizeBox } from "../component/style/styled_sizebox";
import 'react-international-phone/style.css';
import { Toast } from "../component/Toast";
import { NotNetwork } from "./NoNetwork";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { Typography } from "../component/style/styled_typography";
import useTitle from "../hooks/useTitle";

export const DemoMemberPage = () => {

    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    useTitle(t('mem_title'))

    return bizGroupData.loading == "nonetwork" ? <NotNetwork /> : (
        <>
            {(regDataPub.loading == "idle" || regDataPub.loading == "pending") ? <></> : (
                regDataPub.loading != "succeeded" && <Toast color="error" msg={regDataPub.msg} />)}
            <Suspense>
                <Container>
                    <Flex row="row" justifycenter="true">
                        <Flex md={12} sm={12}>
                            <Flex row="row">
                                <InfoCard>
                                    <Flex md={12} padding="0 !important">
                                        <Typography fntsize="bodyHeader" fntweight="bold">
                                            {t("benefits_of_membership")}
                                        </Typography>
                                    </Flex>
                                </InfoCard>
                                <SizeBox />

                                <Flex md={12} padding="10px 0 !important">
                                    <InfoCard>
                                        <Typography fntsize="bodySubTitleFontSize" txtalign="left">{t("ben_key")}</Typography>
                                        <SizeBox />
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key1")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key2")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key3")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key4")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key5")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key6")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key7")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key8")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key9")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key10")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key11")}</Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row" justifycontent="start">
                                            <Flex md={.3} padding="0!important">
                                                <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            </Flex>
                                            <Flex md={11.7} padding="0!important">
                                                <Typography fntsize="bodyContentFontSize" txtalign="left"> {t("ben_key12")}</Typography>
                                            </Flex>
                                        </Flex>
                                      {/* <InlineDiv justifycontent="start">
                                            <i color="font" margin="0 10px 0 0" className="material-icons">keyboard_double_arrow_right</i>
                                            <Typography fntsize="bodyContentFontSize" txtalign="left">{t("ben_key12")}</Typography>
                                        </InlineDiv> */}
                                        {/* <Flex md={12} sm={12} padding="10px 0 0 0!important">
                                            <CardHeaderButton>
                                                <PrimaryButton
                                                    onClick={() => { navigate("/pmemsup") }}
                                                >
                                                    {t("become_member")}
                                                </PrimaryButton>

                                            </CardHeaderButton>
                                        </Flex> */}
                                    </InfoCard>

                                </Flex>



                            </Flex>

                        </Flex>

                    </Flex>
                </Container>
            </Suspense>

        </>

    );
};
