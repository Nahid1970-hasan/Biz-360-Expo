import { useEffect, useRef, useState } from "react"
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { PrimaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { HLLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { addDataList, selectLC1List, selectLC2List, selectSPPList, updateTempBDCSC } from "./temp_body_setup_data_slice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { TextArea } from "../../component/style/styled_textarea";
import { CheckboxLabel } from "../../component/Checkbox";
import { SUPPORTCNTDATA, SUPPORTDATA } from "../../utils/helper";

export const SetupTempContactusModalPage = ({ open, setOpen = () => { }, data }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);
    const formRef = useRef(); 
    const [cntus_data, set_cntus_data] = useState({
        "page_title": "",
        "page_subtitle": "",

        "panel1_visible": 1,
        "panel1_title": "",
        "panel1_name": "",
        "panel1_mobile": "",
        "panel1_email": "",

        "panel2_visible": 1,
        "panel2_title": "",
        "panel2_name": "",
        "panel2_mobile": "",
        "panel2_email": "",
        "panel2_address": "",

        "panel3_visible": 1,
        "panel3_title": "",
        "panel3_name": "",
        "panel3_mobile": "",
        "panel3_email": "",
        "panel3_address": "",

        "panel4_visible": 1,
        "panel4_info_link": "",
    });

    const validate = (values) => {
        let errors = {};

        return errors;
    };

    useEffect(() => {
        set_cntus_data(data);
    }, [data]);

    const submitForm = (values) => {
        dispatch(updateTempBDCSC({ "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page2': values }) }))
    }

    useEffect(() => {
        if (admTempBDCData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); formRef.current.resetForm(); }, 2000);
        }
    }, [admTempBDCData.addUpdateLoading]);

    return (<>
        <Modal
            md={8}
            sm={10}
            xs={12}
            title={t("update_body_content_sc_1")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={cntus_data}
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
                            <Flex md={6}>
                                <HLLabel margin={"8px 0 5px 0"}>{t("page_info")}</HLLabel>
                                <Label>{t("page_title")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    name='page_title'
                                    placeholder={t("ph_page_title")}
                                    value={values.page_title||""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("page_subtitle")}</Label>
                                <TextArea
                                    app="true"
                                    type="text"
                                    height="100px"
                                    name='page_subtitle'
                                    placeholder={t("ph_page_subtitle")}
                                    value={values.page_subtitle || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <CheckboxLabel padding="0" checked={values.panel4_visible || 0} size="md" onClick={() => setFieldValue("panel4_visible", !!!values.panel4_visible)} label={t("view_in_google_map")} />
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel4_info_link'
                                    placeholder={t("ph_map_link")}
                                    value={values.panel4_info_link || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={!!!values.panel4_visible} />

                            </Flex>
                            <Flex md={6}>
                                <HLLabel margin={"8px 0 5px 0"}>{t("business_info")}</HLLabel>
                                <Label>{t("title")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel1_title'
                                    placeholder={t("ph_panel1_title")}
                                    value={values.panel1_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("business_name")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel1_name'
                                    placeholder={t("ph_panel1_name")}
                                    value={values.panel1_name || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("business_mobile")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel1_mobile'
                                    placeholder={t("ph_panel1_mobile")}
                                    value={values.panel1_mobile || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("business_email")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel1_email'
                                    placeholder={t("ph_panel1_email")}
                                    value={values.panel1_email || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                            </Flex>

                            <Flex md={6}>
                                <HLLabel margin={"8px 0 5px 0"}>{t("contact1_info")}</HLLabel>
                                <Label>{t("title")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel2_title'
                                    placeholder={t("ph_panel2_title")}
                                    value={values.panel2_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_name")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel2_name'
                                    placeholder={t("ph_panel2_name")}
                                    value={values.panel2_name || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_mobile")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel2_mobile'
                                    placeholder={t("ph_panel2_mobile")}
                                    value={values.panel2_mobile || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_email")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel2_email'
                                    placeholder={t("ph_panel2_email")}
                                    value={values.panel2_email || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_address")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel2_address'
                                    placeholder={t("ph_panel2_address")}
                                    value={values.panel2_address || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                            </Flex>

                            <Flex md={6}>
                                <HLLabel margin={"8px 0 5px 0"}>{t("contact2_info")}</HLLabel>
                                <Label>{t("title")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel3_title'
                                    placeholder={t("ph_panel3_title")}
                                    value={values.panel3_title || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_name")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel3_name'
                                    placeholder={t("ph_panel3_name")}
                                    value={values.panel3_name || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_mobile")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel3_mobile'
                                    placeholder={t("ph_panel3_mobile")}
                                    value={values.panel3_mobile || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_email")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel3_email'
                                    placeholder={t("ph_panel3_email")}
                                    value={values.panel3_email || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <Label>{t("contact_address")}</Label>
                                <Input
                                    app={"true"}
                                    type="text"
                                    width={"100%"}
                                    name='panel3_address'
                                    placeholder={t("ph_panel3_address")}
                                    value={values.panel3_address || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
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