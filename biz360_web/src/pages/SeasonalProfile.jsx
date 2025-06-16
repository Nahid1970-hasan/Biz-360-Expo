import { useEffect, useRef, useState } from "react";
import { initImgLoader, uploadIMGUsers } from "./memberTemplate/mmb_image_upload_slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { loadPage } from "../features/page/page_slice";
import { getValueByLang, IMGTAGLIST, langs } from "../utils/helper";
import { ErrLabel, HLLabel, Label } from "../component/style/styled_label";
import { config } from "../config/config";
import { PrimaryButton } from "../component/style/styled_button";
import { Formik } from "formik";
import { Input } from "../component/style/styled_input";
import { Center } from "../component/style/styled_center";
import { KDImg } from "../component/style/styled_img";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import { loadSeasonalProfile, updateSeasonal, initLoader } from "../features/profile/seasonal_profile_slice";
import { SizeBox } from "../component/style/styled_sizebox";
import { TextArea } from "../component/style/styled_textarea";


export const SeasonalProfilePage = () => {
    const user = useSelector((state) => state.seasonalprofile);
    const userinfo = useSelector((state) => state.user);
    const mmImgUpload = useSelector((state) => state.mmbimgupload);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { PUBURL } = config;
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const imgRef = useRef();
    const [savedData, setSavedData] = useState({

        hash_url: "",
        present_address: "",
        email: "",
        group_name: "",
        mobile: "",
        photo: "",
        user_id: '',
        group_id: '',
        default_lang: "",
        user_url: "",
        biz_name: "",
        fullname: "",
        username: "",
        image_tag: "",
        status: "Approved",
        sn_name: "",
        sn_desc: "",
        sn_expiry_date: "",
        sn_start_date: "",


    });
    useEffect(() => {
        setIsLoading(true);
        dispatch(loadSeasonalProfile());
        dispatch(loadPage({
            title: "profile", button: false,
        }))
    }, []);

    const validate = (values) => {
        let errors = {};
        if (!values.mobile) {
            errors.mobile = t("err_mobile_no");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile)) {
            errors.mobile = t("err_mobile_invalid");
        }
        if (!values.user_url) {
            errors.user_url = t("err_web");
        } else if (values.user_url.length > 30) {
            errors.user_url = t("err_30_legnth");
        }

        return errors;
    };

    useEffect(() => {
        const data = user?.profile;
        if (data) {
            setSavedData({
                main_lang: localStorage?.i18nextLng || "en",
                group_name: getValueByLang(data.group_name || "{}"),
                sn_desc: getValueByLang(data.sn_desc || "{}"),
                sn_name: getValueByLang(data.sn_name || "{}"),
                group_id: data.group_id || "0",
                present_address: data?.present_address || "",
                biz_name: data?.biz_name || "",
                sn_start_date: data?.sn_start_date || "",
                default_lang: data?.default_lang || "",
                user_url: data?.user_url || "",
                email: data?.email || "",
                hash_url: data?.hash_url || "",
                mobile: data?.mobile || "",
                photo: data?.photo || "",
                sn_expiry_date: data?.sn_expiry_date || "",
                user_id: data?.user_id || "",
                fullname: data?.fullname || "",
                username: data?.username || "",
                image_tag: data?.image_tag || "",
            });
        }
    }, [user?.profile]);

    const SubmitForm = (values) => {
        var datad = {};
        var group_name = {};
        datad.update_user_id = user?.profile?.user_id || 0;
        group_name[values.main_lang] = values.group_name;
        datad.group_name = JSON.stringify(group_name);
        datad.username = values.username || "";
        datad.default_lang = values.default_lang || "en",
        datad.user_url = values.user_url || "";
        datad.fullname = values.fullname || "";
        datad.email = values.email || "";
        datad.mobile = values.mobile || "";
        datad.present_address = values.present_address || "";
        datad.biz_name = values.biz_name || "",
        datad.photo = values.photo || "";
        datad.logo = values.logo || "";
        datad.image_tag = values.image_tag || "";
        dispatch(updateSeasonal(datad));
    };

    const UploadPhoto = (tagname) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", tagname);
        data.append("image_type", "profile");
        data.append('type', 'save_photo');
        dispatch(uploadIMGUsers(data));
    };

    useEffect(() => {
        user.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [user.loading]);



    useEffect(() => {
        if (user.updateLoading == "pending") {
            setIsLoading(true)
        } else if (user.updateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadSeasonalProfile());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [user.updateLoading]);

    useEffect(() => {
        if (mmImgUpload.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmImgUpload.imgUploading == "succeeded") {
            setIsLoading(false);
            dispatch(loadSeasonalProfile());
            setTimeout(() => { dispatch(initImgLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmImgUpload.imgUploading]);

    return (<>
        {(user.updateLoading == "idle" || user.updateLoading == "pending") ? <></> : (
            user.updateLoading == "succeeded" ? (
                <Toast msg={user.msg} color="success" />
            ) : (
                <Toast color="error" msg={user.msg} />
            )
        )}
        {(mmImgUpload.imgUploading == "idle" || mmImgUpload.imgUploading == "pending") ? <></> : (
            mmImgUpload.imgUploading == "succeeded" ? (
                <Toast msg={mmImgUpload.msg} color="success" />
            ) : (
                <Toast color="error" msg={mmImgUpload.msg} />
            )
        )}

        <Flex row="row">
            <Flex padding="0 !important" md={12} sm={12} xs={12}>
                <CardBody>
                    <Formik
                        initialValues={savedData}
                        validate={validate}
                        enableReinitialize
                        onSubmit={SubmitForm}>
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
                                        <InfoCard>

                                            <Flex row="row">
                                                <Flex md={4} padding="0 5px 0 0!important">
                                                    <Label>{t("biz_name")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="biz_name"
                                                        placeholder={t("ph_bizname")}
                                                        value={values.biz_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                    <Label>{t("fullname")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="fullname"
                                                        placeholder={t("ph_fullname")}
                                                        value={values.fullname || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <Label>{t("present_address")} </Label>
                                                    <TextArea
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        height="70px"
                                                        mxheight="70px"
                                                        name="present_address"
                                                        placeholder={t("ph_preaddress")}
                                                        value={values.present_address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />





                                                </Flex>
                                                <Flex md={4} padding="0 0 0 5px !important">
                                                    <Label>{t("user_id")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="username"
                                                        placeholder={t("ph_username")}
                                                        value={values.username || ""}
                                                        disabled
                                                    />
                                                    <Label>{t("mobile_no")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="mobile"
                                                        placeholder={t("ph_mobile_no")}
                                                        value={values.mobile || ""}
                                                        disabled
                                                    />
                                                    {
                                                        errors.mobile && touched.mobile ? <ErrLabel>{errors.mobile}</ErrLabel> : null
                                                    }

                                                    <Label>{t("email")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="email"
                                                        placeholder={t("ph_email")}
                                                        value={values.email || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                                    }


                                                    <Label>
                                                        {t("web_add")}{" "}
                                                    </Label>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        backgroundColor: '#fff',
                                                        width: '100%',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <span style={{
                                                            padding: '8px',
                                                            backgroundColor: '#eee',
                                                            whiteSpace: 'nowrap',
                                                            fontFamily: 'monospace',
                                                            color: '#333',
                                                            borderRight: '1px solid #ccc'
                                                        }}>
                                                            {PUBURL}
                                                        </span>
                                                        <Input
                                                            type="text"
                                                            name="user_url"
                                                            placeholder={t("ph_web_address")}
                                                            value={values.user_url || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            style={{
                                                                flex: 1,
                                                                padding: '0 0 8px 10px',
                                                                border: 'none',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                    </div>


                                                </Flex>
                                                <Flex md={4} padding="0!important"></Flex>
                                                <Flex md={8} padding="0 !important">
                                                    <Center>
                                                        <PrimaryButton
                                                            type='submit'
                                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                            disabled={!(dirty && isValid) || disabled}
                                                        >
                                                            {t("update")}
                                                        </PrimaryButton>

                                                    </Center>
                                                </Flex>

                                            </Flex>
                                        </InfoCard>
                                        <SizeBox />
                                        <InfoCard>
                                            <Flex row="row">
                                                <Flex md={6} padding="0 10px 0 0!important">
                                                    <Flex row="row">
                                                        <Flex md={4} padding="0 !important">
                                                            <Label color="font">{t("photo_mem")}</Label>
                                                            <Input
                                                                app="true"
                                                                type="file"
                                                                name="file"
                                                                ref={imgRef}
                                                                accept="image/jpg, image/png, image/gif, image/jpeg"
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
                                                                                setSelectedFiles(e.target.files[0])
                                                                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                                                setFieldValue('file', fileName)
                                                                            }
                                                                        } else {
                                                                            setPhotoUrl('');
                                                                            setFieldValue('file', "invalid");
                                                                        }

                                                                    } else {
                                                                    }
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.file && touched.file ? <ErrLabel>{errors.file}</ErrLabel> : null
                                                            }

                                                        </Flex>
                                                        <Flex md={2} padding="30px 0 0 0  !important">
                                                            <CardHeaderButton top="10px">
                                                                <PrimaryButton
                                                                    type="button"
                                                                    onClick={() => (UploadPhoto("photo"))}>
                                                                    {t("upload")}

                                                                </PrimaryButton>
                                                            </CardHeaderButton>

                                                        </Flex>
                                                        <Flex md={4} padding="0 0 0 10px !important">
                                                            <ShadowCard>
                                                                <Center>
                                                                    <KDImg height={"120px"} src={user?.profile?.photo || ""} />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>

                                                    </Flex>
                                                    <SizeBox />

                                                </Flex>
                                                <Flex md={6} padding=" 0!important">
                                                    <Flex row="row">
                                                        <Flex md={4} padding="0  !important">
                                                            <Label color="font">{t("logo_biz")}</Label>
                                                            <Input
                                                                app="true"
                                                                type="file"
                                                                name="file"
                                                                ref={imgRef}
                                                                accept="image/jpg, image/png, image/gif, image/jpeg"
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
                                                                                setSelectedFiles(e.target.files[0])
                                                                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                                                setFieldValue('file', fileName)
                                                                            }
                                                                        } else {
                                                                            setPhotoUrl('');
                                                                            setFieldValue('file', "invalid");
                                                                        }

                                                                    } else {
                                                                    }
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.file && touched.file ? <ErrLabel>{errors.file}</ErrLabel> : null
                                                            }

                                                        </Flex>
                                                        <Flex md={2} padding="30px 0 0 0  !important">
                                                            <CardHeaderButton top="10px">
                                                                <PrimaryButton
                                                                    type="button"
                                                                    onClick={() => (UploadPhoto("logo"))}>
                                                                    {t("upload")}

                                                                </PrimaryButton>
                                                            </CardHeaderButton>

                                                        </Flex>
                                                        <Flex md={4} padding="0 0 0 10px !important">
                                                            <ShadowCard>
                                                                <Center>
                                                                    <KDImg height={"120px"} src={user?.profile?.logo || ""} />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>

                                            </Flex>
                                        </InfoCard>


                                    </form>

                                </div>
                            );
                        }}
                    </Formik>

                </CardBody>
            </Flex>
        </Flex>

        <Loading open={isLoading} />
    </>

    )
}