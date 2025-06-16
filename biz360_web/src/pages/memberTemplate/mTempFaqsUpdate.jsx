
import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton, ShadowCard } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import { SizeBox } from "../../component/style/styled_sizebox";
import { loadPage } from "../../features/page/page_slice";
import { Toast } from "../../component/Toast";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { NotNetwork } from "../NoNetwork";
import { initBDLoader, loadMTempBodyData, saveMTempBodyData } from "./inv_biz_temp_bd_slice";
import { Typography } from "../../component/style/styled_typography";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { Input } from "../../component/style/styled_input";
import { TextArea } from "../../component/style/styled_textarea";
import DataGrid from "../../component/DataGrid";
import { daysLeftCount, TEMPCONST } from "../../utils/helper";

export const MUpdateTempFAQsPage = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const userData = useSelector((state) => state.user);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const [tempInfo, setTempInfo] = useState({});
    const [sectionFaqsData, setSectionFaqsData] = useState({});
    const { t, i18n } = useTranslation();
    const [errMsg, setErrMsg] = useState("");
    const [disabled, set_disabled] = useState(false);
    const [title_disabled, set_title_disabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
     const [daysLeft, setDaysLeft] = useState(TEMPCONST.dayleft);
    const formRef = useRef();
    const [faqs_data, set_faqs_data] = useState({
        page_title: "",
        question: "",
        answer: "",
        note: "",
    });
    useEffect(() => {
        dispatch(loadPage({ title: 'faqs_template' }))
    }, []);


    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section1 || "{}") || {};
        setSectionFaqsData(scData);
    }, [invBizTempBDData?.homeData]);


    useEffect(() => {
        setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
    }, [userData?.dashboard]);

    useEffect(() => {
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    useEffect(() => {
        if (tempInfo.template_id > 0) {
            dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "faqs", section_name: "", sub_section_name: "" }));
        }
    }, [tempInfo]);


    useEffect(() => {
        invBizTempBDData.loading == "pending" ? setIsLoading(true) : invBizTempBDData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : invBizTempBDData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempBDData.loading]);

    useEffect(() => {
        if (invBizTempBDData.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (invBizTempBDData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                setOpen(false);
                set_disabled(false);
                dispatch(initBDLoader());
                setIsLoading(false);
                if (tempInfo.template_id > 0) {
                    dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "faqs", section_name: "", sub_section_name: "" }));
                }
            }, 2000);
        } else if (invBizTempBDData.addUpdateLoading == "unauthorized") {
            setTimeout(() => { dispatch(initBDLoader()); setUnAthorized(true); set_disabled(false); }, 4000);
        } else if (invBizTempBDData.addUpdateLoading == "nonetwork") {
            setTimeout(() => { dispatch(initBDLoader()); setIsAxiosError(true); set_disabled(false); }, 4000);
        } else {
            setTimeout(() => { dispatch(initBDLoader()); setIsLoading(false); set_disabled(false); }, 4000);
        }
    }, [invBizTempBDData.addUpdateLoading]);

    const validate = (values) => {
        let errors = {};

        return errors;
    };

    const submitForm = (values) => {
        set_disabled(true);
        var txtID = sectionFaqsData?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
        const listd = sectionFaqsData?.image_list || [];
        listd.push({ id: txtID + 1, question: values.question || "", answer: values.answer || "", note: values.note || "" });
        var datak = { 'image_list': listd, "page_title": values.page_title || "" };
        dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "faqs", sub_section_name: "", section_name: "section1", "photo_name": "", 'content': JSON.stringify(datak) }))
    }

    const rowData = sectionFaqsData?.image_list?.map((d, i) => ({
        ...d,
        "sl": i + 1,
    })) || [];

    const photoColums = [
        {
            headerName: "Id",
            field: "id",
            type: "number",
            key: true,
            hide: true,
        },
        {
            headerName: "#",
            field: "sl",
            type: "string",
            width: "80px"
        },
        {
            headerName: "question",
            field: "question",
            fontFamily: "var(--dashboard-font)",
            description: "question",
            type: "string",
        },

        {
            headerName: "answer",
            field: "answer",
            fontFamily: "var(--dashboard-font)",
            description: "answer",
            type: "board",
        },

        {
            headerName: "note",
            field: "note",
            fontFamily: "var(--dashboard-font)",
            description: "note",
            type: "board",
        },

        {
            headerName: "action",
            type: "action",
            icons: ['delete'],
            colors: ["error"],
            descriptions: ["Delete Data"],
            callBacks: [
                (id) => {
                    var data = rowData?.filter((d) => d.id != id);
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "faqs", sub_section_name: "", section_name: "section1", "photo_name": "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(invBizTempBDData.addUpdateLoading == "idle" || invBizTempBDData.addUpdateLoading == "pending") ? <></> : (
            invBizTempBDData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempBDData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempBDData.msg} />
            )
        )}
        {errMsg ? <Toast color="error" msg={errMsg} /> : ""}
        <Suspense>

            <Flex row={"true"}>
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <CardHeaderButton><PrimaryButton type="button" disabled={daysLeft<0} onClick={ daysLeft<0? null : () => { setOpen(true); set_faqs_data(sectionFaqsData) }}>{t('add_new')}</PrimaryButton></CardHeaderButton>
                    <SizeBox />
                </Flex>

                <Flex padding="0 !important" md={12}>
                    <ShadowCard>
                        <Typography fntsize="cardTitleFontSize" fntweight="bold">{sectionFaqsData?.page_title || ""}</Typography>
                        <SizeBox />
                        <DataGrid
                            colums={photoColums}
                            maxheight="60vh"
                            rows={rowData || []}
                        />
                    </ShadowCard>
                </Flex>
            </Flex>
        </Suspense>
        <Modal
            md={4}
            sm={8}
            xs={10}
            title={t("update_faqs_page")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={faqs_data}
                validate={validate}
                onSubmit={submitForm}
                innerRef={formRef}
                enableReinitialize
            >
                {(formik) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty,
                        setFieldValue,
                        resetForm,
                    } = formik;

                    return (

                        <form onSubmit={handleSubmit}>
                            <Flex row="row" >
                                <Flex md={12} sm={12} xs={12} padding="0">
                                    <CardHeaderButton>
                                        <AlertButton
                                            type="reset"
                                            onClick={() => {
                                                resetForm();
                                            }}
                                        >
                                            {t("reset")}
                                        </AlertButton>
                                        <PrimaryButton
                                            type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid) || disabled}
                                        >
                                            {t("submit")}
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </Flex>
                                <Flex md={12} sm={12} xs={12} padding="0">
                                    <Label>{t("page_title")}</Label>
                                    <Flex row="true">
                                        <Flex padding='0 !important' md={10} sm={4} xs={10}>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name='page_title'
                                                placeholder={t("ph_page_title")}
                                                value={values.page_title || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={title_disabled}
                                            />
                                            {
                                                errors.page_title && touched.page_title ? <ErrLabel>{errors.page_title}</ErrLabel> : null
                                            }
                                        </Flex>
                                        <Flex md={2} sm={2} xs={2} padding=" 0 !important">
                                            <SecondaryButton
                                                type="button"
                                                margin="2px 5px"
                                                onClick={() => {
                                                    set_title_disabled(false)
                                                }}
                                                disabled={!title_disabled}
                                            >
                                                {t("change")}
                                            </SecondaryButton>
                                        </Flex>
                                    </Flex>
                                    <Label>{t("question")}</Label>
                                    <Input
                                        type="text"
                                        name='question'
                                        placeholder={t("ph_question")}
                                        value={values.question || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.question && touched.question ? <ErrLabel>{errors.question}</ErrLabel> : null
                                    }
                                    <Label>{t("answer")}</Label>
                                    <Input
                                        type="text"
                                        name='answer'
                                        placeholder={t("ph_answer")}
                                        value={values.answer || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.answer && touched.answer ? <ErrLabel>{errors.answer}</ErrLabel> : null
                                    }
                                    <Label>{t("note")}</Label>
                                    <Input
                                        type="text"
                                        name='note'
                                        placeholder={t("ph_note")}
                                        value={values.note || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Flex>
                            </Flex>
                        </form>
                    )
                }}
            </Formik>
        </Modal>
        <Loading open={isLoading} />

    </>)
}