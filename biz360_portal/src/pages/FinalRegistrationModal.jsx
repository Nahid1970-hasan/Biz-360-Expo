import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { Flex } from "../component/style/styled_flex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { saveUserInfo, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import { KDImg } from "../component/style/styled_img";
import logo from "../assets/banner-icon/banner-biz360expo.png";
import { GL, Typography, ULine, WL } from "../component/style/styled_typography";
import { CardHeaderButton } from "../component/style/styled_card";
import { DownloadButton, PrimaryButton } from "../component/style/styled_button";
import { getValueByLang, useOutsideClicker } from "../utils/helper";
import { SizeBox } from "../component/style/styled_sizebox";
import { Link, useNavigate } from "react-router-dom";
import { HLLabel } from "../component/style/styled_label";
import styled from "styled-components";
import { Select } from "../component/style/styled_select";
import { InlineFlex } from "../component/style/styled_inlineflex";
import { Center } from "../component/style/styled_center";
import { config } from "../config/config";

const ScrollArea = styled.div`
    height: 400px;
    overflow: scroll;
    padding: 10px;
`

export const FinalRegModalPage = ({ open, setOpen = () => { }, set_url_active = () => { } }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const regDataPub = useSelector((state) => state.pubreg);
    const {HTTP, MEMBERPRT} =config;
    const [userInfo, setUserInfo] = useState({});
    const [selectedLang, setSelectedLang] = useState('en');
    const [subLng, setSubLng] = useState(false);
    const subLngRef = useRef(null);
    useOutsideClicker(subLngRef, () => { setSubLng(false) });
  

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    return<div style={{ userSelect: "none" }}>
     <Modal xs={10} open={open}
        onClose={() => {
            setOpen(false);
        }} outsideclick padding="0!important">

        <Flex row="row" justifycenter="center" style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            paddingBottom: '10px',
            backgroundColor: '#e4ffea',
            zIndex: 1,

        }}>
            <Flex md={12} padding="0 !important">
                <Center>
                    <KDImg src={logo} width={"260px"} height={"50px"} noborder="true" />
                </Center>
                <Typography fntsize="bodyHeader" fntweight="bold">
                    {t("head_title",{lng: selectedLang})}
                </Typography>
                <Typography fntsize="bodyTitleFontSize" fntweight="bold" >
                    {t("biz_title",{lng: selectedLang})}
                </Typography>
            </Flex>

            <Flex md={10} padding="0 !important">

                <Typography fntweight="bold" margin="5px 0" txtalign="right" fntsize="bulletinFont">
                    {t("biz_sub_title",{lng: selectedLang})}
                </Typography>
            </Flex>
            <Flex md={2} padding="5px 10px!important">
                <InlineFlex justifycontent="end">
                    <Typography
                        // color={localStorage.i18nextLng == "en" ? "cardContent" : "infoCardContent"}
                        txtalign="left"
                        fntcolor="font"
                        margin="0 5px"
                        onClick={(e) => { setSelectedLang("en") }}
                    >
                        {t("English")}
                    </Typography>
                    {" "}{" | "}{" "}
                    <Typography
                        fntcolor="font"
                        margin="0 5px"
                        onClick={(e) => { setSelectedLang("bn") }}
                        // onClick={(e) => setSubLng(!subLng)}
                        txtalign="left"
                    // color={localStorage.i18nextLng == "bn" ? "cardContent" : "infoCardContent"}
                    >
                        {t("বাংলা")}
                    </Typography>
                </InlineFlex>
                
            </Flex>

        </Flex>

        <ScrollArea>
            <Flex row="row" justifycenter="center">
                <Flex md={5} padding="5px 5px 0 10px !important">
                    <Typography txtalign="left" fntsize="cardSubTitleFontSize" fntweight="bold" >
                        {t("member_info",{lng: selectedLang})}
                    </Typography>
                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("member_type",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {userInfo?.member_type == "BIZ" ? t("commercial",{lng: selectedLang}) : userInfo?.member_type == "IND" ? t("individual",{lng: selectedLang}) : ""}
                            </Typography>

                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("trader_type",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {userInfo?.is_seasonal == "Yes" ? (t("seasonal_occ",{lng: selectedLang})) : (t("regular",{lng: selectedLang}))}
                            </Typography>

                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("field_member",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {getValueByLang(userInfo?.group_data?.group_shortname || "{}", selectedLang) || ""}
                            </Typography>

                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("fullname",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {userInfo.fullname || ""}
                            </Typography>

                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("user_id",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {userInfo.username || ""}
                            </Typography>

                        </Flex>
                    </Flex>

                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("mobile_no",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {userInfo.mobile || ""}
                            </Typography>

                        </Flex>
                    </Flex>

                    <Flex row="row">
                        <Flex md={4} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("email",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={7} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {userInfo.email || ""}
                            </Typography>

                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={6} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0" fntsize="fontBn">
                                {t("terms_condition",{lng: selectedLang})}
                            </Typography>

                        </Flex>
                        <Flex md={1} padding="0!important">
                            <Typography txtalign="left" margin="5px 0 0 0">
                                {":"}
                            </Typography>
                        </Flex>
                        <Flex md={5} padding="0!important">
                            <Typography txtalign="left" margin="8px 0 0 0" fntsize="fontBn">
                                {"Agreed" || ""}
                            </Typography>

                        </Flex>
                    </Flex>

                    {/* <Typography txtalign="left" margin="5px 0 0 0"  >
                    {t("member_type")}{":"} {" "}  {userInfo?.member_type == "BIZ" ? t("commercial") : userInfo?.member_type == "IND" ? t("individual") : ""}
                </Typography> */}

                    {/* <Typography txtalign="left" margin="5px 0 0 0"  >
                    {t("trader_type")}{":"} {" "} {userInfo?.is_seasonal == "Yes" ? (t("seasonal")) : (t("regular"))}
                </Typography> */}


                    {/* <Typography txtalign="left" margin="5px 0 0 0">
                    {t("field_member")}{":"} {" "}{getValueByLang(userInfo?.group_shortname || "{}") || ""}
                </Typography>
                <Typography txtalign="left" margin="5px 0 0 0">
                    {t("name")}{":"}  {" "}{userInfo.fullname || ""}
                </Typography> */}

                    {/* <Typography txtalign="left" margin="5px 0 0 0">
                    {t("user_id")}{":"} {" "}  {userInfo.username || ""}
                </Typography> */}
                    {/* 
                <Typography txtalign="left" margin="5px 0 0 0">
                    {t("mobile_no")}{":"} {" "} {userInfo.mobile || ""}
                </Typography>

                <Typography txtalign="left" margin="5px 0 0 0"  >
                    {t("email")}{":"} {" "} {userInfo.email || ""}
                </Typography> */}

                    {/* <Typography txtalign="left" margin="5px 0 5px 0">
                    {t("terms_condition")}{":"} {" "}{("Agreed") || ""}
                </Typography> */}

                </Flex>
                <Flex md={7} padding="0 !important">
                    <Typography fntsize="bodyTitleFontSize" fntweight="bold" txtalign="left" margin="5px 0 0 10px">
                        {t("intro_new_mem",{lng: selectedLang})}
                    </Typography>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important" >
                            <Typography fntsize="fontBn">
                                {t("step_1")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_1",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn">
                                {t("step_2",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_2",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn" >
                                {t("step_3",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_3",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn">
                                {t("step_4",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_4",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn">
                                {t("step_5",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_5",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn">
                                {t("step_6",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_6",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn">
                                {t("step_7",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_8",{lng: selectedLang})}
                            </Typography>
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("web_address",{lng: selectedLang})}{":"}{" "}
                                <a
                                    href="http://member.biz360expo.com/"
                                    target="_blank"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open('http://member.biz360expo.com/', '_blank', 'noopener,noreferrer');
                                    }}
                                >
                                    <WL>{"member.biz360expo.com"}</WL>
                                </a>
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} xs={1} padding="5px 0 0 5px !important">
                            <Typography fntsize="fontBn">
                                {t("step_8",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} xs={11} padding="5px 0  0 0  !important">
                            <Typography txtalign="left" fntsize="fontBn">
                                {t("new_mem_7",{lng: selectedLang})}
                            </Typography>
                        </Flex>
                    </Flex>
                    {/* <Flex row="row">
                        <Flex md={12} xs={11} padding="5px 0 0 0  !important">
                            <Typography txtalign="left" margin="0 0 0 35px" fntsize="fontBn">
                                {t("web_address")}{":"}{" "}
                                <a
                                    href="http://admin.biz360expo.com/"
                                    target="_blank"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open('http://admin.biz360expo.com/', '_blank', 'noopener,noreferrer');
                                    }}
                                >
                                    <WL>{"admin.biz360expo.com"}</WL>
                                </a>
                            </Typography>
                        </Flex>

                    </Flex> */}


                </Flex>

                {/* <Typography txtalign="left" margin="0 0 10px 0">
                    {t("selected_group_name")}{" "}{":"} {getValueByLang(userInfo?.group_name || "{}") || ""}
                </Typography> */}

                <ULine />
                <Flex md={12} padding="0 10px !important">
                    <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="10px 0 0 10px">
                        {t("mem_sup",{lng: selectedLang})}
                    </Typography>
                    <Typography fntsize="bodySubTitleFontSize" fntweight="bold" txtalign="left" margin="0 0 0 10px">
                        <GL> {t("mem_wish")} </GL>
                    </Typography>
                    <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="10px 0 0 10px">
                        {t("thank",{lng: selectedLang})}
                    </Typography>
                    <Flex row="row">
                        <Flex md={12} padding="0 !important"><Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="0 0 0 10px">
                            {t("biz",{lng: selectedLang})}
                        </Typography></Flex>
                        <Flex md={12} padding="0 !important">
                            <Center>
                                <PrimaryButton
                                    onClick={() => {
                                        dispatch(updateUserInfo({ "tabpos": 0, "info": {} }));
                                        window.location.href = (HTTP+MEMBERPRT);
                                    }} target="_blank"
                                    style={{
                                        lineHeight: "normal",
                                        display: "inline-flex",
                                        alignItems: "center",
                                    }}
                                >{t("go_login",{lng: selectedLang})}</PrimaryButton>
                            </Center>

                        </Flex>


                    </Flex>


                </Flex>

            </Flex>
        </ScrollArea>
    </Modal></div>
}