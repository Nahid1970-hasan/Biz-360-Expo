import { useEffect, useRef, useState } from "react"
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { PrimaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { TextArea } from "../../component/style/styled_textarea";
import { CheckboxLabel } from "../../component/Checkbox"; 
import { SUPPORTCNTDATA, SUPPORTDATA } from "../../utils/helper";
import { addDataList ,selectLC1List, selectLC2List, selectSPPList, updateTempBDCSC} from "../template/temp_body_setup_data_slice";

export const SetupTemp2ContactusModal = ({ open, setOpen = () => { }, data }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);
    const formRef = useRef();
    const [isMapView, setIsMapView] = useState(true); 
    const [cntus_data, set_cntus_data] = useState({
        page_title: "",
        page_subtitle: "",
        section1_title: "",
        section2_title: "",
        section3_title: "",
    });

    const validate = (values) => {
        let errors = {};

        return errors;
    };

    useEffect(() => {
        set_cntus_data({
            page_title: data?.page_title || "",
            page_subtitle: data?.page_subtitle || "",
            section1_title: data?.section1_title || "",
            section2_title: data?.section2_title || "",
            section3_title: data?.section3_title || "",
        });
        setIsMapView(data?.section4_info?.status == "Active")
        var datad = {
            "type": "support",
            sc1data: data.section1_info || SUPPORTCNTDATA,
            sc2data: data.section2_info || SUPPORTDATA,
            sc3data: data.section3_info || SUPPORTDATA,
            sc4data: data.section4_info || {}
        }
        dispatch(addDataList(datad))
    }, [data]);

    const submitForm = (values) => {
        var data = {
            page_title: values.page_title,
            page_subtitle: values.page_subtitle,
            section1_title: values.section1_title,
            section1_info: admTempBDCData?.section1Data,
            section2_title: values.section2_title,
            section2_info: admTempBDCData?.section2Data,
            section3_title: values.section3_title,
            section3_info: admTempBDCData?.section3Data,
            section4_info: {
                "id": 1,
                "status": isMapView ? "Active" : "Inactive",
                "type": "mapview",
                "link": admTempBDCData?.section4Data?.link || "",
            }
        }
        console.log(data)
        // var data = { "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page2': values }) };


        dispatch(updateTempBDCSC({ "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page2': data }) }))
    }

    useEffect(() => {
        if (admTempBDCData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); formRef.current.resetForm(); }, 2000);
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
                            <Flex md={12} padding="0">
                                <Flex row="true">
                                    <Flex md={3} padding="0 !important">
                                        <Label>{t("page_title")}</Label>
                                        <Input
                                            type="text"
                                            name='page_title'
                                            placeholder={t("ph_page_title")}
                                            value={values.page_title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Flex>
                                    <Flex md={3} padding="0 5px !important">
                                        <Label>{t("section1_title")}</Label>
                                        <Input
                                            type="text"
                                            name='section1_title'
                                            placeholder={t("ph_section1_title")}
                                            value={values.section1_title || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Flex>
                                    <Flex md={3} padding="0 !important">
                                        <Label>{t("section2_title")}</Label>
                                        <Input
                                            type="text"
                                            name='section2_title'
                                            placeholder={t("ph_section2_title")}
                                            value={values.section2_title || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Flex>
                                    <Flex md={3} padding="0 5px !important">
                                        <Label>{t("section3_title")}</Label>
                                        <Input
                                            type="text"
                                            name='section3_title'
                                            placeholder={t("ph_section3_title")}
                                            value={values.section3_title || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Flex>
                                </Flex>
                                <Flex row="true">
                                    <Flex md={12} padding="0 !important">
                                        <Label>{t("page_subtitle")}</Label>
                                        <TextArea
                                            app="true"
                                            type="text"
                                            name='page_subtitle'
                                            placeholder={t("ph_page_subtitle")}
                                            value={values.page_subtitle || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Flex>
                                </Flex>
                                <Flex row="true">
                                    <Flex md={12} padding="0 !important">
                                        <Label margin={"8px 0 0 0"}>{t("secton1_info_data")}</Label>
                                        {
                                            admTempBDCData?.section1Data?.map((d, i) => <CheckboxLabel id={"spp_" + d.id} key={i} checked={d.status == "Active" ? 1 : 0} onClick={(e) => { dispatch(selectSPPList(e.target.id)) }} label={d.name} labelcolor="font" size={"md"} />)
                                        }
                                    </Flex>
                                    <Flex md={12} padding="0 !important">
                                        <Label margin={"8px 0 0 0"}>{t("secton2_info_data")}</Label>
                                        {
                                            admTempBDCData?.section2Data?.map((d, i) => <CheckboxLabel id={"lc_" + d.id} key={i} checked={d.status == "Active" ? 1 : 0} onClick={(e) => { dispatch(selectLC1List(e.target.id)) }} label={d.name} labelcolor="font" size={"md"} />)
                                        }
                                    </Flex>
                                    <Flex md={12} padding="0 !important">
                                        <Label margin={"8px 0 0 0"}>{t("secton3_info_data")}</Label>
                                        {
                                            admTempBDCData?.section3Data?.map((d, i) => <CheckboxLabel id={"lca_" + d.id} key={i} checked={d.status == "Active" ? 1 : 0} onClick={(e) => { dispatch(selectLC2List(e.target.id)) }} label={d.name} labelcolor="font" size={"md"} />)
                                        }
                                    </Flex>
                                    <Flex md={12} padding="0 !important">
                                        <Label margin={"8px 0 0 0"}>{t("secton3_info_data")}</Label>
                                        <CheckboxLabel id={"maps_1"} checked={isMapView ? 1 : 0} onClick={(e) => setIsMapView(!isMapView)} label={t("view_in_google_map")} labelcolor="font" size={"md"} />
                                    </Flex>
                                </Flex>
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