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
import { AlertButton, DownloadButton, PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import DataGrid from "../../component/DataGrid";
import { KDImg } from "../../component/style/styled_img";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { ErrLabel, Label, RedMark } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import Cropper from "react-easy-crop";
import { Center } from "../../component/style/styled_center";
import { IMGSTTYPE, VISIBLELIST } from "../../utils/helper";
import { Select } from "../../component/style/styled_select";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { CheckboxChildren } from "../../component/Checkbox";



export const MUpTempBodySC2Page = ({ tempInfo = {} }) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [section2data, setSection2Data] = useState({});
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [disabled, set_disabled] = useState(true);
    const [title_disabled, set_title_disabled] = useState(true);
    const formRef = useRef();
    const imgRef = useRef();
    const dispatch = useDispatch();
    const [crop, setCrop] = useState({ x: 350, y: 300 })
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null);
    const [initData, setInitData] = useState({
        file: '',
        label: '',
        description: '',
        visible: 'yes',
        section2_title: ''
    });
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    };

    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section2 || "{}") || {};
        setSection2Data(scData);
        set_title_disabled(!!(scData?.section2_title?.length || 0));
        setInitData({ file: '', label: '', description: '', category_name: '', visible: 'yes', section2_title: scData?.section2_title || "" })
    }, [invBizTempBDData?.homeData]);

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }

    const rowData = section2data?.image_list?.map((d, i) => ({
        ...d,
        "sl": i + 1,
    })) || [];

    const catDataList = section2data?.image_list?.filter((d) => d.visible == "yes");

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
            headerName: "category_name",
            field: "label",
            fontFamily: "var(--dashboard-font)",
            description: "category_name",
            type: "string",
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
            headerName: "photo_name",
            field: "photo_name",
            fontFamily: "var(--dashboard-font)",
            description: "photo_name",
            hide: true,
            type: "string",
        },
        {
            headerName: "photo",
            field: "url",
            description: "photo",
            height: "100px",
            width: "150px",
            type: "photo",
        },
        {
            headerName: "action",
            type: "action",
            icons: ["edit", 'delete'],
            colors: ["success", "error"],
            descriptions: ["update", "Delete Photo"],
            callBacks: [
                (id) => {
                    var data = rowData?.find((d) => d.id == id);
                    setInitData(data);
                    setEditOpen(true);
                    set_disabled(false);
                    setOpen(true);
                },
                (id) => {
                    var data = rowData?.filter((d) => d.id != id);
                    var phData = rowData?.find((d) => d.id == id);
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section2", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];
    const validate = (values) => {
        let errors = {};
        if (!editOpen) {
            if (!values.file) {
                errors.file = t("err_msg_file_choose");
            }
            if (!values.section2_title) {
                errors.section2_title = t("err_msg_section_title");
            }
        }

        if (!values.label) {
            errors.label = t("err_msg_category_name");
        }
        if (!values.visible) {
            errors.visible = t("err_msg_visible");
        }
        return errors;
    };


    const submitForm = (values) => {
        if (editOpen) {
            var data = {
                "id": values.id,
                "sl": values.sl,
                "url": values.url,
                "label": values.label,
                "visible": values.visible,
                "photo_name": values.photo_name,
                "description": values.description,
                "image_id": values.image_id,
            }
            dispatch(updateMTempBodyContentData({ template_id: tempInfo?.template_id || "0", page_name: "home", 'image_id': values?.id || "0", sub_section_name: "", section_name: "section2", 'image_data': JSON.stringify(data || {}) }))
        } else {
            var imgD = [
                {
                    "type": IMGSTTYPE.sibling,
                    "value": [
                        { 'name': 'section2_title', 'value': values?.section2_title || "" },
                    ]
                },
                {
                    "type": IMGSTTYPE.array,
                    "value": [
                        { 'name': 'label', 'value': values?.label || "" },
                        { 'name': 'visible', 'value': values?.visible || "" },
                        { 'name': 'description', 'value': values?.description || "" },
                        { 'name': 'image_id', 'value': values?.image_id || "" },
                    ]
                }

            ]
            var data = new FormData();
            data.append('file', selectedFiles);
            data.append("image_tag", JSON.stringify(imgD));
            data.append("image_type", "template");
            data.append('type', 'save_photo');
            dispatch(uploadIMGUsers(data));
        }
    };

    const createFile = async (url, name, defaultType = 'image/jpeg') => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], name, {
            type: data.type || defaultType,
        });

    }

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(photoUrl, croppedAreaPixels, rotation);
            var photoID = section2data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
            if (tempInfo?.template_id) {
                var imgName = tempInfo?.template_id + "#home#section2##category-" + (photoID + 1);
                const crdFile = await createFile(croppedImage, imgName + ".jpeg")
                setCroppedImage(croppedImage);
                setSelectedFiles(crdFile);
                set_disabled(false);
            }

        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        if (mmImgUploadData.imgUploading == "succeeded") {
            setTimeout(() => {
                setOpen(false);
                imgRef.current.value = '';
                formRef.current.resetForm();
                setPhotoUrl(null);
                setCroppedImage(null);
                set_disabled(true);
            }, 2000);
        }
    }, [mmImgUploadData.imgUploading]);

    useEffect(() => {
        if (invBizTempBDData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                setOpen(false);
                setEditOpen(false);
                formRef.current.resetForm();
                set_disabled(true);
            }, 4000);
        }
    }, [invBizTempBDData.addUpdateLoading]);

    return (
        <>
            <Suspense>
                <Flex row="true">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <InfoCard>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <CardHeaderButton><PrimaryButton type="button" onClick={() => {
                                        setInitData({ file: '', label: '', description: '', category_name: '', visible: 'yes', section2_title: section2data?.section2_title || "" })
                                        setEditOpen(false), setOpen(true)
                                    }}>{t('add_product_and_type')}</PrimaryButton></CardHeaderButton>
                                </Flex>
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <DataGrid
                                        colums={photoColums}
                                        maxheight="65vh"
                                        rows={rowData || []}
                                    />
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>

                </Flex>
            </Suspense>

            <Modal
                md={10}
                sm={11}
                xs={11}
                title={t(editOpen ? "update_product_and_type" : "add_product_and_type")}
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
                                                        <Typography width="100%" txtalign="left">{"* " + t("product_and_type_subttile")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_extension_allowed")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_size_1mb_allowed")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_dimension_300x400_allowed")}</Typography>
                                                    </div>
                                                    <InlineFlex justifycontent="end" width="auto">
                                                        <AlertButton
                                                            type="reset"
                                                            onClick={() => {
                                                                resetForm();
                                                                setPhotoUrl(null);
                                                                setCroppedImage(null);
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
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex md={6} padding="0 !important">
                                                {editOpen ? <></> : <Flex row="true">
                                                    <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                        <Label color="font">{t("section2_title")}</Label>
                                                    </Flex>
                                                    <Flex padding='10px 0 0 0' md={7} sm={4} xs={10}>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="section2_title"
                                                            placeholder={t("section2_title")}
                                                            value={values.section2_title || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            disabled={title_disabled}
                                                        />
                                                        {
                                                            errors.section2_title && touched.section2_title ? <ErrLabel>{errors.section2_title}</ErrLabel> : null
                                                        }
                                                    </Flex>
                                                    <Flex md={2} sm={2} xs={2} padding=" 0 !important">
                                                        <SecondaryButton
                                                            type="button"
                                                            margin="10px 0 0 0"
                                                            onClick={() => {
                                                                set_title_disabled(false)
                                                            }}
                                                            disabled={!title_disabled}
                                                        >
                                                            {t("change")}
                                                        </SecondaryButton>
                                                    </Flex>
                                                </Flex>}
                                                <Flex row="true">
                                                    <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                        <Label color="font">{t("category_name")}</Label>
                                                    </Flex>
                                                    <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="label"
                                                            placeholder={t("ph_category_name")}
                                                            value={values.label || ""}
                                                            disabled={editOpen}
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

                                            </Flex>
                                            {/* <Flex md={6} padding="0 !important">

                                                <Flex row="true">
                                                    <Flex padding='0 !important' md={5} sm={6} xs={12}>
                                                        <InlineDiv justifycontent="start">
                                                            <Label color="font">{t("photo")}</Label>
                                                            <Input
                                                                app="true"
                                                                type="file"
                                                                name="file"
                                                                width={"auto"}
                                                                ref={imgRef}
                                                                accept="image/jpg, image/png, image/jpeg"
                                                                onChange={(e) => {
                                                                    if (e.target.value && e.target.files) {
                                                                        var length = e.target.files[0].size / 1024;
                                                                        var fileName = e.target.files[0].name;
                                                                        var idxDot = fileName.lastIndexOf(".") + 1;
                                                                        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                                                        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                                                                            if (length > 2048) {
                                                                                setPhotoUrl('');
                                                                                setFieldValue('file', "length");
                                                                            } else {
                                                                                setCroppedImage(null)
                                                                                setSelectedFiles(e.target.files[0])
                                                                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                                                setFieldValue('file', fileName)
                                                                            }
                                                                        } else {
                                                                            setPhotoUrl('');
                                                                            setFieldValue('file', "invalid");
                                                                        }

                                                                    }
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.file && touched.file ? <ErrLabel>{errors.file}</ErrLabel> : null
                                                            }
                                                        </InlineDiv>
                                                    </Flex>
                                                    <Flex padding='0 !important' md={7} sm={6} xs={12}>
                                                        <CardHeaderButton>
                                                            <CheckboxChildren size="md" checked={values.visible == "yes"} onClick={() => setFieldValue("visible", values.visible == "yes" ? "no" : "yes")}>
                                                                <Label>{t("showin_page")} <RedMark>*</RedMark></Label>
                                                            </CheckboxChildren>
                                                        </CardHeaderButton>
                                                    </Flex>
                                                </Flex>
                                                <SizeBox />

                                                <Flex row="true">
                                                    <Flex md={12} padding='0 !important'>
                                                        {croppedImage ? <></> : photoUrl && <InfoCard height="350px" >
                                                            <Cropper
                                                                image={photoUrl}
                                                                crop={crop}
                                                                zoom={zoom}
                                                                showGrid={false}
                                                                restrictPosition={true}
                                                                aspect={4 / 3}
                                                                style={{
                                                                    containerStyle: { height: 'auto', width: 'auto', },
                                                                    cropAreaStyle: { minHeight: '300px', minWidth: '400px', height: 'auto', width: 'auto', },
                                                                    mediaStyle: { top: 0, maxWidth: "100%", height: 'auto', width: 'auto' }
                                                                }}
                                                                onCropChange={setCrop}
                                                                onRotationChange={setRotation}
                                                                onCropComplete={onCropComplete}
                                                                onZoomChange={setZoom}
                                                            />
                                                        </InfoCard>}
                                                        {croppedImage ? <></> : photoUrl && <Center>
                                                            <Input
                                                                type="range"
                                                                value={zoom}
                                                                min={1}
                                                                max={10}
                                                                step={0.1}
                                                                aria-labelledby="Zoom"
                                                                onChange={(e) => {
                                                                    setZoom(e.target.value)
                                                                }}
                                                                className="zoom-range"
                                                            />

                                                            <AlertButton
                                                                type="button"
                                                                onClick={showCroppedImage}
                                                            >
                                                                {t("crop")}
                                                            </AlertButton>
                                                        </Center>}
                                                    </Flex>
                                                </Flex>
                                               
                                                {croppedImage &&
                                                    <Flex row="true">
                                                        <Flex padding='0 !important' md={3} sm={6} xs={12}>
                                                            <Label color="font">{t("preview")}</Label>
                                                        </Flex>
                                                        <Flex padding='0 !important' md={9} sm={6} xs={12}>
                                                            <ShadowCard height="200px">
                                                                <Center><KDImg height="180px" src={croppedImage} alt="selected photo view here"></KDImg></Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    </Flex>}
                                            </Flex> */}
                                            <Flex md={6} padding="0 !important">
                                                <Flex row="true">
                                                    <Flex padding='0 !important' md={7} sm={6} xs={12}>
                                                        <Flex row="true">
                                                            <Flex padding='0 !important' md={4} sm={6} xs={12}>
                                                                {editOpen ? <Label color="font">{t("change_photo")} {!editOpen && <RedMark>*</RedMark>}</Label> : <Label color="font">{t("photo")} {!editOpen && <RedMark>*</RedMark>}</Label>}

                                                            </Flex>
                                                            <Flex padding='0 !important' md={8} sm={6} xs={12}>
                                                                <Input
                                                                    app="true"
                                                                    type="file"
                                                                    name="file"
                                                                    width={"auto"}
                                                                    ref={imgRef}
                                                                    accept="image/jpg, image/png, image/jpeg"
                                                                    onChange={(e) => {
                                                                        if (e.target.value && e.target.files) {
                                                                            var length = e.target.files[0].size / 1024;
                                                                            var fileName = e.target.files[0].name;
                                                                            var idxDot = fileName.lastIndexOf(".") + 1;
                                                                            var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                                                            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                                                                                if (length > 2048) {
                                                                                    setPhotoUrl('');
                                                                                    setFieldValue('file', "length");
                                                                                } else {
                                                                                    setCroppedImage(null);
                                                                                    setSelectedFiles(e.target.files[0]);
                                                                                    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                                                    setFieldValue('file', fileName);
                                                                                    // Clear existing image URL when new file is selected
                                                                                    if (editOpen) setFieldValue('url', '');
                                                                                }
                                                                            } else {
                                                                                setPhotoUrl('');
                                                                                setFieldValue('file', "invalid");
                                                                            }
                                                                        }
                                                                    }}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {errors.file && touched.file && (
                                                                    <ErrLabel>{errors.file}</ErrLabel>
                                                                )}

                                                            </Flex>
                                                        </Flex>
                                                        {/* <Label color="font">{t("photo")} {!editOpen && <RedMark>*</RedMark>}</Label> */}


                                                    </Flex>
                                                    <Flex padding='0 !important' md={5} sm={6} xs={12}>
                                                        <CardHeaderButton>
                                                            <CheckboxChildren
                                                                size="md"
                                                                checked={values.visible == "yes"}
                                                                onClick={() => setFieldValue("visible", values.visible == "yes" ? "no" : "yes")}
                                                            >
                                                                <Label>{t("showin_page")} <RedMark>*</RedMark></Label>
                                                            </CheckboxChildren>
                                                        </CardHeaderButton>
                                                    </Flex>
                                                </Flex>

                                                <SizeBox />


                                                {editOpen && values.url && !photoUrl && !croppedImage && (
                                                    <Flex row="true">
                                                        <Flex padding='0 !important' md={3} sm={6} xs={12}>
                                                            <Label color="font">{t("current_image")}</Label>
                                                        </Flex>
                                                        <Flex padding='0 !important' md={9} sm={6} xs={12}>
                                                            <ShadowCard height="200px">
                                                                <Center>
                                                                    <KDImg
                                                                        height="180px"
                                                                        src={values.url}
                                                                        alt="current product image"
                                                                    />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    </Flex>
                                                )}

                                                {photoUrl && (
                                                    <>
                                                        <Flex row="true">
                                                            <Flex md={12} padding='0 !important'>
                                                                <InfoCard height="350px">
                                                                    <Cropper
                                                                        image={photoUrl}
                                                                        crop={crop}
                                                                        zoom={zoom}
                                                                        showGrid={false}
                                                                        restrictPosition={true}
                                                                        aspect={4 / 3}
                                                                        style={{
                                                                            containerStyle: { height: 'auto', width: 'auto' },
                                                                            cropAreaStyle: { minHeight: '300px', minWidth: '400px', height: 'auto', width: 'auto' },
                                                                            mediaStyle: { top: 0, maxWidth: "100%", height: 'auto', width: 'auto' }
                                                                        }}
                                                                        onCropChange={setCrop}
                                                                        onRotationChange={setRotation}
                                                                        onCropComplete={onCropComplete}
                                                                        onZoomChange={setZoom}
                                                                    />
                                                                </InfoCard>
                                                            </Flex>
                                                        </Flex>
                                                        <Center>
                                                            <Input
                                                                type="range"
                                                                value={zoom}
                                                                min={1}
                                                                max={10}
                                                                step={0.1}
                                                                aria-labelledby="Zoom"
                                                                onChange={(e) => setZoom(e.target.value)}
                                                                className="zoom-range"
                                                            />
                                                            <AlertButton
                                                                type="button"
                                                                onClick={showCroppedImage}
                                                            >
                                                                {t("crop")}
                                                            </AlertButton>
                                                        </Center>
                                                    </>
                                                )}

                                                {/* Cropped Image Preview */}
                                                {croppedImage && (
                                                    <Flex row="true">
                                                        <Flex padding='0 !important' md={3} sm={6} xs={12}>
                                                            <Label color="font">{t("preview")}</Label>
                                                        </Flex>
                                                        <Flex padding='0 !important' md={9} sm={6} xs={12}>
                                                            <ShadowCard height="200px">
                                                                <Center>
                                                                    <KDImg
                                                                        height="180px"
                                                                        src={croppedImage}
                                                                        alt="new product image preview"
                                                                    />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    </Flex>
                                                )}
                                                {editOpen && values.url && !photoUrl && !croppedImage && (
                                                    <Flex row="true">
                                                        <Flex padding='10px 0 0 0' md={12} sm={12} xs={12}>
                                                            <Typography>
                                                                {t("current_image")}: {values.photo_name || "N/A"}
                                                            </Typography>
                                                        </Flex>
                                                    </Flex>
                                                )}
                                            </Flex>


                                        </Flex>
                                    </InfoCard>
                                </form>
                            </div>
                        );
                    }}
                </Formik>


            </Modal>

        </>

    );
};
