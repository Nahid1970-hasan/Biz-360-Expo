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
import { IMGSTTYPE, PRDSECTORLIST, VISIBLELIST } from "../../utils/helper";
import { CompProductDetailsCard } from "../../component/TempContent/ProductLabelCard";
import { Toast } from "../../component/Toast";
import { Select } from "../../component/style/styled_select";



export const MUpTempBodySC4Page = ({ tempInfo = {} }) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [section4data, setSection4Data] = useState({});
    const [catList, setCatList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [sectorList, setSectorList] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [disabled, set_disabled] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
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
        file: '',
        label: '',
        price: '',
        priceoff: '',
        description: '',
        visible: '',
        category_id: '',
        brand_id: '',
        sector_id: '',
        sector_type: '',
        tag: '',
        category_name: '',
        brand_name: '',
        section4_title: ''
    });
    const onCropComplete = (croppedArea, croppedAreaPixels) => {

        setCroppedAreaPixels(croppedAreaPixels)
    };

    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section4 || "{}") || {};
        setSection4Data(scData);
        var catData = JSON.parse(invBizTempBDData?.homeData?.section2 || "{}") || {};
        setCatList(catData?.image_list?.filter((d) => d.visible == "yes"));
        var sctData = JSON.parse(invBizTempBDData?.homeData?.section5 || "{}") || {};
        setSectorList(sctData?.image_list?.filter((d) => d.visible == "yes"));
        var brndData = JSON.parse(invBizTempBDData?.homeData?.section7 || "{}") || {};
        setBrandList(brndData?.image_list?.filter((d) => d.visible == "yes"));
        set_title_disabled(!!(scData?.section4_title?.length || 0));
        setInitData({ file: '', product_name: '', price: '', priceoff: '', section4_title: scData?.section4_title || "" })
    }, [invBizTempBDData?.homeData]);

    const rowData = section4data?.image_list?.map((d, i) => ({
        ...d,
        "sl": i + 1,
    })) || [];

    const bannerDataList = section4data?.image_list?.filter((d) => d.visible == "yes");

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
            width: "50px"
        },
        {
            headerName: "product_name",
            field: "label",
            fontFamily: "var(--dashboard-font)",
            description: "product_name",
            type: "string",
        },
        {
            headerName: "brand",
            field: "brand_name",
            fontFamily: "var(--dashboard-font)",
            description: "brand_name",
            type: "string",
        },
        {
            headerName: "category",
            field: "category_name",
            fontFamily: "var(--dashboard-font)",
            description: "category_name",
            type: "string",
        },
        {
            headerName: "description",
            field: "description",
            fontFamily: "var(--dashboard-font)",
            description: "description",
            type: "board",
        },
        {
            headerName: "sector_type",
            field: "sector_type",
            fontFamily: "var(--dashboard-font)",
            description: "sector_type",
            type: "string",
        },
        {
            headerName: "price",
            field: "price",
            fontFamily: "var(--dashboard-font)",
            description: "price",
            type: "string",
            width: "100px"
        },
        {
            headerName: "priceoff",
            field: "priceoff",
            fontFamily: "var(--dashboard-font)",
            description: "priceoff",
            type: "string",
            width: "100px"
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
            headerName: "tag",
            field: "tag",
            fontFamily: "var(--dashboard-font)",
            description: "tag",
            type: "string",
            width: "80px"
        },
        {
            headerName: "photo_name",
            field: "photo_name",
            fontFamily: "var(--dashboard-font)",
            description: "photo_name",
            type: "string",
            hide: true,
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
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section4", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
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
        }

        if (!values.label) {
            errors.label = t("err_msg_product_name");
        }
        if (!values.price) {
            errors.price = t("err_msg_price");
        }

        if (!values.category_id) {
            errors.category_id = t("err_msg_choose_category");
        }

        if (!values.brand_id) {
            errors.brand_id = t("err_msg_choose_brand");
        }

        if (!values.sector_id) {
            errors.sector_id = t("err_msg_sector_type");
        }

        if (!values.visible) {
            errors.visible = t("err_msg_visible");
        }
        return errors;
    };


    const submitForm = (values) => {
        if (editOpen) {
            dispatch(updateMTempBodyContentData({ template_id: tempInfo.template_id, page_name: "home", 'image_id': values.id, sub_section_name: "", section_name: "section4", 'image_data': JSON.stringify(values) }))
        } else {
            if (selectedFiles.size > 0) {
                var imgD = [
                    {
                        "type": IMGSTTYPE.sibling,
                        "value": [
                            { 'name': 'section4_title', 'value': values.section4_title || "" },
                        ]
                    },
                    {
                        "type": IMGSTTYPE.array,
                        "value": [
                            { 'name': 'label', 'value': values.label || "" },
                            { 'name': 'price', 'value': values?.price || "" },
                            { 'name': 'priceoff', 'value': values?.priceoff || "" },
                            { 'name': 'visible', 'value': values.visible },
                            { 'name': 'description', 'value': values.description },

                            { 'name': 'category_id', 'value': values.category_id },
                            { 'name': 'brand_id', 'value': values.brand_id },

                            { 'name': 'category_name', 'value': values.category_name },
                            { 'name': 'brand_name', 'value': values.brand_name },

                            { 'name': 'sector_id', 'value': values.sector_id },
                            { 'name': 'sector_type', 'value': values.sector_type },

                            { 'name': 'tag', 'value': values.tag },

                        ]
                    }

                ]
                var data = new FormData();
                data.append('file', selectedFiles);
                data.append("image_tag", JSON.stringify(imgD));
                data.append("image_type", "template");
                data.append('type', 'save_photo');
                dispatch(uploadIMGUsers(data));
            } else {
                setErrMsg(t('file_is_not_found'));
                setTimeout(() => { setErrMsg("") }, 4000);
            }
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
            var photoID = section4data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
            if (tempInfo?.template_id) {
                var imgName = tempInfo?.template_id + "#home#section4##trandy-" + (photoID + 1);
                const crdFile = await createFile(croppedImage, imgName + ".jpeg")
                setCroppedImage(croppedImage);
                setSelectedFiles(crdFile);
                set_disabled(false);
            }

        } catch (e) {
            setErrMsg(t('file_is_invalid_pls_try_another'));
            setTimeout(() => { setErrMsg("") }, 4000);
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
        <> {errMsg ? <Toast color="error" msg={errMsg} /> : ""}
            <Suspense> 
                <Flex row="true">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <InfoCard>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <CardHeaderButton><PrimaryButton type="button" onClick={() => { setEditOpen(false); setInitData({ file: '', product_name: '', price: '', priceoff: '', section4_title: section4data?.section4_title || "" }); setOpen(true); }}>{t('add_new')}</PrimaryButton></CardHeaderButton>
                                </Flex>
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <DataGrid
                                        colums={photoColums}
                                        maxheight="70vh"
                                        rows={rowData || []}
                                    />
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>

                </Flex>
            </Suspense>

            <Modal
                md={8}
                sm={10}
                xs={12}
                title={t("add_photo")}
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
                                    <CardHeaderButton>
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
                                    </CardHeaderButton>
                                    <CardBody>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={6} sm={6} xs={12}>
                                                <Label color="font">{t("product_name")}</Label>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="label"
                                                    placeholder={t("product_name")}
                                                    value={values.label || ""}
                                                    disabled={editOpen}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.label && touched.label ? <ErrLabel>{errors.label}</ErrLabel> : null
                                                }
                                                <Label color="font">{t("brand")}</Label>
                                                <Select
                                                    app="true"
                                                    name="brand_id"
                                                    width="100%"
                                                    onChange={(e) => {
                                                        setFieldValue('brand_name', e.target.selectedOptions[0].text);
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.brand_id || 0}
                                                >
                                                    <option disabled value={0} >
                                                        {t("ph_select_val")}
                                                    </option>
                                                    {
                                                        brandList?.map((d, i) => <option key={i} value={d.id}>{t(d.label)}</option>)
                                                    }

                                                </Select>
                                                {
                                                    errors.brand_id && touched.brand_id ? <ErrLabel>{errors.brand_id}</ErrLabel> : null
                                                }
                                                <Label color="font">{t("category")}</Label>
                                                <Select
                                                    app="true"
                                                    name="category_id"
                                                    width="100%"
                                                    onChange={(e) => {
                                                        setFieldValue('category_name', e.target.selectedOptions[0].text);
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.category_id || 0}
                                                >
                                                    <option disabled value={0} >
                                                        {t("ph_select_val")}
                                                    </option>
                                                    {
                                                        catList?.map((d, i) => <option key={i} value={d.id}>{d.label}</option>)
                                                    }
                                                </Select>
                                                {
                                                    errors.category_id && touched.category_id ? <ErrLabel>{errors.category_id}</ErrLabel> : null
                                                }
                                                <Label color="font">{t("sector_type")}</Label>
                                                <Select
                                                    app="true"
                                                    name="sector_id"
                                                    width="100%"
                                                    onChange={(e) => {
                                                        setFieldValue('sector_type', e.target.selectedOptions[0].text);
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    value={values.sector_id || 0}
                                                >
                                                    <option disabled value={0} >
                                                        {t("ph_select_val")}
                                                    </option>
                                                    {
                                                        sectorList?.map((d, i) => <option key={i} value={d.id}>{d.collection_title}</option>)
                                                    }
                                                </Select>
                                                {
                                                    errors.sector_id && touched.sector_id ? <ErrLabel>{errors.sector_id}</ErrLabel> : null
                                                }
                                            </Flex>
                                            <Flex md={6} sm={6} xs={12}>

                                                <Label color="font">{t("tag")}</Label>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="tag"
                                                    placeholder={t("tag")}
                                                    value={values.tag || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.tag && touched.tag ? <ErrLabel>{errors.tag}</ErrLabel> : null
                                                }
                                                <Label color="font">{t("price")}</Label>

                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="price"
                                                    placeholder={t("price")}
                                                    value={values.price || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.price && touched.price ? <ErrLabel>{errors.price}</ErrLabel> : null
                                                }
                                                <Label color="font">{t("priceoff")}</Label>

                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="priceoff"
                                                    placeholder={t("priceoff")}
                                                    value={values.priceoff || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />

                                                <Label color="font">{t("visible")}</Label>
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
                                            <Flex md={12} sm={12} xs={12}>
                                                <Label color="font">{t("description")}</Label>
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



                                        {
                                            editOpen ? <></> : <Flex row="true">
                                                <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                    <Label color="font">{t("category_photo")}</Label>
                                                </Flex>
                                                <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                    <Input
                                                        app="true"
                                                        type="file"
                                                        name="file"
                                                        ref={imgRef}
                                                        accept="image/jpg,image/png, image/gif, image/jpeg"
                                                        onChange={(e) => {
                                                            if (e.target.value && e.target.files) {
                                                                var length = e.target.files[0].size / 1024;
                                                                var fileName = e.target.files[0].name;
                                                                var idxDot = fileName.lastIndexOf(".") + 1;
                                                                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                                                if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
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
                                                </Flex>
                                                <Flex md={12}>
                                                    {croppedImage ? <></> : photoUrl && <InfoCard height="400px" >
                                                        <Cropper
                                                            image={photoUrl}
                                                            crop={crop}
                                                            zoom={zoom}
                                                            showGrid={false}
                                                            restrictPosition={true}
                                                            aspect={4 / 3}
                                                            style={{
                                                                containerStyle: { height: 'auto', width: 'auto', },
                                                                cropAreaStyle: { minHeight: '200px', minWidth: '250px', height: 'auto', width: 'auto', },
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
                                        }
                                        {croppedImage &&
                                            <Flex row="true">
                                                <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                    <Label color="font">{t("preview")}</Label>
                                                </Flex>
                                                <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                    <ShadowCard height="200px">
                                                        <Center><KDImg height="180px" src={croppedImage} alt="selected photo view here"></KDImg></Center>
                                                    </ShadowCard>
                                                </Flex>
                                            </Flex>}
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
