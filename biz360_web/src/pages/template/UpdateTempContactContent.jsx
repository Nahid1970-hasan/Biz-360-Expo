import { useSelector } from "react-redux";
import { Typography } from "../../component/style/styled_typography"
import { Suspense, useEffect, useState } from "react";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { useTranslation } from "react-i18next";
import { getTextToImage } from "../../utils/helper";

import { SizeBox } from "../../component/style/styled_sizebox";
import { InfoCard, ShadowCard } from "../../component/style/styled_card";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { PrimaryButton } from "../../component/style/styled_button";

import styled from "styled-components";
import { SetupTempContactusModalPage } from "./SetupTempCntUsModal";
import { Toast } from "../../component/Toast";
import { Frame } from "../../component/style/styled_iframe";

export const UpdateTempContactContentPage = () => {
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);

    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");

    const [cntDataList, setCntDataList] = useState({});
    const [cntOpen, setCntOpen] = useState(false);

    const { t, i18n } = useTranslation();
    useEffect(() => {
        var infoData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page2 || {};
        setCntDataList(infoData);
    }, [admTempData]);

    return (<>
        {(admTempBDCData.addUpdateLoading == "idle" || admTempBDCData.addUpdateLoading == "pending") ? <></> : (
            admTempBDCData.addUpdateLoading == "succeeded" ? (
                <Toast msg={admTempBDCData.msg} color="success" />
            ) : (
                <Toast color="error" msg={admTempBDCData.msg} />
            )
        )}
        <Suspense>
            <Flex row="true">
                <Flex padding={"5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("contact_us_section", { lng: menuLang })}</Label>
                            <PrimaryButton onClick={() => { setCntOpen(true) }}>Update</PrimaryButton>
                        </InlineDiv>
                    </InfoCard>
                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <Typography fntsize="cardTitleFontSize" fntweight="bold">{cntDataList?.page_title || "{{" + t("contact_us") + "}}"}</Typography>
                        <Flex row="true">
                            <Flex md={11.99}>
                                <Typography fntsize="cardContentFontSize" txtalign="left">{cntDataList?.page_subtitle || "{{" + t("contact_us_subtitle") + "}}"}</Typography>
                                <SizeBox />
                            </Flex>
                            <Flex md={6}>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                    {cntDataList?.panel1_title || "{{" + t("support") + "}}"}
                                </Typography>
                                <SizeBox />
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{cntDataList?.panel1_name}</a>
                                </Typography>
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{cntDataList?.panel1_mobile}</a>
                                </Typography>
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{cntDataList?.panel1_email}</a>
                                </Typography>
                                <Flex row="true">
                                    <Flex md={6}>
                                        <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                            {cntDataList?.panel2_title || "{{" + t("location_1") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_name}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_mobile}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_email}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_address}</a>
                                        </Typography>

                                    </Flex>
                                    <Flex md={6}>
                                        <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                            {cntDataList?.panel3_title || "{{" + t("location_2") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_name}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_mobile}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_email}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_address}</a>
                                        </Typography>

                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex md={6}>
                                {cntDataList?.panel4_visible ? <Frame
                                    height={"250px"}
                                    width={"100%"}
                                    src={cntDataList?.panel4_info_link || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1291.080901858037!2d90.36113210395774!3d23.757068431399833!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfeaac77cf97%3A0x56e8b5892d7e73df!2sMohammadpur%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1742800914799!5m2!1sen!2sbd"}
                                    ></Frame> : <></>}
                            </Flex>
                        </Flex>
                    </ShadowCard>
                </Flex>

            </Flex>
        </Suspense>
        <SetupTempContactusModalPage open={cntOpen} setOpen={setCntOpen} data={cntDataList || {}} />
    </>)
}