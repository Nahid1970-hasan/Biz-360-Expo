import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { initLoader, loadBIZGroupData } from "../../features/bizGroup/biz_group_slice";
import { BIZGroupGridPage } from "../../features/bizGroup/BIZGroupGrid";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { BIZGroupFormModalPage } from "../../features/bizGroup/BIZGroupFormModal";

export const BIZGroupPage = () => {
    const bizGroupData = useSelector((state) => state.bizgroupdata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadBIZGroupData());
        dispatch(
            loadPage({
                title: ("biz_group"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        bizGroupData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizGroupData.loading]);

   
    useEffect(() => {
        if (bizGroupData.addUpdateLoading == "pending") {
            setIsLoading(true) 
        }else if (bizGroupData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadBIZGroupData()); 
            setTimeout(() => { dispatch(initLoader());}, 4000);
        } else {
            setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
        }
      }, [bizGroupData.addUpdateLoading]);

    const rowData = bizGroupData?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        group_name_value: getValueByLang(d.group_name || "{}", lang),
    }));

    return bizGroupData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
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
                                bizGroupData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={6} sm={12} xs={12}>
                    <BIZGroupGridPage gridata={rowData} />
                </Flex>
            </Flex>
            <BIZGroupFormModalPage open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
