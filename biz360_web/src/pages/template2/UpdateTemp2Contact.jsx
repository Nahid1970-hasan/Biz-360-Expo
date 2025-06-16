import { useSelector } from "react-redux"; 
import { Typography } from "../../component/style/styled_typography"
import { Suspense, useEffect, useState } from "react";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { useTranslation } from "react-i18next"; 
import { SizeBox } from "../../component/style/styled_sizebox";
import {  InfoCard, ShadowCard } from "../../component/style/styled_card";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { PrimaryButton } from "../../component/style/styled_button";
import { Toast } from "../../component/Toast";
import { Frame } from "../../component/style/styled_iframe";
import { SetupTemp2ContactusModal } from "./SetupcntTemp2modal";

export const UpdateTemp2Contact = () => {
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
                                {cntDataList?.section1_title || "{{" + t("support") + "}}"}
                            </Typography>
                            <SizeBox />
                            {
                                cntDataList?.section1_info?.map((d, i) => <div key={i}>
                                    {d.status == "Active" ? d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                        <a>{d.name || "mobile" + (i + 1)}</a>
                                    </Typography> : d.type == "email" ?
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a >{d.name || "email" + (i + 1)}</a>
                                        </Typography> : <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            {d.name || "other_info"}
                                        </Typography> : <></>}
                                </div>)
                            }
                            <Flex row="true">
                                <Flex md={6}>
                                    <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                        {cntDataList?.section2_title || "{{" + t("location_1") + "}}"}
                                    </Typography>
                                    <SizeBox />
                                    {
                                        cntDataList?.section2_info?.map((d, i) => <div key={i}>
                                            {d.status == "Active" ? d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                <a>{d.name || "mobile" + (i + 1)}</a>
                                            </Typography> : d.type == "email" ?
                                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                    <a >{d.name || "email" + (i + 1)}</a>
                                                </Typography> : <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                    {d.name || "other_info"}
                                                </Typography> : <></>}
                                        </div>)
                                    }
                                </Flex>
                                <Flex md={6}>
                                    <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                        {cntDataList?.section3_title || "{{" + t("location_2") + "}}"}
                                    </Typography>
                                    <SizeBox />
                                    {
                                        cntDataList?.section3_info?.map((d, i) => <div key={i}>
                                            {d.status == "Active" ? d.type == "address" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                <a>{d.name || t("address")}</a>
                                            </Typography> : d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                <a>{d.name || t("mobile" + (i + 1))}</a>
                                            </Typography> : d.type == "email" ?
                                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                    <a >{d.name || t("email" + (i + 1))}</a>
                                                </Typography> : <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                    {d.name || t("other_info")}
                                                </Typography> : <></>}
                                        </div>)
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex md={6}>
                            {cntDataList?.section4_info?.status=="Active"?<Frame
                                height={"400px"}
                                width={"100%"}
                                src={"https://maps.google.com/maps?q=House%2020,%20Road%20no%2012,%20PC%20Culture%20Society&t=&z=19&ie=UTF8&iwloc=&output=embed"}
                            ></Frame>:<></>}
                        </Flex>
                    </Flex>
                </ShadowCard>
            </Flex>

        </Flex>
    </Suspense>
        <SetupTemp2ContactusModal open={cntOpen} setOpen={setCntOpen} data={cntDataList || {}} />
    </>)
}