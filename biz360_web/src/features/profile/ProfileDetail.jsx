import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CardBody, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Flex } from "../../component/style/styled_flex";
import { Typography, ULine } from "../../component/style/styled_typography";
import { useTranslation } from "react-i18next";
import { getBNNumber, getValueByLang, langs } from "../../utils/helper";
import { PrimaryButton } from "../../component/style/styled_button";

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

export const ProfileDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.bizprofile);
    const { t, i18n } = useTranslation();
    const [url_active, set_url_active] = useState("profile");

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

    return (
        <CardBody>
            <Flex row="row">
                <Flex md={6} padding="10px!important">

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
            </Flex>

            {url_active=="user"? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard>
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography  fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
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
            ):<></>}

            {url_active=="business"? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard>
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
                                       {t("business")}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}><Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    {t("biz_name")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                {(user?.profile?.business?.biz_name || "")} 
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}><Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    {t("biz_email")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_email || " ")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}><Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    {t("biz_mobile")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_mobile || "")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}><Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold">
                                    {t("biz_address")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{":"}{" "}</Flex>

                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {(user?.profile?.business?.biz_address || "")}
                                </Typography>
                                </Flex>
                            </Flex>
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}><Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold">
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
            ):<></>}

            {url_active=="cp1_info" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard>
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography  fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px" fntweight="bold">
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
            ):<></>}

            {url_active=="cp2_info" ? (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard >
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography  fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
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
            ):<></>}

            {url_active=="subscription" ?  (
                <Flex row="row">
                    <Flex md={6}>
                        <InfoCard >
                            <Flex row="row">
                                <Flex padding="0 !important" md={12} sm={12}>
                                    <Typography  fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
                                        {"subscription"}
                                    </Typography>
                                </Flex>
                                <Flex padding="10px 0 !important" md={12} sm={12}>
                                    <ULine />
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold"margin="0 10px">
                                    {t("sn_name")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{" "}{":"}{" "}</Flex>
                                <Flex padding="0 !important" md={7} sm={12}> 
                                    <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {getValueByLang(user?.profile?.subscription?.sn_name) || "{ }"}
                                </Typography>
                                </Flex>
                            </Flex>

                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={12}>
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                    {t("sn_desc")}
                                </Typography></Flex>
                                <Flex md={1} padding="0 !important">{" "}{":"}{" "}</Flex>                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                    {getValueByLang(user?.profile?.subscription?.sn_desc) || "{ }"}
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
                                    <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold"margin="0 10px">
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
            ):<></>}
        </CardBody>
    );
};