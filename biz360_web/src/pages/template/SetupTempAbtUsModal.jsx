import { useEffect, useRef, useState } from "react"
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { PrimaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { updateTempBDCSC } from "./temp_body_setup_data_slice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { TextArea } from "../../component/style/styled_textarea";

export const SetupTempAboutusModalPage = ({ open, setOpen = () => { }, data }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch(); 
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);
    const formRef = useRef();
    const [abtus_data, set_abtus_data] = useState({
        page_title: "",
        page_subtitle: "",
        section1_title: "",
        section1_subtitle: "",
        section2_title: "",
        section2_subtitle: "",
        section3_title: "",
        section3_subtitle: "",
    });

    const validate = (values) => {
        let errors = {};

        return errors;
    };

    useEffect(() => {
        var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page1 || {};
        set_abtus_data(infoBodyData);
    }, [admTempData]);

    const submitForm = (values) => {
        var data = { "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page1': values })};
        dispatch(updateTempBDCSC(data))
    }

    useEffect(() => {
        if (admTempBDCData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false) }, 2000);
        }
    }, [admTempBDCData.addUpdateLoading]);

    return (<>
        <Modal
            md={6}
            sm={8}
            xs={12}
            title={t("update_body_content_sc_1")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={abtus_data}
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
                        <Flex row="row" >
                            <Flex md={6} sm={6} xs={12} padding="0">
                                <Label>{t("page_title")}</Label>
                                <Input
                                    type="text"
                                    name='page_title'
                                    placeholder={t("ph_page_title")}
                                    value={values.page_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("page_subtitle")}</Label>
                                <TextArea
                                    app="true"
                                    type="text"
                                    name='page_subtitle'
                                    placeholder={t("page_subtitle")}
                                    value={values.page_subtitle || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={6} sm={6} xs={12} padding="0">
                                <Label>{t("section1_title")}</Label>
                                <Input
                                    type="text"
                                    name='section1_title'
                                    placeholder={t("ph_section1_title")}
                                    value={values.section1_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section1_subtitle")}</Label>
                                <TextArea
                                    app="true"
                                    type="text"
                                    name='section1_subtitle'
                                    placeholder={t("ph_section1_subtitle")}
                                    value={values.section1_subtitle || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={6} sm={6} xs={12} padding="0">
                                <Label>{t("section2_title")}</Label>
                                <Input
                                    type="text"
                                    name='section2_title'
                                    placeholder={t("ph_section2_title")}
                                    value={values.section2_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section2_subtitle")}</Label>
                                <TextArea
                                    app="true"
                                    type="text"
                                    name='section2_subtitle'
                                    placeholder={t("ph_section2_subtitle")}
                                    value={values.section2_subtitle || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={6} sm={6} xs={12} padding="0">
                                <Label>{t("section3_title")}</Label>
                                <Input
                                    type="text"
                                    name='section3_title'
                                    placeholder={t("ph_section3_title")}
                                    value={values.section3_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section3_subtitle")}</Label>
                                <TextArea
                                    app="true"
                                    type="text"
                                    name='section3_subtitle'
                                    placeholder={t("ph_section3_subtitle")}
                                    value={values.section3_subtitle || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Flex>

                            <Flex md={12} padding="0">
                                <CardHeaderButton top="10px" padding="0 10px">
                                    <PrimaryButton
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        {t("submit")}
                                    </PrimaryButton>
                                </CardHeaderButton>
                            </Flex>
                        </Flex>
                    )
                }}
            </Formik>
        </Modal>
    </>)
}