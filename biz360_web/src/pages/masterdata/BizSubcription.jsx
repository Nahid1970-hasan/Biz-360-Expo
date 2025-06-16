import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { getValueByLang, numberWithCommas } from "../../utils/helper";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";
import { Toast } from "../../component/Toast";
import { loadbizSubscriptionData, initLoader } from "../../features/bizSubscription/biz_subscription_slice";
import { BizSubscriptionGrid } from "../../features/bizSubscription/BizSubscriptionGrid";
import { BizSubscriptionModal } from "../../features/bizSubscription/BizSubscriptionModal";

export const SubcriptionPage = () => {
    const bizsubscription = useSelector((state) => state.bizsubscription);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadbizSubscriptionData());
        dispatch(
            loadPage({
                title: ("biz_subcrip"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        bizsubscription.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizsubscription.loading]);


    useEffect(() => {
        if (bizsubscription.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (bizsubscription.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadbizSubscriptionData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [bizsubscription.addUpdateLoading]);


    const rowData = bizsubscription?.snList?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        sn_name_value: getValueByLang(d.sn_name || "{}", lang),
        sn_desc_value: getValueByLang(d.sn_desc || "{}", lang),
        sn_type_display: d.sn_type === "BIZ" ? "Commercial" :d.sn_type === "IND" ? "Individual" :d.sn_type === "SEASONAL" ? "Seasonal" : d.sn_type,
        sn_rate_formatted: numberWithCommas(d.sn_rate),

    }));

    return bizsubscription.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>{(bizsubscription.addUpdateLoading == "idle" || bizsubscription.addUpdateLoading == "pending") ? <></> : (
            bizsubscription.addUpdateLoading == "succeeded" ? (
                <Toast msg={bizsubscription.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={bizsubscription.msg} />
            )
        )}
            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <InlineFlex justifycontent="end">
                        <Select
                            app="true"
                            name="lang"
                            onChange={(e) => { set_lang(e.target.value) }}
                            value={lang || "en"}
                        >

                            <option disabled value={0}>
                                {t("ph_select")}
                            </option>
                            {
                                bizsubscription?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            }
                        </Select>
                    </InlineFlex>

                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <BizSubscriptionGrid gridata={rowData} />
                </Flex>
            </Flex>
            <BizSubscriptionModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
