import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../component/style/styled_button";;
import { GL, Typography, WL } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { HLLabel, Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { CenterModal } from "../component/CenterModal";
import { checkUserInfo, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import { getHideEmail, getValueByLang } from "../utils/helper";
import { FinalRegModalPage } from "./FinalRegistrationModal";
import { CardHeaderButton, CenterButton, InfoCard } from "../component/style/styled_card";
import { Container } from "../component/style/styled_contrainer";
import styled from "styled-components";
import finish from "../assets/small-icon/finish-icon-biz360expo.png";
import { KDImg } from "../component/style/styled_img";
import back from "../assets/small-icon/back-icon-biz360expo.png";


export const CustSpan = styled.span`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : "0")};
`;

export const MembershipStep5Page = ({ set_url_active = () => { } }) => {
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [textCode, setTextCode] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [timevalue, setTimeValue] = useState(600);
    const [timeout, settimeout] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (timevalue > 0) {
            settimeout(false)
            setTimeout(() => setTimeValue(timevalue - 1), 1000);
        } else {
            settimeout(true)
        }
    }, [timevalue]);

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) },
        [regDataPub.userInfo]);


    useEffect(() => {
        if (regDataPub.postloading == "succeeded") {
            setTimeout(() => { setIsSuccess(true), dispatch(updateUserInfo({ "tabpos": 0, "info": userInfo })); }, 4000);
        }
    }, [regDataPub.postloading]);

    return (<div style={{ userSelect: "none" }}>
        <Container>
            {timeout ? <Flex row="row" justifycenter="true">

                {/* <Flex md={12} padding="0!important">
                    <Typography fntsize="titleLargeFontSize" >
                        {t("timeout")}
                    </Typography>

                    <Typography fntsize="dsTextFontSize" >
                        {t("please_try_again")}
                    </Typography>
                    <SizeBox />
                    <Flex row="row">
                        <Flex md={12} justifycenter="center" padding="10px 0 0 0!important" xs={12}>
                           
                                <PrimaryButton
                                    color="primaryButton"
                                    type="button"
                                    onClick={() => navigate("/pmemsup")}
                                >
                                    <KDImg
                                        src={back}
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                    />
                                    {t("back_to_signup")}
                                </PrimaryButton>
                         
                        </Flex>
                    </Flex>


                </Flex> */}
                <Flex
                    md={12}
                    padding="0!important"
                    justifycenter="center"  
                    aligncenter="center"   
                    direction="column"    
                    style={{ textAlign: "center" }}
                >
                    <Typography fntsize="titleLargeFontSize" style={{ width: "100%" }}>
                        {t("timeout")}
                    </Typography>

                    <Typography fntsize="dsTextFontSize" style={{ width: "100%" }}>
                        {t("please_try_again")}
                    </Typography>

                    <SizeBox />

                    <Flex
                        justifycenter="center"
                        padding="10px 0 0 0!important"
                        style={{ width: "100%" }}
                    >
                        <CenterButton >
                            <PrimaryButton
                                color="primaryButton"
                                type="button"
                                onClick={() => navigate("/pmemsup")}
                            >
                                <KDImg
                                    src={back}
                                    height={"auto"}
                                    width={"auto"}
                                    noborder="true"
                                />
                                {t("back_to_signup")}
                            </PrimaryButton>
                        </CenterButton>

                    </Flex>
                </Flex>
            </Flex> :
                <Flex row="row" justifycenter="true">

                    <InfoCard>
                        <Flex row="row">
                            <Flex md={5} padding="0!important">
                                <Typography fntsize="bodyTitleFontSize" fntweight="bold" txtalign="left" > {t("verify_page")}</Typography>
                                <Flex row="row">
                                    <Flex md={4} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("member_type")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={7} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {userInfo?.member_type == "BIZ" ? t("commercial") : t("individual")}
                                        </Typography>

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={4} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("trader_type")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={7} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {userInfo?.is_seasonal == "Yes" ? (t("seasonal_occ")) : (t("regular"))}
                                        </Typography>

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={4} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("field_member")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={7} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {getValueByLang(userInfo?.group_data?.group_shortname || "{}") || ""}
                                        </Typography>

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={4} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("fullname")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={7} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {(userInfo?.fullname || "") || ""}
                                        </Typography>

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={4} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("user_id")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={7} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {(userInfo?.username || "") || ""}
                                        </Typography>

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={4} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("mobile_no")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={7} padding="0!important">
                                        {i18n.language === 'en' ? <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {(userInfo?.mobile || "") || ""}
                                        </Typography> : <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn" fnfamily="var(--dashboard-font)">
                                            {(userInfo?.mobile || "") || ""}
                                        </Typography>}

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={6} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                            {t("terms_condition")}
                                        </Typography>

                                    </Flex>
                                    <Flex md={1} padding="0!important">
                                        <Typography txtalign="left" margin="5px 0 0 0">
                                            {":"}
                                        </Typography>
                                    </Flex>
                                    <Flex md={5} padding="0!important">

                                        {i18n.language === 'en' ? <Typography txtalign="left" margin="8px 0 0 0" fntsize="fontBn">
                                            {"Agreed" || ""}
                                        </Typography> : <Typography txtalign="left" fnfamily="var(--dashboard-font)" margin="8px 0 0 0" fntsize="fontBn">
                                            {"Agreed" || ""}
                                        </Typography>}

                                    </Flex>
                                </Flex>
                                <SizeBox />


                            </Flex>
                            <Flex md={7} padding="0 0 0 20px!important">

                                {localStorage.i18nextLng == "en" ? <Typography txtalign="left" fntweight="bold" fntsize="bodyTitleFontSize">
                                    <GL >  {t("verification_title")} {userInfo?.mobile || ""}</GL>
                                </Typography> :
                                    <Typography txtalign="left" fntweight="bold" fntsize="bodyTitleFontSize">
                                        <GL >  {t("verifi_title_1")} {userInfo?.mobile || ""} {" "} {t("verifi_title_2")}</GL>
                                    </Typography>}



                                <SizeBox />
                                <Flex row="row">
                                    <Flex md={5} padding="0!important">
                                        <Label>{t("verification_code")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            txtalign="center"
                                            name="vfcode"
                                            maxLength={6}
                                            placeholder={t("ph_verify_code")}
                                            value={textCode}
                                            fntsize="cardTitleFontSize"
                                            onChange={(e) => setTextCode(e.target.value?.toLocaleUpperCase())}
                                            color={!textCode ? "error" : null}
                                        />
                                        <InlineDiv justifycontent={"start"}>
                                            <Typography fntsize="smFont" margin="5px 0 0 0" txtalign="left">{t("time_left")}</Typography>
                                            {localStorage.i18nextLng == "en" ? <Typography fntsize="smFont" color="error" margin="5px 0 0 0" txtalign="right">{`${parseInt(timevalue / 60)}`.padStart(2, 0) + ":" + `${timevalue % 60}`.padStart(2, 0)}</Typography> :
                                                <Typography fntsize="smFont" color="error" fnfamily="var(--dashboard-font)" margin="5px 0 0 0" txtalign="right">{`${parseInt(timevalue / 60)}`.padStart(2, 0) + ":" + `${timevalue % 60}`.padStart(2, 0)}</Typography>}
                                        </InlineDiv>
                                        <InlineDiv justifycontent={"start"}>
                                            <CardHeaderButton start="true" top="15px">
                                                <PrimaryButton
                                                    onClick={() => {
                                                        var data = {
                                                            "username": userInfo.username,
                                                            "mobile": userInfo.mobile,
                                                            "email": userInfo.email,
                                                            "ver_code": textCode
                                                        }
                                                        dispatch(checkUserInfo(data));
                                                    }}>

                                                    {t("signup_finish")}
                                                    <KDImg
                                                        src={finish}
                                                        height={"auto"}
                                                        width={"auto"}
                                                        noborder="true"
                                                    />
                                                    {/* <CustSpan margin="5px 0 0 2px" color="font" className="material-icons">play_circle</CustSpan> */}

                                                </PrimaryButton>
                                            </CardHeaderButton>
                                        </InlineDiv>


                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>

                    </InfoCard>

                </Flex>}
        </Container>
        <FinalRegModalPage open={isSuccess} setOpen={setIsSuccess} set_url_active={set_url_active} />
    </div>)
};
