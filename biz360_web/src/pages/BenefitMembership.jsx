import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { PrimaryButton } from "../component/style/styled_button";
import { CardHeaderButton } from "../component/style/styled_card";
import { SizeBox } from "../component/style/styled_sizebox";
import 'react-international-phone/style.css';
import { Toast } from "../component/Toast";
import { NotNetwork } from "./NoNetwork";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { InlineDiv, InlineFlex } from "../component/style/styled_inlineflex";
import { Typography } from "../component/style/styled_typography";
import { useEffect } from "react";
import { Icon } from "../component/style/styled_icon";

export const BenefitMembershipPage = () => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();


    return bizGroupData.loading == "nonetwork" ? <NotNetwork /> : (
        <>
            {(regDataPub.loading == "idle" || regDataPub.loading == "pending") ? <></> : (
                regDataPub.loading != "succeeded" && <Toast color="error" msg={regDataPub.msg} />)}
            <Suspense>
                <Container>
                    <Flex row="row" justifycenter="true">
                        <Flex md={8} sm={12}>
                            <Typography fntsize="dsTextFontSize" fntweight="bold">
                                {t("benefits_of_membership")}
                            </Typography>
                            <SizeBox />
                            <Typography fntsize="bodyTitleFontSize" txtalign="left">The members can avail following benefits from this platform:</Typography>
                            <SizeBox />
                            <InlineDiv justifycontent="start">
                                <i color="font" margin="0 10px 0 0" className="material-icons">navigate_next</i><Typography fntsize="bodyTitleFontSize" txtalign="left"> Information search from public portal such as searching Identity of Business / Individual, searching Qualification etc.</Typography>
                            </InlineDiv>
                            <InlineDiv justifycontent="start">
                                <i color="font" margin="0 10px 0 0" className="material-icons">navigate_next</i>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left">Searching institutions, organizations, associations, business entities, entrepreneurs, professionals, experts and working staffs.</Typography>
                            </InlineDiv>
                            <InlineDiv justifycontent="start">
                                <i color="font" margin="0 10px 0 0" className="material-icons">navigate_next</i>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left">From admin plane, search which products are to be selling more [as in Amazon].</Typography>
                            </InlineDiv>
                            <InlineDiv justifycontent="start">
                                <i color="font" margin="0 10px 0 0" className="material-icons">navigate_next</i>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left">To know which products are most demanded.</Typography>
                            </InlineDiv>
                            <InlineDiv justifycontent="start">
                                <i color="font" margin="0 10px 0 0" className="material-icons">navigate_next</i>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left">To know which products are available in which store.</Typography>
                            </InlineDiv>

                             
                        </Flex>
                        <Flex md={8} sm={12}>
                            <CardHeaderButton>
                                <PrimaryButton
                                    onClick={() => { navigate("/member") }}
                                >
                                    {t("become_member")}
                                </PrimaryButton>

                            </CardHeaderButton>
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>

        </>

    );
};
