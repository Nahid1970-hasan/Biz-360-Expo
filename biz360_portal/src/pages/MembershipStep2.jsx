import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { InFlex, InlineFlex } from "../component/style/styled_inlineflex";
import indv from "../assets/member-type/individual-icon-biz360expo.png";
import bizl from "../assets/member-type/commercial-icon-biz360expo.png";
import { KDImg } from "../component/style/styled_img";
import { Label } from "../component/style/styled_label";
import { Typography, ULine } from "../component/style/styled_typography";
import { RadioChildren } from "../component/RadioButton";
import { initSubGroup, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import next from "../assets/small-icon/next-icon-biz360expo.png";
import back from "../assets/small-icon/back-icon-biz360expo.png";
import { SizeBox } from "../component/style/styled_sizebox";
import { Center } from "../component/style/styled_center";

export const MembershipStep2Page = ({ set_url_active = () => { }, set_url_pos = () => { } }) => {

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [member_type, set_member_type] = useState("");
    return (<div style={{ userSelect: "none" }}>
        <Flex row="row">
            <Flex md={12} xs={12} padding="0!important">
                <InfoCard>
                    <Flex row="row">
                        <Flex md={12} padding="0 0 10px 0!important">
                            <ShadowCard>
                                <Typography fntsize="cardSubTitleFontSize" fntweight="bold" txtalign="left" >
                                    {t("pro_member_type")}
                                </Typography>
                            </ShadowCard>
                        </Flex>
                    </Flex>



                    <Flex row="row">
                        <Flex md={6} padding="0 5px 0 0!important">
                            <ShadowCard>
                                <Flex row="row">
                                    <Flex md={12}><Typography fntsize="bodyTitleFontSize">{t("inv_mem")} </Typography></Flex>
                                    <Flex md={8} padding="0 !important">
                                        <InFlex justifycontent="start" >
                                            <RadioChildren size={"md"} checked={member_type == "IND"} onClick={() => { set_member_type("IND") }}>
                                                <div>
                                                    <KDImg
                                                        src={indv}
                                                        height={"auto"}
                                                        width={"auto"}
                                                        noborder="true"
                                                    />
                                                </div>


                                            </RadioChildren>
                                        </InFlex>
                                    </Flex>

                                    <Flex md={4} padding="0 !important"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'  // This centers all text vertically
                                        }}
                                    >
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("professional")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("specialist")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("consultant")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("entrepreneur")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("employee")}
                                        </Typography >
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("work_staff")}
                                        </Typography>
                                    </Flex>

                                </Flex>
                            </ShadowCard>


                            {/* <Typography txtalign="left" margin="10px 0 5px 0">
                                {t("inv_desc")}
                            </Typography> */}

                        </Flex>
                        <Flex md={6} padding="0 0 0 5px !important">
                            <ShadowCard>
                                <Flex row="row">
                                    <Flex md={12}><Typography fntsize="bodyTitleFontSize">{t("biz_mem")} </Typography></Flex>
                                    <Flex md={8} padding="0 !important">
                                        <InFlex justifycontent="start" >
                                            <RadioChildren size={"md"} checked={member_type == "BIZ"} onClick={() => { set_member_type("BIZ") }}>
                                                <KDImg
                                                    src={bizl}
                                                    height={"auto"}
                                                    width={"auto"}
                                                    noborder="true"
                                                />
                                            </RadioChildren>
                                        </InFlex>



                                    </Flex>
                                    <Flex md={4} padding="0 !important"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'  // This centers all text vertically
                                        }}
                                    >
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("bus_entity")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("organization")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("association")}
                                        </Typography>
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("council")}
                                        </Typography>

                                        <Typography txtalign="left" margin="5px 0">
                                            {t("industry")}
                                        </Typography >
                                        <Typography txtalign="left" margin="5px 0">
                                            {t("shop_market")}
                                        </Typography>
                                    </Flex>
                                </Flex>
                            </ShadowCard>



                        </Flex>
                    </Flex>
                    <SizeBox />
                    <ShadowCard>
                        <Flex row="row">
                            <Flex md={6} padding="0 5px !important">
                                <CardHeaderButton>
                                    <PrimaryButton
                                        onClick={() => { navigate("/pmemsup") }}
                                    >
                                        <KDImg
                                            src={back}
                                            height={"auto"}
                                            width={"auto"}
                                            noborder="true"
                                        />
                                        {t("prev")}
                                    </PrimaryButton>

                                </CardHeaderButton>

                            </Flex>
                            <Flex md={6} padding="0 5px !important">
                                <CardHeaderButton start="true">

                                    <PrimaryButton
                                        disabled={!member_type}
                                        onClick={() => {
                                            dispatch(initSubGroup());
                                            set_url_active("categorypanel"),
                                                dispatch(updateUserInfo({ "tabpos": 2, "info": { "member_type": member_type } }))
                                        }}
                                    >
                                        {t("next")}
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
                    </ShadowCard>

                </InfoCard>
            </Flex>
        </Flex></div>)
};
