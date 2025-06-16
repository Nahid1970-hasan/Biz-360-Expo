import { Suspense, useEffect, useRef, useState } from "react";
import { Flex } from "../../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../../../component/style/styled_card";
import getCroppedImg from "../../../utils/cropimg";
import { uploadIMGUsers } from "../mmb_image_upload_slice";
import { saveMTempBodyData, updateMTempBodyContentData } from "../inv_biz_temp_bd_slice";
import { AlertButton, PrimaryButton } from "../../../component/style/styled_button";
import DataGrid from "../../../component/DataGrid";
import { KDImg } from "../../../component/style/styled_img";
import { Modal } from "../../../component/Modal";
import { Formik } from "formik";
import { ErrLabel, Label, RedMark } from "../../../component/style/styled_label";
import { Input } from "../../../component/style/styled_input";
import Cropper from "react-easy-crop";
import { Center } from "../../../component/style/styled_center";
import { checkAnyNumber, checkNumber, getValueByLang, IMGSTTYPE, VISIBLELIST } from "../../../utils/helper";
import { Toast } from "../../../component/Toast";
import { Select } from "../../../component/style/styled_select";
import { Typography } from "../../../component/style/styled_typography";
import { SizeBox } from "../../../component/style/styled_sizebox";
import { CheckboxChildren, CheckboxLabel } from "../../../component/Checkbox";
import { InlineDiv, InlineFlex } from "../../../component/style/styled_inlineflex";



