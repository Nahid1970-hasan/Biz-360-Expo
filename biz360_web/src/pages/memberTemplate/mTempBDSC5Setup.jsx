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
import { saveMTempBodyData, updateMTempBodyContentData } from "./inv_biz_temp_bd_slice";
import { AlertButton, PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import DataGrid from "../../component/DataGrid";
import { KDImg } from "../../component/style/styled_img";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import Cropper from "react-easy-crop";
import { Center } from "../../component/style/styled_center";
import { IMGSTTYPE, VISIBLELIST } from "../../utils/helper";
import { CompProductDetailsCard } from "../../component/TempContent/ProductLabelCard";
import { Toast } from "../../component/Toast";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";



export const MUpTempBodySC5Page = ({ tempInfo = {} }) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [section5Data, setSection5Data] = useState({});
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [disabled, set_disabled] = useState(false);
    const [title_disabled, set_title_disabled] = useState(true);
    const formRef = useRef();
    const imgRef = useRef();
    const dispatch = useDispatch();
    const [crop, setCrop] = useState({ x: 250, y: 200 })
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null);
    const [errMsg, setErrMsg] = useState("");
    const [initData, setInitData] = useState({
        collection_title: ''
    });
    const onCropComplete = (croppedArea, croppedAreaPixels) => {

        setCroppedAreaPixels(croppedAreaPixels)
    };

    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section5 || "{}") || {};
        setSection5Data(scData);
    }, [invBizTempBDData?.homeData]);

    const rowData = section5Data?.image_list?.map((d, i) => ({
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
            headerName: "collection_title",
            field: "collection_title",
            fontFamily: "var(--dashboard-font)",
            description: "collection_title",
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
            descriptions: ["Delete Data"],
            callBacks: [
                (id) => {
                    var data = rowData?.filter((d) => d.id != id);
                    var phData = rowData?.find((d) => d.id == id);
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section5", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];
    const validate = (values) => {
        let errors = {};

        if (!values.collection_title) {
            errors.collection_title = t("err_msg_collection_title");
        }
        if (!values.visible) {
            errors.visible = t("err_msg_visible");
        }

        return errors;
    };


    const submitForm = (values) => {
        set_disabled(true);
        var txtID = section5Data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
        var cnf = {
            id: txtID + 1,
            visible: values.visible,
            collection_title: values.collection_title
        }
        const listd = section5Data?.image_list || [];
        listd.push(cnf);
        dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section5", "photo_name": "", 'content': JSON.stringify({ 'image_list': listd }) }))
    };

    useEffect(() => {
        if (invBizTempBDData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                formRef.current.resetForm();
                set_disabled(false);
            }, 2000);
        }
    }, [invBizTempBDData.addUpdateLoading]);

    return (
        <> {errMsg ? <Toast color="error" msg={errMsg} /> : ""}
            <Suspense>
                <InfoCard>
                    <Flex row="true">
                        <Flex padding="0 !important" md={5} sm={6} xs={12}>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
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
                                                        <InlineDiv justifycontent="start">
                                                            <div style={{ width: "200px" }}> <Label color="font">{t("collection_title")}</Label></div>
                                                            <Input
                                                                app="true"
                                                                type="text"
                                                                width={"auto"}
                                                                mxwidth="100%"
                                                                mnwidth="auto"
                                                                name="collection_title"
                                                                placeholder={t("collection_title")}
                                                                value={values.collection_title || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </InlineDiv>
                                                        <InlineDiv justifycontent="start">
                                                            <div style={{ width: "200px" }}><Label color="font">{t("visible")}</Label></div>
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
                                                        </InlineDiv>
                                                        <CardHeaderButton top="10px">
                                                            <PrimaryButton
                                                                type="submit"
                                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                disabled={!(dirty && isValid) || disabled}
                                                            >
                                                                {t("add_new")}
                                                            </PrimaryButton>
                                                        </CardHeaderButton>
                                                    </form>
                                                </div>
                                            );
                                        }}
                                    </Formik>
                                </Flex>
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <DataGrid
                                        colums={photoColums}
                                        maxheight="300px"
                                        rows={rowData || []}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </InfoCard>
            </Suspense>

        </>

    );
};
