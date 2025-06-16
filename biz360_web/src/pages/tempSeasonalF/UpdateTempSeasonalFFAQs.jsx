
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
import { Typography } from "../../component/style/styled_typography";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { Input } from "../../component/style/styled_input";
import { TextArea } from "../../component/style/styled_textarea";
import DataGrid from "../../component/DataGrid";
import { updateTempBDCSC } from "../template/temp_body_setup_data_slice";

export const UpdateTempSeasonalFFAQsPage = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const userData = useSelector((state) => state.user);
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");
    const [tempInfo, setTempInfo] = useState({});
    const [sectionFaqsData, setSectionFaqsData] = useState({});
    const { t, i18n } = useTranslation();
    const [errMsg, setErrMsg] = useState("");
    const [disabled, set_disabled] = useState(false);
    const [title_disabled, set_title_disabled] = useState(true);
    const [title, set_title] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
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
        var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page4 || {};
        set_title(infoBodyData.page_title||"");
        setSectionFaqsData(infoBodyData);
    }, [admTempData]);

    useEffect(() => {
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    const submitForm = (values) => {
        var txtID = sectionFaqsData?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
        const listd = sectionFaqsData?.image_list || [];
        listd.push({ id: txtID + 1, question: values.question || "", answer: values.answer || "", note: values.note || "" });
        var datak = { 'image_list': listd, "page_title": values.page_title || "" };
        var data = { "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page4': datak }) };
        dispatch(updateTempBDCSC(data))
    }

    const validate = (values) => {
        let errors = {};

        return errors;
    };


    useEffect(() => {
        if (admTempBDCData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); formRef.current.resetForm(); }, 2000);
        }
    }, [admTempBDCData.addUpdateLoading]);

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
            type: "string",
        },

        {
            headerName: "note",
            field: "note",
            fontFamily: "var(--dashboard-font)",
            description: "note",
            type: "string",
        },

        {
            headerName: "action",
            type: "action",
            icons: ['delete'],
            colors: ["error"],
            descriptions: ["Delete Data"],
            callBacks: [
                (id) => {
                    var listd = rowData?.filter((d) => d.id != id);
                    var datak = { 'image_list': listd, "page_title": title || "" };
                    var data = { "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page4': datak }) };
                    dispatch(updateTempBDCSC(data))
                 },
            ],
        },
    ];

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>

        {errMsg ? <Toast color="error" msg={errMsg} /> : ""}
        <Suspense>

            <Flex row={"true"}>
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <CardHeaderButton><PrimaryButton type="button" onClick={() => { setOpen(true); set_faqs_data(sectionFaqsData) }}>{t('update')}</PrimaryButton></CardHeaderButton>
                    <SizeBox />
                </Flex>

                <Flex padding="0 !important" md={12}>
                    <ShadowCard>
                        <Typography fntsize="cardTitleFontSize" fntweight="bold">{title || ""}</Typography>
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