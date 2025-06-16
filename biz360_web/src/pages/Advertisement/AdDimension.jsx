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
import { BIZGroupFormModalPage } from "../../features/bizGroup/BIZGroupFormModal";
import { loadAdDimension, initLoader } from "../../features/adDimensionSetup/ad_dimension_setup_slice";
import { AdDimensionGrid } from "../../features/adDimensionSetup/AdDimensionGrid";
import { AdDimensionModal } from "../../features/adDimensionSetup/AdDimensionModal";
import { Toast } from "../../component/Toast";

export const AdDimensionPage = () => {
    const adDimensiondata = useSelector((state) => state.adDimensiondata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadAdDimension());
        dispatch(
            loadPage({
                title: ("ad_dimension"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        adDimensiondata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [adDimensiondata.loading]);


    useEffect(() => {
        if (adDimensiondata.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (adDimensiondata.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadAdDimension());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [adDimensiondata.addUpdateLoading]);

    const rowData = adDimensiondata?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        dimension_name_value: getValueByLang(d.dimension_name || "{}", lang),
    }));

    return adDimensiondata.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>  {(adDimensiondata.addUpdateLoading == "idle" || adDimensiondata.addUpdateLoading == "pending") ? <></> : (
            adDimensiondata.addUpdateLoading == "succeeded" ? (
                <Toast msg={adDimensiondata.msg} color="success" />
            ) : (
                <Toast color="error" msg={adDimensiondata.msg} />
            )
        )}
            <Flex row="row">
                <Flex padding="0 !important" md={7} sm={12} xs={12}>
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
                                adDimensiondata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            }
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={7} sm={12} xs={12}>
                    <AdDimensionGrid gridata={rowData} />
                </Flex>
            </Flex>
            <AdDimensionModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
