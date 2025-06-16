
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Flex } from "../../../component/style/styled_flex";
import { CardHeaderButton, InfoCard } from "../../../component/style/styled_card";
import { ActiveButton } from "../../../component/style/styled_button";
import { UnderLine } from "../../../component/style/styled_uline";
import { SizeBox } from "../../../component/style/styled_sizebox";
import { MUpTempBodySC1Page } from "../mTempBDSC1Setup";
import { MUpTempBodySC3Page } from "../mTempBDSC3Setup";
import { MUpTempBodySC2Page } from "../mTempBDSC2Setup";
import { MUpTempBodySC8Page } from "../mTempBDSC8Setup";
import { MUpTempSeasonalFProductsPage } from "./mTempSeasonalFProducts";
import { ULine } from "../../../component/style/styled_typography";
import { Tooltip } from "../../../component/Tooltip";
import { daysLeftCount } from "../../../utils/helper";

export const MUpdateTempSeasonalFBDCPage = () => {
    const userData = useSelector((state) => state.user);
    const [tempInfo, setTempInfo] = useState({});
    const [basicInfo, setBasicInfo] = useState({});
    const { t } = useTranslation();
    const [url_active, set_url_active] = useState("section1");
    const [daysLeft, setDaysLeft] = useState(-1);
    useEffect(() => {
        setBasicInfo(userData?.basicInfo || {});
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    useEffect(() => {
        setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
    }, [userData?.dashboard]);

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
                                <ActiveButton height="40px" active={url_active == "section2" ? "true" : null} color="secondaryButton" type="button" onClick={daysLeft<0? null : () =>  set_url_active("section2")}>
                                    {t('product_and_type')}
                                </ActiveButton>
                                {url_active == "section2" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" active={url_active == "section4" ? "true" : null} color="secondaryButton" type="button" onClick={daysLeft<0? null : () => set_url_active("section4")}>
                                    {t('unit')}
                                </ActiveButton>
                                {url_active == "section4" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" active={url_active == "section5" ? "true" : null} color="secondaryButton" type="button" onClick={daysLeft<0? null : () => set_url_active("section5")}>
                                    {t('product_package')}
                                </ActiveButton>
                                {url_active == "section5" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" active={url_active == "section3" ? "true" : null} color="secondaryButton" type="button" onClick={daysLeft<0? null : () => set_url_active("section3")}>
                                    {t('exclusive_offer')}
                                </ActiveButton>
                                {url_active == "section3" && <UnderLine />}
                            </div>




                        </CardHeaderButton>
                    </InfoCard>
                </Flex>
                <Flex padding="0 !important" md={12} sm={12} xs={12}><ULine /></Flex>
                <SizeBox />
            </Flex>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    {url_active == "section1" ? <MUpTempBodySC1Page tempInfo={tempInfo} daysLef={daysLeft} /> : <></>}
                    {url_active == "section2" ?  daysLeft<0? <></> : <MUpTempBodySC2Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section3" ?  daysLeft<0? <></> : <MUpTempBodySC3Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section4" ?  daysLeft<0? <></> : <MUpTempBodySC8Page tempInfo={tempInfo} /> : <></>}
                    {url_active == "section5" ?  daysLeft<0? <></> : <MUpTempSeasonalFProductsPage tempInfo={tempInfo} /> : <></>}
                </Flex>
            </Flex>
        </Suspense>
    </>)
}