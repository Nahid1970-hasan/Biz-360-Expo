import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { AlertButton, DownloadButton, PrimaryButton, SecondaryButton } from "../component/style/styled_button";
import { CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckboxChildren, CheckboxLabel } from "../component/Checkbox";
import { Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { FooterMenu } from "../layout/footer";
import { Link } from "react-alice-carousel";
import { SizeBox } from "../component/style/styled_sizebox";
import { saveUserInfo, updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
import { Typography } from "../component/style/styled_typography";
import { getValueByLang } from "../utils/helper";
import { Loading } from "../component/Loading";
import { initLoader, loadBizMemSubsData, saveBizMemSubsData } from "../features/bizMemSubscription/biz_mem_subscription_slice";
import { updateDashboard } from "../features/user/user_slice";




export const ProfileSetupModalPage = ({ open, setOpen = () => { } }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const packageData = useSelector((state) => state.bizmemsubscription);
    const user = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [invoidID, setInvoidID] = useState("");
    const [packageDataList, setPackageDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { setUserInfo(user.basicInfo || {}) }, [user.basicInfo]);

    useEffect(() => {
        setPackageDataList(packageData?.list?.filter((d) => d.sn_type == (user?.basicInfo?.seasonal_trader == "Yes" ? "SEASONAL" : user.user_type)) || [])
    }, [packageData.list]);

      useEffect(() => {
         setInvoidID(user.dashboard?.pending_invoice?.invoice_no||"")
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
        if (packageData.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (packageData.addUpdateLoading == "succeeded") {
            setOpen(false);
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

    return (<>

        <Modal title={t("choose_package")} xs={8} open={open} onClose={() => {
            setOpen(false);
        }} outsideclick>
            <Flex row="row" justifycenter="justifycenter" >

                {
                    packageDataList?.map((d, i) => <Flex md={5} key={i}>
                        <ShadowCard>
                            <Typography fntsize="cardTitleFontSize"> {getValueByLang(d.sn_name || "{}")}</Typography>
                            <SizeBox />
                            <Typography fntsize="dsFontSize" fntweight="bold"> {d?.sn_duration || "0"}{" Months/"}&#x9F3;{d.sn_rate || "0"}</Typography>
                            <SizeBox />
                            <Typography txtalign="left" fntsize="cardSubTitleFontSize"> {t("details")}</Typography>
                            <Typography margin="4px 0" txtalign="left" fntsize="cardContentFontSize"> {getValueByLang(d.sn_desc || "{}")}</Typography>
                            <DownloadButton full={"full"} cursor={(d?.selected == 1 || invoidID)? "no-drop" : "pointer"} color={d?.selected == 1 || invoidID ? "gray" : "downloadButton"} onClick={(d?.selected == 1 || invoidID) ? null : () => handleClick(d)}>{t(d?.selected == 1 ? "activated" : invoidID? "pending" : "get_subscriptions")}</DownloadButton>
                        </ShadowCard>
                    </Flex>)
                }
            </Flex>
        </Modal>
        <Loading open={isLoading} />
    </>)
}