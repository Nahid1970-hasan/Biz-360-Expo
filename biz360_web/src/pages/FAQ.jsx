import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import UnAuthorized from "./UnAuthorized";
import { Toast } from "../component/Toast";
import { Loader } from "../component/style/Loader_styled";
import { Flex } from "../component/style/styled_flex";
import { CardBody } from "../component/style/styled_card";
import DataGrid from "../component/DataGrid";
import { loadFaq, initLoader, loadFaqGroupData } from "../features/faq/faq_Slice";
import { Loading } from "../component/Loading";
import { InlineFlex } from "../component/style/styled_inlineflex";
import { Select } from "../component/style/styled_select";
import { getValueByLang } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { FAQModal } from "../features/faq/FAQModal";
import { FAQDelete } from "../features/faq/FAQDelete";
import { PrimaryButton } from "../component/style/styled_button";
import { Label } from "../component/style/styled_label";
import { Typography } from "../component/style/styled_typography";


export const FAQPage = () => {
    const dispatch = useDispatch();
    const faqData = useSelector((state) => state.faqData);
    const [faq_id, set_faq_id] = useState(0);
    const [remove, setRemove] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [rows, set_rows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");
    const { t, i18n } = useTranslation();
    const [group_id, set_group_id] = useState(0);
    const [group_name, set_group_name] = useState("");
    const [rowData, setRowData] = useState([]);


    const colums = [
        {
            headerName: "Id",
            field: "faq_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            sortable: true,
            width: "40px",
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: "question",
            field: "question_value",
            fontFamily: "var(--dashboard-font)",
            description: "question",
            sortable: true,
            filterable: true,
            type: "string",
            width:"450px"
        },
        {
            headerName: "answer",
            field: "answer_value",
            description: "answer",
            type: "string",
        },

        {
            headerName: "action",
            field: "",
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit FAQ", "Delete FAQ"],
            callBacks: [
                (faq_id) => {
                    var rowdata = rowData?.find((d) => d.faq_id == faq_id);
                    setEditOpen(true);
                    setData(rowdata);

                },
                (faq_id) => {
                    var data = faqData?.dataList?.find((d) => d.faq_id == faq_id);
                    setRemove(true);
                    set_faq_id(faq_id);
                },
            ],
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadFaq());
        dispatch(
            loadPage({
                title: "faq_detail",
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        if (faqData?.dataList?.length > 0) {
            const firstGroup = faqData?.dataList[0];
            const rddata = firstGroup?.faq_list?.map((d, i) => ({
                ...d,
                "sl": i + 1,
                question_value: getValueByLang(d.question || "{}", lang),
                answer_value: getValueByLang(d.answer || "{}", lang),
                group_id:firstGroup.group_id,
            })) || [];
            setRowData(rddata);
            set_group_id(firstGroup.group_id);
            set_group_name(firstGroup.group_name);
        }
    }, [faqData.dataList]);


    useEffect(() => {
        faqData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [faqData.loading]);

 


    useEffect(() => {
        if (faqData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (faqData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadFaq());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [faqData.addUpdateLoading]);


    return faqData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(faqData.addUpdateLoading == "idle" || faqData.addUpdateLoading == "pending") ? <></> : (
                faqData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={faqData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={faqData.msg} />
                )
            )}
            <Suspense fallback={<Loader />}>

                <Flex row="row">
                    <Flex padding="0 10px 0 0 !important" md={12} sm={12}>
                        <Flex row="row">
                            <Flex padding="0 !important" md={6} sm={12} xs={12}>
                                <Flex row="row">
                                    <Flex md={2} padding="0 !important">
                                    <Typography margin="5px">{t("faq_type")}</Typography>
                                    </Flex>
                                    <Flex md={3} padding="0!important">
                                    <InlineFlex justifycontent="start">
                                    <Select
                                        app="true"
                                        width="220px"
                                        name="group_id"
                                        onChange={(e) => {
                                            const grp = faqData?.dataList?.find((d) => d.group_id == e.target.value);
                                            const rddata = grp?.faq_list?.map((d, i) => ({
                                                ...d,
                                                "sl": i + 1,
                                                question_value: getValueByLang(d.question || "{}", lang),
                                                answer_value: getValueByLang(d.answer || "{}", lang),
                                                group_id:grp.group_id,
                                            })) || [];
                                            setRowData(rddata);
                                            set_group_name(grp.group_name);
                                            set_group_id(e.target.value);
                                        }}
                                        color={!group_id ? "error" : null}
                                        value={group_id || 0}
                                    >
                                        <option disabled value={0}>
                                            {t("ph_select")}
                                        </option>
                                        {faqData?.dataList?.map((d, i) => (
                                            <option key={i} value={d.group_id}>
                                                {getValueByLang(d.group_name || "{}", lang)}
                                            </option>
                                        ))}
                                    </Select>
                                    
                                </InlineFlex>
                                    </Flex>
                                </Flex>
                            </Flex>
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
                                            faqData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                        }
                                    </Select>
                                </InlineFlex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex row="row">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <CardBody>
                            <DataGrid
                                colums={colums}
                                rows={rowData || []}
                            />
                        </CardBody>
                        <FAQDelete open={remove} setOpen={setRemove} data={{ faq_id }} />
                        <FAQModal open={open} setOpen={setOpen} add />
                        <FAQModal open={editOpen} setOpen={setEditOpen} data={data} />
                    </Flex>
                </Flex>

            </Suspense>
            <Loading open={isLoading} />
        </>
    );
};

