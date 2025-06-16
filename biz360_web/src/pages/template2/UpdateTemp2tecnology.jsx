import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { useTranslation } from "react-i18next";
import { InfoCard, ShadowCard } from "../../component/style/styled_card";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { PrimaryButton } from "../../component/style/styled_button";
import { Typography } from "../../component/style/styled_typography";
import { SizeBox } from "../../component/style/styled_sizebox";
import { SetupTemp2AbtUsModal } from "./SetupTemp2AbtUsModal";

export const UpdateTemp2Tecnology = () => {
    const admTempData = useSelector((state) => state.admupdatetempdata);  
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en"); 
    const [basicData, setBasicData] = useState({}); 
    const [abtOpen, setAbtOpen] = useState(false); 

    const { t, i18n } = useTranslation();
    useEffect(() => {
        var infoData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page1 || {};
        setBasicData(infoData);
    }, [admTempData]);

    return (<>
        <Suspense>
            <Flex row="true">
                <Flex padding={"5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("tecnology_section", { lng: menuLang })}</Label>
                            <PrimaryButton onClick={() => { setAbtOpen(true) }}>Update</PrimaryButton>
                        </InlineDiv>
                    </InfoCard>
                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <Typography fntsize="cardTitleFontSize" fntweight="bold">{basicData?.page_title||""}</Typography>
                        <SizeBox/>
                        <Typography fntsize="cardContentFontSize" txtalign="left">{basicData?.page_subtitle||""}</Typography> 
                        <SizeBox/>
                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{basicData?.section1_title||""}</Typography> 
                        <SizeBox/>
                        <Typography fntsize="cardContentFontSize" txtalign="left">{basicData?.section1_subtitle||""}</Typography> 
                        <SizeBox/>
                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{basicData?.section2_title||""}</Typography> 
                        <SizeBox/>
                        <Typography fntsize="cardContentFontSize" txtalign="left">{basicData?.section2_subtitle||""}</Typography> 
                        <SizeBox/>
                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{basicData?.section3_title||""}</Typography> 
                        <SizeBox/>
                        <Typography fntsize="cardContentFontSize" txtalign="left">{basicData?.section3_subtitle||""}</Typography> 
            
                    </ShadowCard>
                </Flex>

            </Flex>
        </Suspense>
        <SetupTemp2AbtUsModal open={abtOpen} setOpen={setAbtOpen} data={[]} />
    </>)
}