import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { AlertButton, PrimaryButton } from "../component/style/styled_button";
import { Card, CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { CheckboxChildren, CheckboxLabel } from "../component/Checkbox";
import { Label } from "../component/style/styled_label";
import { SizeBox } from "../component/style/styled_sizebox";
import { saveUserInfo, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import logo from "../assets/banner-icon/banner-biz360expo.png";
import { KDImg } from "../component/style/styled_img";
import { Typography, TypographyOl, ULine } from "../component/style/styled_typography";
import styled from "styled-components";
import { InlineDiv, InlineFlex } from "../component/style/styled_inlineflex";
import { config } from "../config/config";
import next from "../assets/small-icon/next-icon-biz360expo.png";
import back from "../assets/small-icon/back-icon-biz360expo.png";
import { Select } from "../component/style/styled_select";
import { Center } from "../component/style/styled_center";
import { Menu } from "../component/Menu";
import ImageCaptcha from "../component/ImgCaptcha";
const ScrollArea = styled.div`
    height: 400px;
    overflow: scroll;
    padding: 10px;
`


export const TermsConditionModal = ({ open, setOpen = () => { }, set_url_active = () => { }, reqdata }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const wraperRef = useRef(null);
        const [validCaptcha, setValidCaptcha] = useState(true);
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const regDataPub = useSelector((state) => state.pubreg);
    const [isPreserveData, setIsPreserveData] = useState(false);
    const [isTermsPolicy, setIsTermsPolicy] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const { ConfigDate } = config;
    const [selectedLang, setSelectedLang] = useState('en');
    const [subLng, setSubLng] = useState(false);

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    function fetchData(e) {
        e.preventDefault(e);
        dispatch(saveUserInfo(Object.assign({ ...userInfo })));
    }

    useEffect(() => {
        if (regDataPub.loading == "succeeded") {
            setTimeout(() => { setOpen(false); dispatch(updateUserInfo({ "tabpos": 5, "info": userInfo })); set_url_active("verification"); }, 4000);
        } else if (regDataPub.loading == "failed") {
            setOpen(false);
        }
    }, [regDataPub.loading]);

    return <div style={{ userSelect: "none" }}>
        <Modal title={t("signup_terms_condition", { lng: selectedLang })} md={8} sm={8} xs={11} open={open} outsideclick>
            <Flex row="row" style={{
                position: 'sticky',
                top: 0,
                background: 'white',
                paddingBottom: '10px',
                backgroundColor: '#e4ffea',
                zIndex: 1,

            }}>
                <Flex md={12} padding="0!important">
                    <Flex row="row" justifycenter="center">
                        <Flex md={2} ></Flex>
                        <Flex md={8} padding="0!important">
                            <Center>
                                <KDImg src={logo} width={"260px"} height={"50px"} noborder="true" />
                            </Center>

                            <Typography fntsize="bodyHeader" fntweight="bold">
                                {t("head_title", { lng: selectedLang })}
                            </Typography>
                            <Typography fntsize="bodyTitleFontSize" fntweight="bold">
                                {t("trms_headline", { lng: selectedLang })}
                            </Typography>
                        </Flex>
                        <Flex md={2} padding="80px 0 0 0!important">
                            <InlineFlex justifycontent="end">
                                <Typography
                                    // color={localStorage.i18nextLng == "en" ? "cardContent" : "infoCardContent"}
                                    txtalign="left"
                                    fntcolor="font"
                                    margin="0 5px"
                                    onClick={(e) => { setSelectedLang("en"); }}
                                >
                                    {t("English")}
                                </Typography>
                                {" "}{" | "}{" "}
                                <Typography
                                    fntcolor="font"
                                    margin="0 5px"
                                    onClick={(e) => { setSelectedLang("bn") }}
                                    txtalign="left"
                                >
                                    {t("বাংলা")}
                                </Typography>
                            </InlineFlex>
                            {/* <CardHeaderButton >
                            <Select
                                app="true"
                                name="main_lang"
                                width="100%"
                                value={selectedLang}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">English</option>
                                <option value="bn">বাংলা</option>
                            </Select>
                        </CardHeaderButton> */}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <ScrollArea>
                <Flex row="row">
                    <Flex md={12} padding="0!important">
                        <Typography fntsize="bodySubTitleFontSize" txtalign="left">
                            {t("terms_date", { lng: selectedLang })}  {ConfigDate}
                        </Typography>
                        <SizeBox />
                        <Typography txtalign="left">
                            {t("trems_desc", { lng: selectedLang })}
                        </Typography>
                        <SizeBox />
                        <Typography txtalign="left" fntweight="bold">
                            {t("trms_right_title", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_1", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_1", { lng: selectedLang })}</span>
                            </InlineDiv>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_2", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_2", { lng: selectedLang })}</span>
                            </InlineDiv>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_3", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_3", { lng: selectedLang })}</span>
                            </InlineDiv>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_4", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_4", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <Typography txtalign="left" fntweight="bold">
                            {t("package", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_5", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_5", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <Typography txtalign="left" fntweight="bold">
                            {t("trial_period", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_6", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_6", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <Typography txtalign="left" fntweight="bold">
                            {t("mem_renewal", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_7", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_7", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <Typography txtalign="left" fntweight="bold">
                            {t("refund_policy", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_8", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_8", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <Typography txtalign="left" fntweight="bold">
                            {t("mem_responsibility", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_9", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_9", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <Typography txtalign="left" fntweight="bold">
                            {t("data_security", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_10", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_10", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>

                        <Typography txtalign="left" fntweight="bold">
                            {t("dis_law_env", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_11", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_11", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>

                        <Typography txtalign="left" fntweight="bold">
                            {t("demarketing", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_12", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_12", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>

                        <Typography txtalign="left" fntweight="bold">
                            {t("chng_policy", { lng: selectedLang })}
                        </Typography>
                        <TypographyOl>
                            <InlineDiv alignitems="start" justifycontent="start" txtalign={"left"}>
                                {t("step_13", { lng: selectedLang })}{" "}
                                <span>{t("trm_rdesc_13", { lng: selectedLang })}</span>
                            </InlineDiv>
                        </TypographyOl>
                        <SizeBox />
                    </Flex>
                    <ULine />
                    <Flex md={12} padding="0!important">
                        <CheckboxChildren checked={isTermsPolicy} onClick={() => setIsTermsPolicy(!isTermsPolicy)} size={"md"}>
                            <Label margin="0">{t("signup_tc_agree_1", { lng: selectedLang })}</Label>
                        </CheckboxChildren>
                    </Flex>
                    <Flex md={12} padding="0!important">
                        <CheckboxChildren checked={isPreserveData} onClick={() => setIsPreserveData(!isPreserveData)} size={"md"}>
                            <Label margin="0">{t("signup_tc_agree_2", { lng: selectedLang })}</Label>
                        </CheckboxChildren>
                    </Flex>
                    <Flex row="row">
                        <Flex md={12}>
                              <CheckboxLabel disabled={validCaptcha} checked={validCaptcha} onClick={() => {
                                !validCaptcha && setOpen(!open);
                            }} label={t("iam_human")} labelcolor="font" size={"md"} />

                            <div ref={wraperRef}>
                                <Menu open={open} left={(buttonRef?.current?.offsetLeft + 30) + "px"} top={(buttonRef?.current?.offsetTop - 200) + "px"}>
                                    <Card>
                                        <ImageCaptcha setOpen={(setOpen)} setValidCaptcha={setValidCaptcha} />
                                    </Card>
                                </Menu>
                            </div>
                        </Flex>
                        <Flex md={6} padding="10px 5px 0 0  !important">
                            <CardHeaderButton>
                                <PrimaryButton onClick={() => {
                                    set_url_active("memberinfo");
                                    dispatch(updateUserInfo({ "tabpos": 3, "info": userInfo }));
                                    setOpen(false);
                                }}>
                                    <KDImg
                                        src={back}
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                    />

                                    {t("back", { lng: selectedLang })}
                                </PrimaryButton>
                            </CardHeaderButton>
                        </Flex>
                        <Flex md={6} padding="10px 0 0 5px!important">
                            <CardHeaderButton start="true">

                                <PrimaryButton
                                    disabled={!(isPreserveData && isTermsPolicy)}
                                    onClick={fetchData}
                                    ref={buttonRef}
                                >
                                    {t("next", { lng: selectedLang })}
                                    <KDImg
                                        src={next}
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                    />

                                </PrimaryButton>

                            </CardHeaderButton>
                        </Flex>
                    </Flex>

                </Flex>
            </ScrollArea>
        </Modal ></div>
}