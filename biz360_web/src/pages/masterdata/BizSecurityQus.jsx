import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { getValueByLang } from "../../utils/helper";
import { BizSecurityQusGrid } from "../../features/bizSecurity/BizSecurityQusGrid";
import { loadBIZSecurityQusData,initLoader } from "../../features/bizSecurity/biz_security_qus_slice";
import { BizSecurityQusModal } from "../../features/bizSecurity/BizSecurityQusModal";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";
import { Toast } from "../../component/Toast";

export const SecurityQusPage = () => {
    const bizsecurityqus = useSelector((state) => state.bizsecurityqus);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadBIZSecurityQusData());
        dispatch(
            loadPage({
                title: ("biz_security_qus"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        bizsecurityqus.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizsecurityqus.loading]);

   
    useEffect(() => {
        if (bizsecurityqus.addUpdateLoading == "pending") {
            setIsLoading(true) 
        }else if (bizsecurityqus.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadBIZSecurityQusData()); 
            setTimeout(() => { dispatch(initLoader());}, 4000);
        } else {
            setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
        }
      }, [bizsecurityqus.addUpdateLoading]);

    const rowData = bizsecurityqus?.qusList.map((d, i) => ({
        ...d,
        "sl": i + 1,
        question_value: getValueByLang(d.question || "{}", lang),
    }));

    return bizsecurityqus.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>{(bizsecurityqus.addUpdateLoading == "idle" || bizsecurityqus.addUpdateLoading == "pending") ? <></> : (
                    bizsecurityqus.addUpdateLoading == "succeeded" ? (
                        <Toast msg={bizsecurityqus.msg} icon="task_alt" color="success" />
                    ) : (
                        <Toast color="error" msg={bizsecurityqus.msg} />
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
                                bizsecurityqus?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                   
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <BizSecurityQusGrid gridata={rowData} />
                </Flex>
            </Flex>
            <BizSecurityQusModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
