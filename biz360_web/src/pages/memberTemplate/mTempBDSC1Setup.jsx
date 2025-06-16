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
import { ErrLabel, Label, RedMark } from "../../component/style/styled_label";
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
import { daysLeftCount, IMGSTTYPE, VISIBLELIST } from "../../utils/helper";
import { Select } from "../../component/style/styled_select";
import { ULine } from "../../component/style/styled_uline";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { CheckboxChildren } from "../../component/Checkbox";

export const MUpTempBodySC1Page = ({ tempInfo = {}}) => {
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const userData = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const { t, i18n } = useTranslation();
    const [previewPhoto, setPreviewPhoto] = useState();
    const [section1data, setSection1Data] = useState({});
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [disabled, set_disabled] = useState(true);
    const formRef = useRef();
    const imgRef = useRef();
    const dispatch = useDispatch();
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [daysLeft, setDaysLeft] = useState(-1);
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }
    const [initData, setInitData] = useState({
        file: '',
        visible: ''
    })

    useEffect(() => {
        setSection1Data(JSON.parse(invBizTempBDData?.homeData?.section1 || "{}"));
    }, [invBizTempBDData?.homeData]);

    useEffect(() => {
        setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
    }, [userData?.dashboard]);

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
            width: "60px"
        },
        {
            headerName: "photo_name",
            field: "photo_name",
            fontFamily: "var(--dashboard-font)",
            description: "photo_name",
            type: "string",
            width: "150px",
        },
        {
            headerName: "visible",
            field: "visible",
            description: "visibility",
            width: "80px",
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
                    dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", sub_section_name: "", section_name: "section1", "photo_name": phData?.photo_name || "", 'content': JSON.stringify({ 'image_list': data }) }))
                },
            ],
        },
    ];

    const rowData = section1data?.image_list?.map((d, i) => ({
        ...d,
        "sl": i + 1,
    })) || [];

    const bannerDataList = section1data?.image_list?.filter((d) => d.visible == "yes");

    const validate = (values) => {
        let errors = {};
        if (!values.file) {
            errors.file = t("err_msg_file_choose");
        }
        if (!values.visible) {
            errors.visible = t("err_msg_visibility");
        }
        return errors;
    };

    const submitForm = (values) => {
        if (daysLeft < 0 == false) {
            var data = new FormData();
            data.append('file', selectedFiles);
            data.append("image_tag", JSON.stringify([{ "type": IMGSTTYPE.array, "value": [{ 'name': 'visible', 'value': values.visible }] }]));
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
            var photoID = section1data?.image_list?.map((d) => parseInt(d.id)).sort((a, b) => b - a)[0] || 0;
            if (tempInfo?.template_id) {
                var imgName = tempInfo?.template_id + "#home#section1##banner-" + (photoID + 1);
                const crdFile = await createFile(croppedImage, imgName + ".jpeg")
                setCroppedImage(croppedImage);
                setSelectedFiles(crdFile);
                set_disabled(false);
            }

        } catch (e) {
            console.error(e)
        }
    }

    // useEffect(() => {
    //     if (mmImgUploadData.photoUrl != "") {
    //         var imgName = mmImgUploadData.photoUrl.split("/").pop() || "";
    //         dispatch(addBDSC1Data({ 'url': mmImgUploadData.photoUrl, "photo_name": imgName}))
    //     }
    // }, [mmImgUploadData.photoUrl]);

    useEffect(() => {
        if (mmImgUploadData.imgUploading == "succeeded") {
            setTimeout(() => {
                setOpen(false);
                imgRef.current.value = '';
                setPhotoUrl(null);
                setCroppedImage(null);
                set_disabled(true);
            }, 2000);
        }
    }, [mmImgUploadData.imgUploading]);


    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    return (
        <>
            <Suspense>
                <Flex row="true">
                    <Flex padding="0 !important" md={8} sm={10} xs={12}>
                        <InfoCard>
                            <Flex row="true">
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <CardHeaderButton><PrimaryButton disabled={daysLeft<0} type="button" onClick={daysLeft<0? null : () => { console.log(daysLeft), setOpen(true) }}>{t('add_banner')}</PrimaryButton></CardHeaderButton>
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
                title={t("add_banner")}
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
                                        <Flex md={12} sm={12} xs={12} padding="0 !important">
                                            <InfoCard>
                                                <InlineDiv alignitems="start">
                                                    <div>
                                                        <Typography width="100%" txtalign="left">{"* " + t("banner_page_subtitle")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_extension_allowed")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_size_2mb_allowed")}</Typography>
                                                        <Typography width="100%" txtalign="left">{"* " + t("image_dimension_300x1200_allowed")}</Typography>
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
                                                            disabled={!(dirty && isValid) || disabled || daysLeft < 0}
                                                        >
                                                            {t("submit")}
                                                        </PrimaryButton>
                                                    </InlineFlex>
                                                </InlineDiv>
                                            </InfoCard>

                                        </Flex>
                                    </Flex>
                                    <SizeBox />

                                    <Flex row="true">
                                        <Flex padding='0 !important' md={3} sm={6} xs={12}>
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
                                        <Flex padding='0 !important' md={9} sm={6} xs={12}>
                                            <CardHeaderButton>
                                                <CheckboxChildren size="md" checked={values.visible == "yes"} onClick={() => setFieldValue("visible", values.visible == "yes" ? "No" : "yes")}>
                                                    <Label>{t("showin_page")} <RedMark>*</RedMark></Label>
                                                </CheckboxChildren>
                                            </CardHeaderButton>
                                        </Flex>
                                    </Flex>
                                    <SizeBox />
                                    <Flex row="true">
                                        <Flex padding='0' md={12} sm={12} xs={12}>
                                            {croppedImage ? <></> : photoUrl && <InfoCard height="320px" >
                                                <Cropper
                                                    image={photoUrl}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    showGrid={false}
                                                    restrictPosition={true}
                                                    aspect={6 / 1}
                                                    style={{
                                                        containerStyle: { height: 'auto', width: 'auto', },
                                                        cropAreaStyle: { minHeight: '300px', minWidth: '1200px', height: 'auto', width: 'auto', },
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
                                        <Flex padding='0' md={12} sm={12} xs={12}>
                                            {croppedImage && <Center><KDImg height="300px" width="auto" src={croppedImage} alt="selected photo view here"></KDImg></Center>}
                                        </Flex>
                                    </Flex>

                                </form>
                            </div>
                        );
                    }}
                </Formik>


            </Modal>
        </>

    );
};
