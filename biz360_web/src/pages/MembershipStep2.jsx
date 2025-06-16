import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { InlineFlex } from "../component/style/styled_inlineflex";
import indv from "../assets/membership01.png";
import bizl from "../assets/membership02.png";
import { KDImg } from "../component/style/styled_img";
import { CheckboxChildren } from "../component/Checkbox";
import { Label } from "../component/style/styled_label";
import { Typography, ULine } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { RadioChildren } from "../component/RadioButton";
import { updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
export const MembershipStep2Page = ({ set_url_active = () => { }, set_url_pos = () => { } }) => {

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [member_type, set_member_type] = useState("");
    return (<>
        <Flex row="row">
                <Flex md={12} sm={12} padding="0 0 10px 0 !important">
                <InfoCard>
                    <Typography fntsize="bodyHeader" fntweight="bold">
                        {t("choose_member_type")}
                    </Typography>
                    </InfoCard>
                </Flex>
          
           
                <Flex md={12} sm={12} padding="0!important">
                <InfoCard>
                    <InlineFlex justifycontent="start">

                        <RadioChildren size={"md"} checked={member_type == "IND"} onClick={() => { set_member_type("IND") }}>
                            <div>
                                <Label margin="0 10px">{t("individual")}</Label>
                                <KDImg
                                    src={indv}
                                    height={"200px"}
                                    noborder="true"
                                />
                            </div>
                        </RadioChildren>
                        <RadioChildren size={"md"} checked={member_type == "BIZ"} onClick={() => { set_member_type("BIZ") }}>
                            <div>
                                <Label margin="0 10px">{t("commercial")}</Label>
                                <KDImg
                                    src={bizl}
                                    height={"200px"}
                                    noborder="true"
                                />
                            </div>
                        </RadioChildren>

                    </InlineFlex>
                    <CardHeaderButton>
                        <PrimaryButton
                            onClick={() => { navigate("/pmemsup") }}
                        >
                            {t("prev")}
                        </PrimaryButton>
                        <PrimaryButton
                            disabled={!member_type}
                            onClick={() => {
                                set_url_active("categorypanel"),
                                    dispatch(updateUserInfo({ "tabpos": 2, "info": { "member_type": member_type } }))
                            }}
                        >
                            {t("next")}
                        </PrimaryButton>

                    </CardHeaderButton>
                    </InfoCard>
                </Flex>
        </Flex></>)
};
