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
import { loadADRateData, initLoader } from "../../features/adRatesetup/ad_rate_setup_slice";
import { ADRateModal } from "../../features/adRatesetup/ADRateModal";
import { ADRateGrid } from "../../features/adRatesetup/ADRateGrid";
import { Toast } from "../../component/Toast";

export const AdRatePage = () => {
    const adratedata = useSelector((state) => state.adratedata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadADRateData());
        dispatch(
            loadPage({
                title: ("rate_setup"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        adratedata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [adratedata.loading]);


    useEffect(() => {
        if (adratedata.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (adratedata.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadADRateData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [adratedata.addUpdateLoading]);

    const rowData = adratedata?.rateList.map((d, i) => ({
        ...d,
        "sl": i + 1,
        content_name_value: getValueByLang(d.content_name || "{}", lang),
        display_name_value: getValueByLang(d.display_name || "{}", lang),
    }));

    return adratedata.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>{(adratedata.addUpdateLoading == "idle" || adratedata.addUpdateLoading == "pending") ? <></> : (
            adratedata.addUpdateLoading == "succeeded" ? (
                <Toast msg={adratedata.msg} color="success" />
            ) : (
                <Toast color="error" msg={adratedata.msg} />
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
                                adratedata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            }
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={6} sm={12} xs={12}>
                    <ADRateGrid gridata={rowData} />
                </Flex>
            </Flex>
            <ADRateModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
