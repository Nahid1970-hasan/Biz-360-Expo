import { Suspense, useEffect, useState } from "react";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import { ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../component/Loading";
import { saveBizMemSubsData, initLoader, loadBizMemSubsData } from "../features/bizMemSubscription/biz_mem_subscription_slice";
import { getValueByLang } from "../utils/helper";
import { updateDashboard } from "../features/user/user_slice";
import { loadPage } from "../features/page/page_slice";
import { SizeBox } from "../component/style/styled_sizebox";
import { DownloadButton } from "../component/style/styled_button";
import { Center } from "../component/style/styled_center";
import { RadioLabel } from "../component/RadioButton";

export const UpgradeMembershipPage = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const packageData = useSelector((state) => state.bizmemsubscription);
    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [invoidID, setInvoidID] = useState("");
    const [snData, setSnData] = useState({});
    const [packageDataList, setPackageDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        dispatch(loadBizMemSubsData());
        dispatch(loadPage({ title: 'upgrade_membership' }))
    }, []);

    useEffect(() => { setUserInfo(user.basicInfo || {}) }, [user.basicInfo]);

    useEffect(() => {
        setPackageDataList(packageData?.list?.filter((d) => d.sn_type == (user?.basicInfo?.seasonal_trader == "Yes" ? "SEASONAL" : user.user_type)) || [])
    }, [packageData.list]);

    useEffect(() => {
        setInvoidID(user.dashboard?.pending_invoice?.invoice_no || "")
    }, [user.dashboard]);


    function handleClick(slData) {
        var reqdata = {
            "sn_duration": slData.sn_duration,
            "sn_rate": slData.sn_rate,
            "sn_id": slData.sn_id,
            "seasonal_trader": userInfo.seasonal_trader
        }
        dispatch(saveBizMemSubsData(reqdata));
    }

    useEffect(() => {
        packageData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [packageData.loading]);


    useEffect(() => {
        if (packageData.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (packageData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                initLoader();
                setIsLoading(false);
                dispatch(updateDashboard(packageData?.userData || {}));
            }, 4000);
        } else if (packageData.addUpdateLoading == "failed") {
            setTimeout(() => { initLoader(); setIsLoading(false); }, 4000);
        } else {
            setIsLoading(false);
        }
    }, [packageData.addUpdateLoading]);

    function updateCheckedRow(data) {
        setSnData(data)
        setPackageDataList(packageDataList.map((d, i) => ({ ...d, selected: data.sn_id == d.sn_id?data.selected==1?0:1:0 })));
    }

    return (
        <>
            <Suspense>

                <Flex row="row" justifycenter="justifycenter" >
                    {
                        packageDataList?.map((d, i) => <Flex md={4} sm={6} xs={12} key={i}>
                            <ShadowCard>
                                <Typography fntsize="cardTitleFontSize"> {getValueByLang(d.sn_name || "{}")}</Typography>
                                <SizeBox />
                                <ULine />
                                <Typography fntsize="dsFontSize" fntweight="bold"> {d?.sn_duration || "0"} {t("days")} {"/"} &#x9F3;{d.sn_rate || "0"}</Typography>
                                <SizeBox />
                                <Typography txtalign="left" fntsize="cardSubTitleFontSize"> {t("description")}</Typography>
                                <Typography margin="4px 0" txtalign="left" fntsize="cardContentFontSize"> {getValueByLang(d.sn_desc || "{}")}</Typography>
                                <Center> <RadioLabel id={"chck" + i} disabled={invoidID} size="lg" checked={d.selected != 0} onClick={(d?.selected != 0 || invoidID) ? null : () => updateCheckedRow(d)} /></Center>
                            </ShadowCard>
                        </Flex>)
                    }
                    <Flex md={12} sm={12} xs={12}>
                        <Center>
                            <DownloadButton
                                disabled={snData.selected != 0}
                                cursor={(invoidID || snData?.selected == 2) ? "no-drop" : "pointer"}
                                color={snData?.selected == 1 ? "warning" : (invoidID || snData?.selected == 2) ? "gray" : "downloadButton"}
                                onClick={snData.selected == 0 ? () => handleClick(snData) : null} >{t("submit")}</DownloadButton></Center>

                        {/* <DownloadButton full={"full"} cursor={(invoidID || d?.selected == 2) ? "no-drop" : "pointer"} color={d?.selected == 1 ? "warning" : (invoidID || d?.selected == 2) ? "gray" : "downloadButton"} onClick={invoidID ? null : () => handleClick(d)}>{t(d?.selected == 2 ? "activated" : d?.selected == 1 ? "pending" : "get_subscriptions")}</DownloadButton> */}
                    </Flex>
                </Flex>

                <Loading open={isLoading} />
            </Suspense>
        </>
    );
};