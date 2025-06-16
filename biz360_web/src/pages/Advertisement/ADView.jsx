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
import { ADViewGrid } from "../../features/adView/ADViewGrid";
import { loadADViewData } from "../../features/adView/ad_view_slice";
import { getValueByLang } from "../../utils/helper";

export const ADViewPage = () => {
    const adviewdata = useSelector((state) => state.adviewdata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadADViewData());
        dispatch(
            loadPage({
                title: ("ad_view"),
                button: false,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        adviewdata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [adviewdata.loading]);

   
    // useEffect(() => {
    //     if (adviewdata.addUpdateLoading == "pending") {
    //         setIsLoading(true) 
    //     }else if (adviewdata.addUpdateLoading == "succeeded") {
    //         setIsLoading(false);
    //         dispatch(loadadviewdata()); 
    //         setTimeout(() => { dispatch(initLoader());}, 4000);
    //     } else {
    //         setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
    //     }
    //   }, [adviewdata.addUpdateLoading]);

    const rowData = adviewdata?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        status: {
            label: d.status,
            color: d.status == "Approved" ? "success" : "error",
        },
        content_name_value: getValueByLang(d.content_name || "{}", lang),
        display_name_value: getValueByLang(d.display_name || "{}", lang),
        dimension_name_value: getValueByLang(d.dimension_name || "{}", lang),
       
    }));

    return adviewdata.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            <Flex row="row">
                <Flex padding="0 10px 0 0!important" md={12} sm={12} xs={12}>
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
                                adviewdata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <ADViewGrid gridata={rowData} />
                </Flex>
            </Flex>
            <Loading open={isLoading} />
        </>
    );
};
