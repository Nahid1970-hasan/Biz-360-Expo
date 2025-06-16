import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../component/style/styled_button";;
import { Typography } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { HLLabel } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { CenterModal } from "../component/CenterModal";
import { checkUserInfo, updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
import { getHideEmail, getValueByLang } from "../utils/helper";
import { FinalRegModalPage } from "./FinalRegistrationModal";
import { InfoCard } from "../component/style/styled_card";
import { Container } from "../component/style/styled_contrainer";

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

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    useEffect(() => {
        if (regDataPub.postloading == "succeeded") {
            setTimeout(() => { setIsSuccess(true) }, 4000);
        }
    }, [regDataPub.postloading]);

    return (<>
        <Container>
            {timeout ? <Flex row="row" justifycenter="true">

                <Flex md={6} padding="0!important">
                    <Typography fntsize="titleLargeFontSize" >
                        {t("timeout")}
                    </Typography>

                    <Typography fntsize="dsTextFontSize" >
                        {t("please_try_again")}
                    </Typography>
                    <SizeBox />
                    <PrimaryButton
                        full="true"
                        color="primaryButton"
                        type="button"
                        onClick={() => navigate("/pmember")}
                    >
                        {t("back_to_membership")}
                    </PrimaryButton>
                </Flex>
            </Flex> :
                <Flex row="row" justifycenter="true">
                    <Flex md={12} padding="10px 0!important">
                        <InfoCard>
                            <Typography fntsize="dsTextFontSize" fntweight="bold"> {t("verification")}</Typography>
                        </InfoCard>
                    </Flex>
                    <InfoCard>
                        <Flex row="row">
                            <Flex md={6} padding="0!important">
                                <Typography fntsize="bodyTitleFontSize" margin="0 50px" fntweight="bold" txtalign="left">    {t("member_type")}{" "}{":"}{" "}{userInfo?.member_type == "BIZ" ? t("commercial") : t("individual")}</Typography>
                                <Typography fntsize="bodyTitleFontSize" margin="0 50px" fntweight="bold" txtalign="left">  {t("trader_type")}{" "}{":"}{" "}{userInfo?.is_seasonal == "Yes" ? (t("seasonal")) : (t("regular"))}</Typography>

                                {/* <Typography fntweight="bold" txtalign="left" margin="0 50px">
                                    {t("selected_group_name")}{" "}{":"}{" "}{getValueByLang(userInfo?.group_name || "{}") || ""}
                                </Typography>
                                <Typography fntweight="bold" txtalign="left" margin="0 50px">
                                    {t("fullname")}{" "}{":"}{" "}{(userInfo?.fullname || "") || ""}
                                </Typography>
                                <Typography fntweight="bold" txtalign="left" margin="0 50px">
                                    {t("username")}{" "}{":"}{" "}{(userInfo?.username || "") || ""}
                                </Typography>
                                <Typography fntweight="bold" txtalign="left" margin="0 50px">
                                    {t("mobile")}{" "}{":"}{" "}{(userInfo?.mobile_no || "") || ""}
                                </Typography>
                                <SizeBox /> */}


                            </Flex>
                            <Flex md={6} padding="0 10px!important">

                                <HLLabel bgcolor="hl_success" fntsize="smFont" txtalign="center" color="font">{"We've sent a verification code to your mobile"} {" "}<b>{getHideEmail(userInfo?.email || "")}</b></HLLabel>
                                <SizeBox />
                                <Input
                                    app="true"
                                    type="text"
                                    height="auto"
                                    txtalign="center"
                                    name="vfcode"
                                    maxLength={6}
                                    placeholder={t("ph_verify_code")}
                                    value={textCode}
                                    fntsize="cardTitleFontSize"
                                    onChange={(e) => setTextCode(e.target.value?.toLocaleUpperCase())}
                                    color={!textCode ? "error" : null}
                                />
                                <InlineDiv justifycontent={"end"}>
                                    <Typography fntsize="smFont" margin="0" txtalign="right">{"Code expire in"}</Typography>
                                    <Typography fntsize="smFont" color="error" margin="0" txtalign="right">{`${parseInt(timevalue / 60)}`.padStart(2, 0) + ":" + `${timevalue % 60}`.padStart(2, 0)}</Typography>
                                </InlineDiv>
                                <SizeBox />
                                <PrimaryButton
                                    full="true"
                                    onClick={() => {
                                        var data = {
                                            "username": userInfo.username,
                                            "mobile": userInfo.mobile,
                                            "email": userInfo.email,
                                            "ver_code": textCode
                                        }
                                        dispatch(checkUserInfo(data));
                                    }}>
                                    {t("submit")}
                                </PrimaryButton>
                            </Flex>
                        </Flex>

                    </InfoCard>

                </Flex>}
        </Container>
        <FinalRegModalPage open={isSuccess} setOpen={setIsSuccess} set_url_active={set_url_active} />
    </>)
};
