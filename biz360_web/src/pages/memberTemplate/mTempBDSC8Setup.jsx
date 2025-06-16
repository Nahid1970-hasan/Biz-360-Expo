import { Suspense, useEffect, useRef, useState } from "react";
import { CompBannerSection } from "../../component/TempContent/BannerSection";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SizeBox } from "../../component/style/styled_sizebox";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../../component/style/styled_card";
import { Typography } from "../../component/style/styled_typography";
import getCroppedImg from "../../utils/cropimg";
import { uploadIMGUsers } from "./mmb_image_upload_slice";
import { saveMTempBodyData } from "./inv_biz_temp_bd_slice";
import { AlertButton, DownloadButton, PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import DataGrid from "../../component/DataGrid";
import { KDImg } from "../../component/style/styled_img";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import Cropper from "react-easy-crop";
import { Center } from "../../component/style/styled_center";
import { getValueByLang, IMGSTTYPE, VISIBLELIST } from "../../utils/helper";
import { Select } from "../../component/style/styled_select";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";



export const MUpTempBodySC8Page = ({ tempInfo = {} }) => {
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [section8data, setSection8Data] = useState({});

    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([]);

    const [errMsg, setErrMsg] = useState("");
    const [initData, setInitData] = useState({
        label: '',
        description: '',
        visible: '',
    });

    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section8 || "{}") || {};
        var NH = scData?.image_list?.length > 0 ? scData?.image_list?.filter((d) => d.visible == "yes")?.map((d, i) => ({
            ...d,
            "sl": i + 1,
        })) || [] : invBizTempBDData?.unitList?.filter((d) => d.visible == "yes")?.map((d, i) => ({
            ...d,
            label: getValueByLang(d.unit_name || "{}"),
            description: getValueByLang(d.unit_desc || "{}"),
            "sl": i + 1,
        })) || [];
        setRowData(NH);
        setSection8Data(scData);
    }, [invBizTempBDData?.homeData]);

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
            headerName: "unit_name",
            field: "label",
            fontFamily: "var(--dashboard-font)",
            description: "unit_name",
            type: "string",
            width: "200px"
        },
        {
            headerName: "description",
            field: "description",
            fontFamily: "var(--dashboard-font)",
            description: "description",
            type: "string",
        },
        {
            headerName: "visible",
            field: "visible",
            fontFamily: "var(--dashboard-font)",
            description: "visible",
            type: "string",
            width: "80px"
        },
        {
            headerName: "action",
            type: "action",
            icons: ['delete'],
            colors: ["error"],
            descriptions: ["Delete"],
            callBacks: [
                (id) => {
                    var data = rowData?.filter((d) => d.id != id);
                    var phData = rowData?.find((d) => d.id == id);
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section8", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];
    const validate = (values) => {
        let errors = {};

        if (!values.label) {
            errors.label = t("err_msg_unit_name");
        }
        if (!values.visible) {
            errors.visible = t("err_msg_visible");
        }
        return errors;
    };

    const submitForm = (values) => {
        set_disabled(true);
        var txtID = section8data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
        var cnf = {
            id: txtID + 1,
            visible: values.visible,
            label: values.label,
            description: values.description
        }
        const listd = section8data?.image_list || [];
        listd.push(cnf);
        dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section8", "photo_name": "", 'content': JSON.stringify({ 'image_list': listd }) }));
    };

    useEffect(() => {
        if (invBizTempBDData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                setOpen(false);
                setEditOpen(false);
                formRef.current.resetForm();
                set_disabled(false);
            }, 4000);
        }
    }, [invBizTempBDData.addUpdateLoading]);

    return (
        <>{errMsg ? <Toast color="error" msg={errMsg} /> : ""}
            <Suspense>
                <Flex row="true">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <InfoCard>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <CardHeaderButton><PrimaryButton type="button" onClick={() => { setOpen(true), setEditOpen(false) }}>{t('add_unit')}</PrimaryButton></CardHeaderButton>

                                </Flex>
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <DataGrid
                                        colums={photoColums}
                                        maxheight="300px"
                                        rows={rowData || []}
                                    />
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>

                </Flex>
            </Suspense>

            <Modal
                md={6}
                sm={10}
                xs={10}
                title={t(editOpen ? "up_unit" : "add_unit")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >

                <Formik
                    initialValues={initData}
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
                            resetForm,
                            setFieldValue
                        } = formik;

                        return (
                            <div>
                                <form onSubmit={handleSubmit}>

                                    <Flex row="row">
                                        <Flex md={12}>
                                            <InfoCard>
                                                <InlineDiv>
                                                    <div>
                                                        <Typography width="100%" txtalign="left">{"* " + t("unit_subtitle")}</Typography>
                                                    </div>
                                                    <InlineFlex justifycontent="end" width="auto">
                                                        <AlertButton
                                                            type="reset"
                                                            onClick={() => {
                                                                resetForm();
                                                                set_disabled(true);
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
                                                    </InlineFlex>
                                                </InlineDiv>
                                            </InfoCard>
                                        </Flex>
                                    </Flex>

                                    <CardBody>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("unit_name")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="label"
                                                    disabled={editOpen}
                                                    placeholder={t("ph_unit_name")}
                                                    value={values.label || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.label && touched.label ? <ErrLabel>{errors.label}</ErrLabel> : null
                                                }
                                            </Flex>
                                        </Flex>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("description")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="description"
                                                    placeholder={t("description")}
                                                    value={values.description || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.description && touched.description ? <ErrLabel>{errors.description}</ErrLabel> : null
                                                }
                                            </Flex>
                                        </Flex>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("visible")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                <Select
                                                    app="true"
                                                    name="visible"
                                                    width="100%"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.visible || 0}
                                                >
                                                    <option disabled value={0} >
                                                        {t("ph_select_val")}
                                                    </option>
                                                    {
                                                        VISIBLELIST.map((d, i) => <option key={i} value={d.id}>{t(d.value)}</option>)
                                                    }

                                                </Select>
                                                {
                                                    errors.visible && touched.visible ? <ErrLabel>{errors.visible}</ErrLabel> : null
                                                }
                                            </Flex>
                                        </Flex>
                                    </CardBody>
                                </form>
                            </div>
                        );
                    }}
                </Formik>


            </Modal>
        </>

    );
};
