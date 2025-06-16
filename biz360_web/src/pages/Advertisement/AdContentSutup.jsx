import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { BIZGroupGridPage } from "../../features/bizGroup/BIZGroupGrid";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { BIZGroupFormModalPage } from "../../features/bizGroup/BIZGroupFormModal";
import { loadAdContentSetup,initLoader } from "../../features/adContentSetup/ad_content_setup_Slice";
import { AdContentGrid } from "../../features/adContentSetup/AdContentGrid";
import { AdContentModal } from "../../features/adContentSetup/AdContentModal";
import { Toast } from "../../component/Toast";

export const AdContentSetupPage = () => {
    const adContentdata = useSelector((state) => state.adContentdata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadAdContentSetup());
        dispatch(
            loadPage({
                title: ("content_setup"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        adContentdata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [adContentdata.loading]);

   
    useEffect(() => {
        if (adContentdata.addUpdateLoading == "pending") {
            setIsLoading(true) 
        }else if (adContentdata.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadAdContentSetup()); 
            setTimeout(() => { dispatch(initLoader());}, 4000);
        } else {
            setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
        }
      }, [adContentdata.addUpdateLoading]);

    const rowData = adContentdata?.list.map((d, i) => ({
    
        ...d,
        "sl": i + 1,
        content_name_value: getValueByLang(d.content_name || "{}", lang),
    }));
 

    return adContentdata.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>    {(adContentdata.addUpdateLoading == "idle" || adContentdata.addUpdateLoading == "pending") ? <></> : (
            adContentdata.addUpdateLoading == "succeeded" ? (
                    <Toast msg={adContentdata.msg} color="success" />
                  ) : (
                    <Toast color="error" msg={adContentdata.msg} />
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
                                adContentdata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={6} sm={12} xs={12}>
                    <AdContentGrid gridata={rowData} />
                </Flex>
            </Flex>
            <AdContentModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
