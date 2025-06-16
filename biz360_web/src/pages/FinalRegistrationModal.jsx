import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { Flex } from "../component/style/styled_flex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { saveUserInfo, updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
import { KDImg } from "../component/style/styled_img";
import logo from "../assets/logo.jpg";
import { Typography } from "../component/style/styled_typography";
import { CardHeaderButton } from "../component/style/styled_card";
import { DownloadButton, PrimaryButton } from "../component/style/styled_button";
import { getValueByLang } from "../utils/helper";



export const FinalRegModalPage = ({ open, setOpen = () => { }, set_url_active = () => { } }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const regDataPub = useSelector((state) => state.pubreg);

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    return <Modal xs={6} open={open} outsideclick>
        <Flex row="row">
            <Flex md={12}>
                <div style={{ height: "80vh", padding: "10px 0" }}>
                    <Flex row="row">
                        <Flex md={2} padding="0 !important"> </Flex>
                        <Flex md={8} padding="0 0 10px 0 !important">
                            <KDImg src={logo} width={"100%"} noborder="true" />
                            <Typography fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0">
                                {t("biz_title")}
                            </Typography>
                        </Flex>

                        <Flex md={2} padding="0 !important"></Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={12} padding="0 !important">
                            <Typography txtalign="left" fntweight="bold" margin="10px 0">
                                {t("biz_sub_title")}
                            </Typography>

                            <Typography txtalign="left" margin="10px 0 0 0">
                                {t("member_type")}{" "}{":"}  {userInfo?.member_type == "BIZ" ? t("commercial") : userInfo?.member_type == "IND" ? t("individual") : ""}
                            </Typography>
                            <Typography txtalign="left" margin="0 0 10px 0">
                                {t("selected_group_name")}{" "}{":"} {getValueByLang(userInfo?.group_name || "{}") || ""}
                            </Typography>
                        </Flex>

                        <Flex md={12} padding="0 !important">
                            <Typography txtalign="left" fntweight="bold" margin="10px 0">
                                {t("info_member")}
                            </Typography>

                            <Typography txtalign="left" margin="10px 0 0 0">
                                {t("name")}{" "}{":"} {userInfo.fullname || ""}
                            </Typography>
                            <Typography txtalign="left">
                                {t("mobile_no")}{" "}{":"} {userInfo.mobile || ""}
                            </Typography>
                            <Typography txtalign="left">
                                {t("trad_type")}{" "}{":"} {userInfo?.is_seasonal == "No" ? "Regular Trader" : userInfo?.is_seasonal == "Yes" ? "Seasonal Trader" : ""}
                            </Typography>
                        </Flex>

                        <Flex md={12} padding="10px 0 0 0!important">
                            <Typography txtalign="left" fntweight="bold" margin="10px 0">
                                {t("biz_ftitle")}
                            </Typography>
                        </Flex>
                        <Flex md={12} padding="10px 0 0 0!important">
                            <CardHeaderButton >
                                <PrimaryButton onClick={() => {
                                    dispatch(updateUserInfo({ "tabpos": 0, "info": {} }));
                                    set_url_active("quidelines");
                                }}>{t("okay")}</PrimaryButton>
                            </CardHeaderButton>
                        </Flex>
                    </Flex>
                </div>
            </Flex>

        </Flex>
    </Modal>
}