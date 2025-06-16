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
import { AlertButton, PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import DataGrid from "../../component/DataGrid";
import { KDImg } from "../../component/style/styled_img";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import Cropper from "react-easy-crop";
import { Center } from "../../component/style/styled_center";
import { IMGSTTYPE } from "../../utils/helper";
import { CompProductDetailsCard } from "../../component/TempContent/ProductLabelCard";
import { Toast } from "../../component/Toast";



export const MUpTempBodySC6Page = ({ tempInfo = {} }) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [section6Data, setSection6Data] = useState({});
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [disabled, set_disabled] = useState(true);
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
        product_name: '',
        price: '',
        price_off: '', 
        section6_title: ''
    });
    const onCropComplete = (croppedArea, croppedAreaPixels) => {

        setCroppedAreaPixels(croppedAreaPixels)
    };

    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section6 || "{}") || {}; 
        setSection6Data(scData);
        set_title_disabled(!!(scData?.section6_title?.length || 0));
        setInitData({ file: '', product_name: '', price: '', price_off: '', section6_title: scData?.section6_title || "" })
    }, [invBizTempBDData?.homeData]);

    const rowData = section6Data?.image_list?.map((d, i) => ({
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
            headerName: "product_name",
            field: "label",
            fontFamily: "var(--dashboard-font)",
            description: "product_name",
            type: "string",
        },
        {
            headerName: "price",
            field: "price",
            fontFamily: "var(--dashboard-font)",
            description: "price",
            type: "string",
        },
        {
            headerName: "priceoff",
            field: "priceoff",
            fontFamily: "var(--dashboard-font)",
            description: "priceoff",
            type: "string",
        },
        {
            headerName: "tag",
            field: "tag",
            fontFamily: "var(--dashboard-font)",
            description: "offer_tag",
            type: "string",
        },
        {
            headerName: "photo_name",
            field: "photo_name",
            fontFamily: "var(--dashboard-font)",
            description: "photo_name",
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
            icons: ["download", 'delete'],
            colors: ["success", "error"],
            descriptions: ["download", "Delete Photo"],
            callBacks: [
                (id) => {
                    var data = rowData?.find((d) => d.id == id);
                    const a = document.createElement('a')
                    a.href = data?.url;
                    a.target = "_blank";
                    a.download = data?.photo_name + '.jpg'
                    a.click();
                },
                (id) => {
                    var data = rowData?.filter((d) => d.id != id);
                    var phData = rowData?.find((d) => d.id == id);
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section6", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];
    const validate = (values) => {
        let errors = {};
        if (!values.file) {
            errors.file = t("err_msg_file_choose");
        }
        if (!values.section6_title) {
            errors.section6_title = t("err_msg_section_title");
        }
        if (!values.product_name) {
            errors.product_name = t("err_msg_product_name");
        }
        if (!values.price) {
            errors.price = t("err_msg_price");
        }

        return errors;
    };


    const submitForm = (values) => { 
        if (selectedFiles.size > 0) {
            var imgD = [
                {
                    "type": IMGSTTYPE.sibling,
                    "value": [
                        { 'name': 'section6_title', 'value': values.section6_title || "" },
                    ]
                },
                {
                    "type": IMGSTTYPE.array,
                    "value": [
                        { 'name': 'label', 'value': values.product_name || "" },
                        { 'name': 'price', 'value': values?.price || "" },
                        { 'name': 'tag', 'value': IMGSTTYPE.lbl_flashsale },
                        { 'name': 'priceoff', 'value': values?.price_off || "" }
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
            var photoID = section6Data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
            if (tempInfo?.template_id) {
                var imgName = tempInfo?.template_id + "#home#section6##flash_sale-" + (photoID + 1);
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

    return (
        <> {errMsg ? <Toast color="error" msg={errMsg} /> : ""}
            <Suspense>
                <Flex row="true">
                    <Flex md={12}>
                        <InfoCard background="primaryHover">
                            <Typography fntsize="cardTitleFontSize">{t("Preview")}</Typography>
                            <SizeBox height="8px" />
                            <ShadowCard>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {section6Data?.section6_title || t("flash_sale")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={12} padding="10px 0 0 0!important">
                                        <Flex row="true">
                                            {rowData?.map((d, i) =>
                                                <Flex key={i} md={3}>
                                                    <CompProductDetailsCard noborder={null} height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={d.label || t('product_title') + (i + 1)} />
                                                </Flex>)}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </ShadowCard>
                        </InfoCard>
                    </Flex>
                </Flex>
                <SizeBox />
                <Flex row="true">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <InfoCard>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <CardHeaderButton><PrimaryButton type="button" onClick={() => setOpen(true)}>{t('add_new')}</PrimaryButton></CardHeaderButton>
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
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("section6_title")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={7} sm={4} xs={10}>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="section6_title"
                                                    placeholder={t("section6_title")}
                                                    value={values.section6_title || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={title_disabled}
                                                />
                                                {
                                                    errors.section6_title && touched.section6_title ? <ErrLabel>{errors.section6_title}</ErrLabel> : null
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
                                        </Flex>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("product_name")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="product_name"
                                                    placeholder={t("product_name")}
                                                    value={values.product_name || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.product_name && touched.product_name ? <ErrLabel>{errors.product_name}</ErrLabel> : null
                                                }
                                            </Flex>
                                        </Flex>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("price")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
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
                                            </Flex>
                                        </Flex>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("price_off")}</Label>
                                            </Flex>
                                            <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    width="100%"
                                                    name="price_off"
                                                    placeholder={t("price_off")}
                                                    value={values.price_off || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </Flex>
                                        </Flex> 
                                        <Flex row="true">
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
