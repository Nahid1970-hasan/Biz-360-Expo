
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "../../../component/style/styled_flex";
import { CardHeaderButton, InfoCard } from "../../../component/style/styled_card";
import { ActiveButton } from "../../../component/style/styled_button";
import { SizeBox } from "../../../component/style/styled_sizebox";
import { ULine, UnderLine } from "../../../component/style/styled_uline";
import { MUpTempBodySC1Page } from "../mTempBDSC1Setup";
import { MUpTempBodySC2Page } from "../mTempBDSC2Setup";
import { MUpTempBodySC3Page } from "../mTempBDSC3Setup";
import { MUpTempBodySC4Page } from "../mTempBDSC4Setup";
import { MUpTempBodySC5Page } from "../mTempBDSC5Setup";
import { MUpTempBodySC7Page } from "../mTempBDSC7Setup";
import { useSelector } from "react-redux";

export const MUpdateTempBekariBDCPage = () => {
    const userData = useSelector((state) => state.user);
    const [tempInfo, setTempInfo] = useState({});
    const [basicInfo, setBasicInfo] = useState({});
    const { t } = useTranslation();
    const [url_active, set_url_active] = useState("section1");

    useEffect(() => {
        setBasicInfo(userData?.basicInfo || {});
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);
    return (<>
        <Suspense>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    <InfoCard>
                        <CardHeaderButton start={'start'}>
                            <div>
                                <ActiveButton height="40px" active={url_active == "section1" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section1")}>
                                    {t('banner')}
                                </ActiveButton>
                                {url_active == "section1" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" active={url_active == "section2" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section2")}>
                                    {t('category')}
                                </ActiveButton>
                                {url_active == "section2" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" active={url_active == "section7" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section7")}>
                                    {t('brand')}
                                </ActiveButton>
                                {url_active == "section7" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" active={url_active == "section5" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section5")}>
                                    {t('product_collection')}
                                </ActiveButton>
                                {url_active == "section5" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" active={url_active == "section3" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section3")}>
                                    {t('exclusive')}
                                </ActiveButton>
                                {url_active == "section3" && <UnderLine />}
                            </div>

                            <div>
                                <ActiveButton height="40px" active={url_active == "section4" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section4")}>
                                    {t('products')}
                                </ActiveButton>
                                {url_active == "section4" && <UnderLine />}
                            </div>

                        </CardHeaderButton>
                    </InfoCard>
                </Flex>
                <Flex padding="0 !important" md={12} sm={12} xs={12}><ULine /></Flex>
                <SizeBox />
            </Flex>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    {url_active == "section1" ? <MUpTempBodySC1Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section2" ? <MUpTempBodySC2Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section3" ? <MUpTempBodySC3Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section4" ? <MUpTempBodySC4Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section5" ? <MUpTempBodySC5Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section7" ? <MUpTempBodySC7Page tempInfo={tempInfo} /> : <></>}
                </Flex>
            </Flex>
        </Suspense>
    </>)
}