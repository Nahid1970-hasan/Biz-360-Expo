import { Suspense, useEffect, useRef, useState } from "react";
import { CompBannerSection } from "../../component/TempContent/BannerSection";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SizeBox } from "../../component/style/styled_sizebox";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../../component/style/styled_card";
import { Typography } from "../../component/style/styled_typography";
import DataGrid from "../../component/DataGrid";
import { KDImg } from "../../component/style/styled_img";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { Center } from "../../component/style/styled_center";
import { Label } from "../../component/style/styled_label";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { Input } from "../../component/style/styled_input";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropimg";
import { DateTime } from "luxon";
import { uploadIMGUsers } from "./mmb_image_upload_slice";
import { addBDSC1Data, saveMTempBodyData } from "./inv_biz_temp_bd_slice";
import { Toast } from "../../component/Toast";
import { replace } from "feather-icons";
import { IMGSTTYPE } from "../../utils/helper";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";



export const MUpTempBodySC3Page = ({ tempInfo = {} }) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const [open, setOpen] = useState(false);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [previewPhoto, setPreviewPhoto] = useState();
    const [section3data, setSection3Data] = useState({});
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [disabled, set_disabled] = useState(true);
    const formRef = useRef();
    const imgRef = useRef();
    const dispatch = useDispatch();
    const [crop, setCrop] = useState({ x: 800, y: 400 })
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null);
    const [errMsg, setErrMsg] = useState("");

    const onCropComplete = (croppedArea, croppedAreaPixels) => {

        setCroppedAreaPixels(croppedAreaPixels)
    }
    const [initData, setInitData] = useState({
        file: '',
    })

    useEffect(() => {
        setSection3Data(JSON.parse(invBizTempBDData?.homeData?.section3 || "{}"));
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
            height: "150px",
            width: "350px",
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
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section3", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];

    const rowData = section3data?.image_list?.map((d, i) => ({
        ...d,
        "sl": i + 1,
    })) || [];

    const validate = (values) => {
        let errors = {};
        if (!values.file) {
            errors.file = t("err_msg_file_choose");
        }
        return errors;
    };

    const submitForm = (values) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", JSON.stringify([{ "type": IMGSTTYPE.array, "value": [] }]));
        data.append("image_type", "template");
        data.append('type', 'save_photo');
        dispatch(uploadIMGUsers(data));
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
            var photoID = section3data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
            if (tempInfo?.template_id) {
                var imgName = tempInfo?.template_id + "#home#section3##exclusive-" + (photoID + 1);
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
            setTimeout(() => { setOpen(false); }, 2000);
        }
    }, [mmImgUploadData.imgUploading]);

    const handleAddNewItem = () => {
        if (rowData.length >= IMGSTTYPE.home_sc3_limit) {
            setOpen(false);
            setErrMsg(t('maximum_number_of_allowed_upload_photo_is_exceed'));
            setTimeout(() => { setErrMsg("") }, 4000);
        } else {
            setOpen(true);
        }
    }
    return (
        <>
            {errMsg ? <Toast color="error" msg={errMsg} /> : ""}
            <Suspense>
                <Flex row="true">
                    <Flex padding="0 !important" md={8} sm={6} xs={12}>t('add_exclusive_offer')
                        <InfoCard>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <CardHeaderButton>
                                        <PrimaryButton type="button" onClick={handleAddNewItem}>{t("add_exclusive_offer")}</PrimaryButton></CardHeaderButton>

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
                sm={10}
                xs={10}
                title={t("add_exclusive_offer")}
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
                                                        <Typography width="100%" txtalign="left">{"* " + t("exclusive_offer_subtitle")}</Typography>
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

                                    <CardBody>
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                <Label color="font">{t("photo")}</Label>
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
                                                    errors.file && touched.file ? <Label>{errors.file}</Label> : null
                                                }
                                            </Flex>
                                            <Flex md={12}>
                                                {croppedImage ? <></> : photoUrl && <InfoCard height="600px" >
                                                    <Cropper
                                                        image={photoUrl}
                                                        crop={crop}
                                                        zoom={zoom}
                                                        showGrid={false}
                                                        restrictPosition={true}
                                                        aspect={5 / 3}
                                                        style={{
                                                            containerStyle: { height: 'auto', width: 'auto', },
                                                            cropAreaStyle: { minHeight: '300px', minWidth: '350px', height: 'auto', width: 'auto', },
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
                                        <Flex row="true">
                                            <Flex padding='10px 0 0 0' md={11.99} sm={12} xs={12}>
                                                {croppedImage && <ShadowCard> <Center><KDImg src={croppedImage} alt="selected photo view here"></KDImg></Center></ShadowCard>}
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
