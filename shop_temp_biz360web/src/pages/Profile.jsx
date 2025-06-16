import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { Flex } from "../component/style/styled_flex";
import { ProfileDetail } from "../features/profile/ProfileDetail";
import { ProfileModal } from "../features/profile/ProfileModal";
import { loadBizprofile } from "../features/profile/profile_slice";
import { ProfileUserModal } from "../features/profile/ProfileUserModal";
import { ProfileBussModal } from "../features/profile/ProfileBussModal";
import { ProfileCp_1Modal } from "../features/profile/ProfileCp_1Modal";
import { ProfileCp_2Modal } from "../features/profile/ProfileCp_2Modal";
import styled from "styled-components";
import { CardBody, CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { Typography, ULine } from "../component/style/styled_typography";
import { PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { getValueByLang, langs } from "../utils/helper";

const ActiveButton = styled(PrimaryButton)`
    border-style: ${({ active }) => (active ? "solid" : "none")};
    border-color: ${({ theme, active }) => theme.colors[active ? "primary" : 'primaryActive']};
    border-width: 4px;
    border-radius: 0;
    color: ${({ theme }) => theme.colors.font};
    background: ${({ theme, active }) => theme.colors[active ? "primary" : 'primaryActive']};
    height: 30px !important;
    :hover{
        background: ${({ theme }) => theme.colors.bg};
    }
`;

export const ProfilePage = () => {
    const user = useSelector((state) => state.bizprofile);
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [edituser, setEditUser] = useState(false);
    const [editBuss, setEditBuss] = useState(false);
    const [editcp1_info, setEditcp1_info] = useState(false);
    const [editcp2_info, setEditcp2_info] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const [url_active, set_url_active] = useState("user");

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadBizprofile());
        dispatch(loadPage({
            title: "profile", button: false, buttonText: "update_profile",
            // onClick: () => {
            //     url_active == "user" ? setEditUser(true) : url_active == "business" ? setEditBuss(true) : url_active == "cp1_info" ? setEditcp1_info(true) :
            //         url_active == "cp2_info" ? setEditcp1_info(true) : setEditModal(true)

            // }
        }))
    }, []);

    const handleUserClick = () => {
        set_url_active("user");
    };

    const handleBusinessClick = () => {
        set_url_active("business");
    };

    const handleCustomer1Click = () => {
        set_url_active("cp1_info");
    };

    const handleCustomer2Click = () => {
        set_url_active("cp2_info");
    };
    const handleSubscriptionClick = () => {
        set_url_active("subscription");
    };

    // useEffect(() => {
    //     profileLoading.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    // }, [profileLoading.loading]);

    // useEffect(() => {
    //     profileLoading.updateLoading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    // }, [profileLoading.updateLoading]);

    return <>
        {/* {(profileLoading.updateLoading == "idle" || profileLoading.updateLoading == "pending") ? <></> : (
            profileLoading.updateLoading == "succeeded" ? (
                <Toast msg={profileLoading.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={profileLoading.msg} />
            )
        )} */}
        <CardBody>
            <Flex row="row">
                <Flex md={10} padding="10px 20px !important">
                    <CardHeaderButton start={'start'}>
                        <div>  <ActiveButton active={url_active == "user"} color="secondaryButton" type="button" onClick={handleUserClick}>
                            {t("user")}
                        </ActiveButton>  </div>
                        <div>   <ActiveButton color="secondaryButton" active={url_active == "business"} type="button" onClick={handleBusinessClick}>
                            {t("business")}
                        </ActiveButton>  </div>
                        <div><ActiveButton color="secondaryButton" active={url_active == "cp1_info"} type="button" onClick={handleCustomer1Click}>
                            {t("cp1_info")}
                        </ActiveButton></div>
                        <div><ActiveButton color="secondaryButton" active={url_active == "cp2_info"} type="button" onClick={handleCustomer2Click}>
                            {t("cp2_info")}
                        </ActiveButton></div>
                        <div><ActiveButton color="secondaryButton" active={url_active == "subscription"} type="button" onClick={handleSubscriptionClick}>
                            {t("subscription")}
                        </ActiveButton></div>
                    </CardHeaderButton>
                </Flex>
                <Flex md={2} padding="0 10px!important">
                    <CardHeaderButton>
                        <PrimaryButton
                            onClick={() => {
                                url_active == "user" ? setEditUser(true) : url_active == "business" ? setEditBuss(true) :
                                    url_active == "cp1_info" ? setEditcp1_info(true) :
                                        url_active == "cp2_info" ? setEditcp1_info(true) : setEditModal(true)
                            }}>
                            {t("update_profile")}
                        </PrimaryButton>
                    </CardHeaderButton>

                </Flex>
            </Flex>

            {url_active == "user" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard>
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
                                        {t("user")}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("group_name")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {getValueByLang(user?.profile?.user?.group_name || "{}")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("status")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.user?.status || " "}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("url")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.user?.hash_url || " "}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("default_lang")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {langs[user?.profile?.user?.default_lang?.toLowerCase() || 'en'].nativeName}
                                    {/* {user?.profile?.user?.default_lang || " "} */}
                                </Typography>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                </Flex>
            ) : <></>}

            {url_active == "business" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard>
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold" >
                                        {t("business")}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold"margin="0 10px">
                                    {t("biz_name")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_name || "")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                    {t("biz_email")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_email || " ")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                    {t("biz_mobile")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_mobile || "")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                    {t("biz_address")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_address || "")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                    {t("biz_structure")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_structure || "")}
                                </Typography>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                </Flex>
            ) : <></>}

            {url_active == "cp1_info" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard>
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px" fntweight="bold">
                                        {"coustomer 1"}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("fullname")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp1_info?.fullname || " "}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("birth_date")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp1_info?.birth_date || " "}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("mobile")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp1_info?.mobile || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("email")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp1_info?.email || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("present_address")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp1_info?.present_address || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("permanent_address")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp1_info?.permanent_address || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                </Flex>
            ) : <></>}

            {url_active == "cp2_info" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard >
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
                                        {"coustomer 2"}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("fullname")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp2_info?.cp2_fullname || " "}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("birth_date")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp2_info?.cp2_birth_date || " "}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("mobile")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp2_info?.cp2_mobile || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("email")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp2_info?.cp2_email || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("present_address")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp2_info?.cp2_present_address || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("permanent_address")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.cp2_info?.cp2_permanent_address || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                </Flex>
            ) : <></>}

            {url_active == "subscription" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard >
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
                                        {"subscription"}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("sn_name")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{" "}{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}>
                                    <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                        {getValueByLang(user?.profile?.subscription?.sn_name || "{ }")}
                                    </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("sn_desc")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{" "}{":"}{" "}</Flex>                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {getValueByLang(user?.profile?.subscription?.sn_desc || "{ }")}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("sn_start_date")}
                                    </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}</Flex>                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {user?.profile?.subscription?.sn_start_date || " "}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                        {t("sn_expiry_date")}
                                    </Typography>
                                </Flex>
                                <Flex md={1} padding="0 !important">{":"}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}>
                                    <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                        {user?.profile?.subscription?.sn_expiry_date || " "}
                                    </Typography>
                                </Flex>

                            </Flex>

                        </InfoCard>
                    </Flex>
                </Flex>
            ) : <></>}
        </CardBody>

        <ProfileModal open={editModal} setOpen={setEditModal} />
        <ProfileUserModal open={edituser} setOpen={setEditUser} />
        <ProfileBussModal open={editBuss} setOpen={setEditBuss} />
        <ProfileCp_1Modal open={editcp1_info} setOpen={setEditcp1_info} />
        <ProfileCp_2Modal open={editcp2_info} setOpen={setEditcp2_info} />
        {/* <Loading open={isLoading} /> */}
    </>
}