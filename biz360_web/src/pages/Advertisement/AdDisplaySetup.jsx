import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { loadAdDisplaySetup,initLoader } from "../../features/adDisplaySetup/ad_dislay_setup_slice";
import { AdDisplayGrid } from "../../features/adDisplaySetup/AdDisplayGrid";
import { AdDisplayModal } from "../../features/adDisplaySetup/AdDisplayModal";
import { Toast } from "../../component/Toast";

export const AdDisplaySetupPage = () => {
    const adDisplyData = useSelector((state) => state.adDisplyData);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadAdDisplaySetup());
        dispatch(
            loadPage({
                title: ("setup_display"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        adDisplyData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [adDisplyData.loading]);

   
    useEffect(() => {
        if (adDisplyData.addUpdateLoading == "pending") {
            setIsLoading(true) 
        }else if (adDisplyData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadAdDisplaySetup()); 
            setTimeout(() => { dispatch(initLoader());}, 4000);
        } else {
            setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
        }
      }, [adDisplyData.addUpdateLoading]);

    const rowData = adDisplyData?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        display_name_value: getValueByLang(d.display_name || "{}", lang),
    }));

    return adDisplyData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>{(adDisplyData.addUpdateLoading == "idle" || adDisplyData.addUpdateLoading == "pending") ? <></> : (
                    adDisplyData.addUpdateLoading == "succeeded" ? (
                            <Toast msg={adDisplyData.msg} color="success" />
                          ) : (
                            <Toast color="error" msg={adDisplyData.msg} />
                          )
                        )}
            <Flex row="row">
                <Flex padding="0 !important" md={6} sm={12} xs={12}>
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
                                adDisplyData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={6} sm={12} xs={12}>
                    <AdDisplayGrid gridata={rowData} />
                </Flex>
            </Flex>
            <AdDisplayModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
