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

export const SetupTempBDCSC1ModalPage = ({ open, setOpen = () => { }, data }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch(); 
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);
    const formRef = useRef();
    const [bdc_data, set_bdc_data] = useState({
        section1_count: "",
        section3_count: "",
        section2_title: "",
        section2_count: "",
        section4_title: "",
        section4_count: "",
        section5_title: "",
        section5_count: "",
        section6_title: "",
        section6_count: "",
        section7_title: "",
        section7_count: "",
    });

    const validate = (values) => {
        let errors = {};

        return errors;
    };

    useEffect(() => {
        var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.home ||{};
        set_bdc_data({
            section1_count: infoBodyData?.section1?.section1_count || "",
            section3_count: infoBodyData?.section3?.section3_count || "",
            section2_title: infoBodyData?.section2?.section2_title || "",
            section2_count: infoBodyData?.section2?.section2_count || "",
            section4_title: infoBodyData?.section4?.section4_title || "",
            section4_count: infoBodyData?.section4?.section4_count || "",
            section5_title: infoBodyData?.section5?.section5_title || "",
            section5_count: infoBodyData?.section5?.section5_count || "",
            section6_title: infoBodyData?.section6?.section6_title || "",
            section6_count: infoBodyData?.section6?.section6_count || "",
            section7_title: infoBodyData?.section7?.section7_title || "",
            section7_count: infoBodyData?.section7?.section7_count || "",
        })
    }, [admTempData]);

    const submitForm = (values) => {
        var data = {
            "section1": {
                "section1_count": values.section1_count || 0,
                "data": (parseInt(values.section1_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section1_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.banner || "" }))
            },
            "section2": {
                "section2_title": values.section2_title || "",
                "section2_count": values.section2_count || 0,
                "data": (parseInt(values.section2_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section2_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.category || "", label: "Category " + (i + 1) }))
            },
            "section3": {
                "section3_count": values.section3_count || 0,
                "data": (parseInt(values.section3_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section3_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.exclusive || "", label: "Category " + (i + 1), }))
            },
            "section4": {
                "section4_title": values.section4_title || "",
                "section4_count": values.section4_count || 0,
                "data": (parseInt(values.section4_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section4_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.category || "", tag: i % 2 == 0 ? "Flash Sale" : "", price: 100, priceoff: 120, label: "Product Title " + (i + 1), }))
            },
            "section5": {
                "section5_title": values.section5_title || "",
                "section5_count": values.section5_count || 0,
                "data": (parseInt(values.section5_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section5_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.category || "", tag: i % 2 == 0 ? "Flash Sale" : "", price: 100, priceoff: 120, label: "Product Title " + (i + 1), }))
            },
            "section6": {
                "section6_title": values.section6_title || "",
                "section6_count": values.section6_count || 0,
                "data": (parseInt(values.section6_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section6_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.category || "", tag: "Flash Sale", price: 100, priceoff: 120, label: "Product Title " + (i + 1), }))
            },
            "section7": {
                "section7_title": values.section7_title || "",
                "section7_count": values.section7_count || 0,
                "data": (parseInt(values.section7_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section7_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.brand_logo || "", label: "Brand Name " + (i + 1) }))
            },
        }
        dispatch(updateTempBDCSC({ "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({'home':data})}))
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
            title={t("update_body_content")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={bdc_data}
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
                            <Flex md={4} sm={6} xs={12} padding="0">
                                <Label>{t("section1_count")}</Label>
                                <Input
                                    type="number"
                                    name='section1_count'
                                    placeholder={t("ph_section1_count")}
                                    value={values.section1_count}
                                    onChange={v => {
                                        setFieldValue('section1_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section3_count")}</Label>
                                <Input
                                    type="number"
                                    name='section3_count'
                                    max={3}
                                    placeholder={t("ph_section3_count")}
                                    value={values.section3_count}
                                    onChange={v => {
                                        setFieldValue('section3_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />

                            </Flex>
                            <Flex md={4} sm={6} xs={12} padding="0">
                                <Label>{t("section2_title")}</Label>
                                <Input
                                    type="text"
                                    name='section2_title'
                                    placeholder={t("ph_section2_title")}
                                    value={values.section2_title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section2_count")}</Label>
                                <Input
                                    type="number"
                                    name='section2_count'
                                    placeholder={t("ph_section2_count")}
                                    value={values.section2_count}
                                    onChange={v => {
                                        setFieldValue('section2_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />

                            </Flex>
                            <Flex md={4} sm={6} xs={12} padding="0">
                                <Label>{t("section4_title")}</Label>
                                <Input
                                    type="text"
                                    name='section4_title'
                                    placeholder={t("ph_section4_title")}
                                    value={values.section4_title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section4_count")}</Label>
                                <Input
                                    type="number"
                                    name='section4_count'
                                    placeholder={t("ph_section4_count")}
                                    value={values.section4_count}
                                    onChange={v => {
                                        setFieldValue('section4_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={4} sm={6} xs={12} padding="0">
                                <Label>{t("section5_title")}</Label>
                                <Input
                                    type="text"
                                    name='section5_title'
                                    placeholder={t("ph_section5_title")}
                                    value={values.section5_title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section5_count")}</Label>
                                <Input
                                    type="number"
                                    name='section5_count'
                                    placeholder={t("ph_section5_count")}
                                    value={values.section5_count}
                                    onChange={v => {
                                        setFieldValue('section5_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={4} sm={6} xs={12} padding="0">
                                <Label>{t("section6_title")}</Label>
                                <Input
                                    type="text"
                                    name='section6_title'
                                    placeholder={t("ph_section6_title")}
                                    value={values.section6_title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section6_count")}</Label>
                                <Input
                                    type="number"
                                    name='section6_count'
                                    placeholder={t("ph_section6_count")}
                                    value={values.section6_count}
                                    onChange={v => {
                                        setFieldValue('section6_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={4} sm={6} xs={12} padding="0">
                                <Label>{t("section7_title")}</Label>
                                <Input
                                    type="text"
                                    name='section7_title'
                                    placeholder={t("ph_section7_title")}
                                    value={values.section7_title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section7_count")}</Label>
                                <Input
                                    type="number"
                                    name='section7_count'
                                    placeholder={t("ph_section7_count")}
                                    value={values.section7_count}
                                    onChange={v => {
                                        setFieldValue('section7_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Flex>
                            <Flex md={12} padding="0">
                                <CardHeaderButton top="10px" padding="0 10px">
                                    <PrimaryButton
                                        type="button"
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
        </Modal >
    </>)
}