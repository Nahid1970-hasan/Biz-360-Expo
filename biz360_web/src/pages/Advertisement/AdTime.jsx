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
import { loadTimeSetupData ,initLoader} from "../../features/adTimeSetup/ad_time_setup_slice";
import { ADTimeGrid } from "../../features/adTimeSetup/ADTimeGrid";
import { ADTimeSetupModal } from "../../features/adTimeSetup/ADTimeSetupModal";
import { Toast } from "../../component/Toast";

export const AdTimePage = () => {
    const adtimedata = useSelector((state) => state.adtimedata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadTimeSetupData());
        dispatch(
            loadPage({
                title: ("ad_time_setup"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        adtimedata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [adtimedata.loading]);

   
    useEffect(() => {
        if (adtimedata.addUpdateLoading == "pending") {
            setIsLoading(true) 
        }else if (adtimedata.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadTimeSetupData()); 
            setTimeout(() => { dispatch(initLoader());}, 4000);
        } else {
            setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
        }
      }, [adtimedata.addUpdateLoading]);

    const rowData = adtimedata?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        time_name_value: getValueByLang(d.time_name || "{}", lang),
    }));

    return adtimedata.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <> {(adtimedata.addUpdateLoading == "idle" || adtimedata.addUpdateLoading == "pending") ? <></> : (
                    adtimedata.addUpdateLoading == "succeeded" ? (
                            <Toast msg={adtimedata.msg} color="success" />
                          ) : (
                            <Toast color="error" msg={adtimedata.msg} />
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
                                adtimedata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={6} sm={12} xs={12}>
                    <ADTimeGrid gridata={rowData} />
                </Flex>
            </Flex>
            <ADTimeSetupModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