export const MUpTempSeasonalFProductsPage = ({ tempInfo = {} }) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [section9data, setSection9Data] = useState({});
    const [catList, setCatList] = useState([]);
    const [unitList, setUnitList] = useState([]);
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
    const [pageVisible, setPageVisible] = useState(true);

    const [initData, setInitData] = useState({
        file: '',
        total_price: '',
        price: '',
        priceoff: '',
        description: '',
        visible: '',
        category_id: '',
        unit_id: '',
        unit_name: '',
        unit_description: '',
        quantity: '',
        note: '',
        tag: '',
        category_name: '',
        section9_title: ''
    });
    const onCropComplete = (croppedArea, croppedAreaPixels) => {

        setCroppedAreaPixels(croppedAreaPixels)
    };

    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section9 || "{}") || {};
        setSection9Data(scData);
        var catData = JSON.parse(invBizTempBDData?.homeData?.section2 || "{}") || {};
        setCatList(catData?.image_list?.filter((d) => d.visible == "yes"));
        var unitData = JSON.parse(invBizTempBDData?.homeData?.section8 || "{}") || {};
        var NH = unitData?.image_list?.length > 0 ? unitData?.image_list?.filter((d) => d.visible == "yes")?.map((d, i) => ({
            ...d,
            "quantity_value": (d.quantity || "") + (d.unit_name || "---"),
            "sl": i + 1,
        })) || [] : invBizTempBDData?.unitList?.filter((d) => d.visible == "yes")?.map((d, i) => ({
            ...d,
            label: getValueByLang(d.unit_name || "{}"),
            "quantity_value": (d.quantity || "") + (d.unit_name || "---"),
            description: getValueByLang(d.unit_desc || "{}"),
            "id": i + 1,
        })) || [];

        setUnitList(NH);
        set_title_disabled(!!(scData?.section9_title?.length || 0));

        setInitData({ file: '', product_name: '', price: '', priceoff: '', section9_title: scData?.section9_title || "" })
    }, [invBizTempBDData?.homeData]);

    const rowData = section9data?.image_list?.filter((d) => d.visible == "yes")?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        "quantity_value": (d.quantity || "") + (d.unit_name || "---")
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
            width: "50px"
        },

        {
            headerName: "category",
            field: "category_name",
            fontFamily: "var(--dashboard-font)",
            description: "category_name",
            type: "string",
            width: "150px"
        },

        {
            headerName: "description",
            field: "description",
            fontFamily: "var(--dashboard-font)",
            description: "description",
            type: "board",
        },
        {
            headerName: "quantity",
            field: "quantity_value",
            fontFamily: "var(--dashboard-font)",
            description: "quantity",
            type: "string",
            width: "100px"
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
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section9", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
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

        if (!values.total_price) {
            errors.total_price = t("err_msg_price");
        } else if (!/^\d+$/i.test(values.total_price)) {
            errors.total_price = t("invalid_price_value");
        }


        if (values.priceoff && !/^\d+$/i.test(values.priceoff)) {
            errors.priceoff = t("invalid_discount_value");
        }

        if (values.priceoff > parseInt(values.total_price)) {
            errors.priceoff = t("invalid_discount_value");
        }

        if (!values.category_id) {
            errors.category_id = t("err_msg_choose_category");
        }

        if (!values.quantity) {
            errors.quantity = t("err_msg_choose_quantity");
        }

        if (!values.unit_id) {
            errors.unit_id = t("err_msg_choose_unit");
        }

        if (!values.visible) {
            errors.visible = t("err_msg_visible");
        }
        return errors;
    };


    const submitForm = (values) => {
        if (editOpen) {
            dispatch(updateMTempBodyContentData({ template_id: tempInfo.template_id, page_name: "home", 'image_id': values.id, sub_section_name: "", section_name: "section9", 'image_data': JSON.stringify(values) }))
        } else {
            if (selectedFiles.size > 0) {
                var imgD = [
                    {
                        "type": IMGSTTYPE.sibling,
                        "value": [
                            { 'name': 'section9_title', 'value': values?.section9_title || "Product Package" },
                        ]
                    },
                    {
                        "type": IMGSTTYPE.array,
                        "value": [
                            { 'name': 'quantity', 'value': values?.quantity || "" },
                            { 'name': 'total_price', 'value': values?.total_price + "" },
                            { 'name': 'price', 'value': values?.price + "" },
                            { 'name': 'priceoff', 'value': values?.priceoff + "" },
                            { 'name': 'visible', 'value': values?.visible || "No" },
                            { 'name': 'description', 'value': values?.description || "" },
                            { 'name': 'category_id', 'value': values?.category_id || "0" },
                            { 'name': 'unit_id', 'value': values?.unit_id || "0" },

                            { 'name': 'category_name', 'value': values?.category_name || "" },
                            { 'name': 'unit_name', 'value': values?.unit_name || "" },
                            { 'name': 'unit_description', 'value': values?.unit_description || "" },
                            { 'name': 'note', 'value': values?.note || "" },
                            { 'name': 'tag', 'value': values?.tag || "" },
                            { 'name': 'image_id', 'value': values?.image_id || "" },

                        ]
                    }

                ]
                console.log(imgD)
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
            var photoID = section9data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
            if (tempInfo?.template_id) {
                var imgName = tempInfo?.template_id + "#home#section9##trandy-" + (photoID + 1);
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
                                    <CardHeaderButton><PrimaryButton type="button" onClick={() => { setEditOpen(false); setInitData({ file: '', product_name: '', price: '', priceoff: '', section9_title: section9data?.section4_title || "" }); setOpen(true); }}>{t('add_product_package')}</PrimaryButton></CardHeaderButton>
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
                md={10}
                sm={10}
                xs={12}
                title={t(editOpen ? "update_product_package" : "add_product_package")}
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
                                                        <Typography width="100%" txtalign="left">{"* " + t("product_package_subttile")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_extension_allowed")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_size_1mb_allowed")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_dimension_300x400_allowed")}</Typography>
                                                    </div>
                                                    <InlineFlex justifycontent="end">
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
                                            <Flex md={6}>
                                                <Flex row="true">
                                                    <Flex md={6} sm={6} xs={12}>
                                                        <Label color="font">{t("category")} <RedMark>*</RedMark></Label>
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

                                                        <Label color="font">{t("unit")}<RedMark>*</RedMark></Label>
                                                        <Select
                                                            app="true"
                                                            name="unit_id"
                                                            width="100%"
                                                            onChange={(e) => {
                                                                var slData = unitList.find((d) => d.id == e.target.value);
                                                                console.log(slData)
                                                                setFieldValue('unit_name', e.target.selectedOptions[0].text);
                                                                setFieldValue('unit_description', slData.description);
                                                                formik.handleChange(e);
                                                            }}
                                                            onBlur={handleBlur}
                                                            value={values.unit_id || 0}
                                                        >
                                                            <option disabled value={0} >
                                                                {t("ph_select_val")}
                                                            </option>
                                                            {
                                                                unitList?.map((d, i) => <option key={i} value={d.id}>{t(d.label)}</option>)
                                                            }

                                                        </Select>
                                                        {
                                                            errors.unit_id && touched.unit_id ? <ErrLabel>{errors.unit_id}</ErrLabel> : null
                                                        }
                                                        <Label color="font">{t("quantity")}<RedMark>*</RedMark></Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="quantity"
                                                            placeholder={t("0")}
                                                            onKeyDown={(event) => {
                                                                if (!checkNumber(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                            maxLength={4}
                                                            value={values.quantity || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.quantity && touched.quantity ? <ErrLabel>{errors.quantity}</ErrLabel> : null
                                                        }
                                                        <Label color="font">{t("tag")}</Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="tag"
                                                            placeholder={t("ph_tag")}
                                                            value={values.tag || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.tag && touched.tag ? <ErrLabel>{errors.tag}</ErrLabel> : null
                                                        }
                                                    </Flex>
                                                    <Flex md={6} sm={6} xs={12}>
                                                        <Label color="font">{t("original_price")}<RedMark>*</RedMark></Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="total_price"
                                                            maxLength={6}
                                                            placeholder={t("0")}
                                                            value={values.total_price || ""}
                                                            onKeyDown={(event) => {
                                                                if (!checkNumber(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                            onChange={(e) => {
                                                                var dscprice = parseInt(values?.priceoff || "0") || 0;
                                                                var ttprice = parseInt(e.target.value || "0") || 0;
                                                                var priceval = ttprice - dscprice;
                                                                setFieldValue("price", priceval < 0 ? 0 : priceval)
                                                                formik.handleChange(e);
                                                            }}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.total_price && touched.total_price ? <ErrLabel>{errors.total_price}</ErrLabel> : null
                                                        }

                                                        <Label color="font">{t("price_discount")}</Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="priceoff"
                                                            maxLength={6}
                                                            placeholder={t("0")}
                                                            onKeyDown={(event) => {
                                                                if (!checkNumber(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                            value={values.priceoff || ""}
                                                            onChange={(e) => {
                                                                var ttprice = parseInt(values?.total_price || "0") || 0;
                                                                var dscprice = parseInt(e.target.value || "0") || 0;
                                                                var priceval = ttprice - dscprice;
                                                                setFieldValue("price", priceval < 0 ? 0 : priceval)
                                                                formik.handleChange(e);
                                                            }}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.priceoff && touched.priceoff ? <ErrLabel>{errors.priceoff}</ErrLabel> : null
                                                        }

                                                        <Label color="font">{t("discounted_price")}</Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="price"
                                                            value={values.price || "0"}
                                                            disabled={'disabled'}
                                                        />
                                                        {
                                                            errors.price && touched.price ? <ErrLabel>{errors.price}</ErrLabel> : null
                                                        }
                                                        <Label color="font">{t("short_note")}</Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="note"
                                                            placeholder={t("note")}
                                                            value={values.note || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.note && touched.note ? <ErrLabel>{errors.note}</ErrLabel> : null
                                                        }
                                                    </Flex>
                                                    <Flex md={11.99} sm={12} xs={12}>
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
                                            </Flex>
                                            {/* <Flex md={6}>
                                                 <Flex row="true">
                                                        <Flex padding='10px 0 0 0' md={3.5} sm={6} xs={12}>
                                                            <Label color="font">{t("category_photo")}<RedMark>*</RedMark></Label>
                                                        </Flex>
                                                        <Flex padding='10px 0 0 0' md={8.5} sm={6} xs={12}>
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
                                                        <Flex md={11.9} padding='10px 0 0 0' >
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
                                                                        cropAreaStyle: { minHeight: '200px', minWidth: '350px', height: 'auto', width: 'auto', },
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
                                                                    app={"true"}
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
                                                                    margin="0"
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
                                                        <Flex padding='10px 0 0 0' md={3.5} sm={6} xs={12}>
                                                            <Label color="font">{t("preview")}</Label>
                                                        </Flex>
                                                        <Flex padding='10px 0 0 0' md={8.5} sm={6} xs={12}>
                                                            <ShadowCard height="auto">
                                                                <Center><KDImg height="auto" width={"auto"} src={croppedImage} alt="selected photo view here"></KDImg></Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    </Flex>}
                                                <Flex row="row">
                                                    <Flex md={12} sm={12} xs={12} padding='0'>
                                                        <CheckboxChildren size="md" checked={values.visible == "yes"} onClick={() => setFieldValue("visible", values.visible == "yes" ? "No" : "yes")}>
                                                            <Label>{t("showin_page")} <RedMark>*</RedMark></Label>
                                                        </CheckboxChildren>
                                                    </Flex>
                                                </Flex>
                                            </Flex> */}
                                            <Flex md={6}>
                                                <Flex row="true">
                                                    <Flex padding='10px 0 0 0' md={3.5} sm={6} xs={12}>
                                                        {editOpen ? <Label color="font">{t("change_photo")}<RedMark>*</RedMark></Label> : <Label color="font">{t("category_photo")}<RedMark>*</RedMark></Label>}
                                                        {/* <Label color="font">{t("category_photo")}<RedMark>*</RedMark></Label> */}
                                                    </Flex>
                                                    <Flex padding='10px 0 0 0' md={8.5} sm={6} xs={12}>
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
                                                                            // Clear the existing image URL when uploading new one in edit mode
                                                                            if (editOpen) {
                                                                                setFieldValue('url', '');
                                                                            }
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

                                                    {/* Show existing image in edit mode */}
                                                    {editOpen && values.url && !photoUrl && !croppedImage && (
                                                        <Flex md={11.9} padding='10px 0 0 0'>
                                                            <ShadowCard height="auto">
                                                                <Center>
                                                                    <KDImg
                                                                        height="auto"
                                                                        width={"auto"}
                                                                        src={values.url}
                                                                        alt="current photo"
                                                                    />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    )}

                                                    {!editOpen && croppedImage ? <></> : photoUrl && (
                                                        <Flex md={11.9} padding='10px 0 0 0'>
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
                                                                        cropAreaStyle: { minHeight: '200px', minWidth: '350px', height: 'auto', width: 'auto' },
                                                                        mediaStyle: { top: 0, maxWidth: "100%", height: 'auto', width: 'auto' }
                                                                    }}
                                                                    onCropChange={setCrop}
                                                                    onRotationChange={setRotation}
                                                                    onCropComplete={onCropComplete}
                                                                    onZoomChange={setZoom}
                                                                />
                                                            </InfoCard>
                                                        </Flex>
                                                    )}

                                                    {!editOpen && croppedImage ? <></> : photoUrl && (
                                                        <Center>
                                                            <Input
                                                                app={"true"}
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
                                                                margin="0"
                                                                type="button"
                                                                onClick={showCroppedImage}
                                                            >
                                                                {t("crop")}
                                                            </AlertButton>
                                                        </Center>
                                                    )}
                                                </Flex>

                                                {croppedImage && (
                                                    <Flex row="true">
                                                        <Flex padding='10px 0 0 0' md={3.5} sm={6} xs={12}>
                                                            <Label color="font">{t("preview")}</Label>
                                                        </Flex>
                                                        <Flex padding='10px 0 0 0' md={8.5} sm={6} xs={12}>
                                                            <ShadowCard height="auto">
                                                                <Center>
                                                                    <KDImg
                                                                        height="auto"
                                                                        width={"auto"}
                                                                        src={croppedImage}
                                                                        alt="selected photo view here"
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
