import { useEffect, useRef, useState } from "react";
import { initLoader, loadBizprofile, updateBizUser } from "../features/profile/profile_slice";
import { initImgLoader, uploadIMGUsers } from "../pages/memberTemplate/mmb_image_upload_slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { loadPage } from "../features/page/page_slice";
import { Typography, ULine } from "../component/style/styled_typography";
import { getValueByLang, IMGTAGLIST, langs } from "../utils/helper";
import { IconButton } from "../component/IconButton";
import { ErrLabel, HLLabel, Label } from "../component/style/styled_label";
import { config } from "../config/config";
import styled from "styled-components";
import { PrimaryButton } from "../component/style/styled_button";
import { Formik } from "formik";
import { Input } from "../component/style/styled_input";
import { TextArea } from "../component/style/styled_textarea";
import Flatpickr from "react-flatpickr";
import { Select } from "../component/style/styled_select";
import { SizeBox } from "../component/style/styled_sizebox";
import { Center } from "../component/style/styled_center";
import { KDImg } from "../component/style/styled_img";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import { SeasonalProfilePage } from "./SeasonalProfile";



export const BizProfilePage = () => {
    const user = useSelector((state) => state.bizprofile);
    const mmImgUpload = useSelector((state) => state.mmbimgupload);
    const userinfo = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { PUBURL } = config;
    const [group_id, set_group_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const [previewPhoto, setPreviewPhoto] = useState();
    const imgRef = useRef();
    const [savedData, setSavedData] = useState({
        country: "",
        present_address: "",
        keywords: "",
        gender: "",
        cp2_permanent_address: "",
        birth_date: "",
        biz_name: "",
        permanent_address: "",
        sn_start_date: "",
        cp2_email: "",
        cp2_gender: "",
        biz_email: "",
        cp2_fullname: "",
        default_lang: "",
        user_url: "",
        logo: "",
        cp2_birth_date: "",
        email: "",
        sn_name: "",
        hash_url: "",
        group_name: "",
        biz_address: "",
        biz_structure: "",
        mobile: "",
        photo: "",
        biz_size: '',
        sn_expiry_date: "",
        cp2_present_address: "",
        cp2_mobile: "",
        user_id: '',
        group_id: '',
        biz_mobile: "",
        fullname: "",
        sn_desc: "",
        username: "",
        image_tag: "",
        status: "Approved"

    });
    const data = user?.profile;

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadBizprofile());
        dispatch(
            loadPage({
                title: ("profile"),
                button: false,
            })
        );
    }, []);




    const validate = (values) => {
        let errors = {};
        if (!values.biz_mobile) {
            errors.biz_mobile = t("err_mobile_no");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.biz_mobile)) {
            errors.biz_mobile = t("err_mobile_invalid");
        }
        if (!values.user_url) {
            errors.user_url = t("err_web");
        } else if (values.user_url.length > 30) {
            errors.user_url = t("err_30_legnth");
        }

        return errors;
    };

    useEffect(() => {
        if (data) {
            setSavedData({
                main_lang: localStorage.i18nextLng || "en",
                group_name: getValueByLang(data.group_name || "{}"),
                sn_desc: getValueByLang(data.sn_desc || "{}"),
                sn_name: getValueByLang(data.sn_name || "{}"),
                group_id: data.group_id,
                country: data.country,
                present_address: data.present_address,
                keywords: data.keywords,
                gender: data.gender,
                cp2_permanent_address: data.cp2_permanent_address,
                birth_date: data?.birth_date || "",
                biz_name: data.biz_name,
                permanent_address: data.permanent_address,
                sn_start_date: data.sn_start_date,
                cp2_email: data.cp2_email,
                cp2_gender: data.cp2_gender,
                biz_email: data.biz_email,
                cp2_fullname: data.cp2_fullname,
                default_lang: data.default_lang,
                user_url: data.user_url,
                logo: data.logo,
                cp2_birth_date: data?.cp2_birth_date || "",
                email: data.email,
                hash_url: data.hash_url,
                biz_address: data.biz_address,
                biz_structure: data.biz_structure,
                mobile: data.mobile,
                photo: data.photo,
                biz_size: data.biz_size,
                sn_expiry_date: data.sn_expiry_date,
                cp2_present_address: data.cp2_present_address,
                cp2_mobile: data.cp2_mobile,
                user_id: data.user_id,
                biz_mobile: data.biz_mobile,
                fullname: data.fullname,
                username: data.username,
                image_tag: data.image_tag
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var group_name = {};
        datad.update_user_id = user?.profile?.user_id || 0;
        group_name[values.main_lang] = values.group_name;
        datad.group_name = JSON.stringify(group_name);
        datad.biz_address = values.biz_address || "";
        datad.biz_mobile = values.biz_mobile || "";
        datad.biz_name = values.biz_name || "",
            datad.biz_email = values.biz_email || "";
        datad.biz_structure = values.biz_structure || "",
            datad.biz_size = values.biz_size || 0,
            datad.username = values.username || "";
        datad.keywords = values.keywords || "";
        datad.country = values.country || "",
            datad.default_lang = values.default_lang || "en",
            datad.user_url = values.user_url || "";

        datad.fullname = values.fullname || "";
        datad.email = values.email || "";
        datad.mobile = values.mobile || "";
        datad.present_address = values.present_address || "";
        datad.permanent_address = values.permanent_address || "";
        datad.gender = values.gender || "";
        datad.birth_date = values.birth_date || "";

        datad.cp2_email = values.cp2_email || "";
        datad.cp2_gender = values.cp2_gender || "";
        datad.cp2_fullname = values.cp2_fullname || "";
        datad.cp2_mobile = values.cp2_mobile || "";
        datad.cp2_birth_date = values.cp2_birth_date || "";
        datad.cp2_gender = values.cp2_gender || "";
        datad.cp2_present_address = values.cp2_present_address || "";
        datad.cp2_permanent_address = values.cp2_permanent_address || "";
        datad.photo = values.photo || "";
        datad.logo = values.logo || "";
        datad.image_tag = values.image_tag || "";
        dispatch(updateBizUser(datad));
    };
    const UploadImage = (values) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", "logo");
        data.append("image_type", "profile");
        data.append('type', 'save_photo');
        dispatch(uploadIMGUsers(data));
    };
    const UploadPhoto = (values) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", "photo");
        data.append("image_type", "profile");
        data.append('type', 'save_photo');
        console.log(data)
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
            dispatch(loadBizprofile());
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
            dispatch(loadBizprofile());
            setTimeout(() => { dispatch(initImgLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmImgUpload.imgUploading]);


    useEffect(() => {
        dispatch(loadBizprofile());
        dispatch(loadPage({
            title: "profile", button: false, buttonText: "update",
        }))
    }, []);



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
                                                    <Typography txtalign="left" fntweight="bold">
                                                        {t("bus_info")}
                                                    </Typography>
                                                    <ULine />
                                                    {/* <Label>{t("group_name")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="group_name"
                                                        placeholder={t("group_name")}
                                                        value={values.group_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.group_name && touched.group_name ? <ErrLabel>{errors.group_name}</ErrLabel> : null
                                                    }
                                                    <Label>{t("user_id")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="username"
                                                        placeholder={t("username")}
                                                        value={values.username || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                                                    } */}
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
                                                        height: '8%',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <span style={{
                                                            padding: '0 2px',
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
                                                                padding: '0 0 10px 10px',
                                                                border: 'none',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                    </div>
                                                    {/* <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="user_url"
                                                        placeholder={t("user_url")}
                                                        value={values.user_url || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}

                                                    />
                                                    {values.user_url && (
                                                        <HLLabel>
                                                            <span style={{ color: '#FFFFFF', marginTop: '5px', display: 'inline-block' }}>
                                                                {PUBURL}{values.user_url}
                                                            </span>
                                                        </HLLabel>
                                                    )}
                                                    {
                                                        errors.user_url && touched.user_url ? <ErrLabel>{errors.user_url}</ErrLabel> : null
                                                    } */}
                                                    <Label>{t("mobile_no")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="biz_mobile"
                                                        placeholder={t("ph_mobile_no")}
                                                        value={values.biz_mobile || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}

                                                    />
                                                    {
                                                        errors.biz_mobile && touched.biz_mobile ? <ErrLabel>{errors.biz_mobile}</ErrLabel> : null
                                                    }

                                                    <Label>{t("biz_email")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="biz_email"
                                                        placeholder={t("ph_email")}
                                                        value={values.biz_email || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.biz_email && touched.biz_email ? <ErrLabel>{errors.biz_email}</ErrLabel> : null
                                                    }
                                                    {/* <Label>{t("biz_structure")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="biz_structure"
                                                        placeholder={t("biz_structure")}
                                                        value={values.biz_structure || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <Label>{t("biz_size")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="biz_size"
                                                        placeholder={t("biz_size")}
                                                        value={values.biz_size || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    /> */}
                                                    <Label>{t("biz_address")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="biz_address"
                                                        placeholder={t("ph_address")}
                                                        value={values.biz_address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />


                                                    {/* <Label>{t("country")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="country"
                                                        placeholder={t("country")}
                                                        value={values.country || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    /> */}
                                                    <Label>{t("keywords")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="keywords"
                                                        placeholder={t("ph_keywords")}
                                                        value={values.keywords || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                </Flex>
                                                <Flex md={4} padding="0 5px !important">
                                                    <Typography txtalign="left" fntweight="bold">
                                                        {t("con_p_1")}
                                                    </Typography>
                                                    <ULine />
                                                    <Label>{t("cp1_fullname")} </Label>
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



                                                    <Label>{t("mobile_no")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="mobile"
                                                        placeholder={t("ph_mobile_no")}
                                                        value={values.mobile || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
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
                                                    {/* 
                                                    <Label>{t("birth_date")} </Label>
                                                    <Flatpickr
                                                        readOnly
                                                        options={{
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                        value={values.birth_date || ""}
                                                        onChange={(e, str) => {
                                                            setDate(str);
                                                        }}
                                                        render={({ value, ...props }, ref) => {
                                                            return (
                                                                <Input
                                                                    {...props}
                                                                    type="text"
                                                                    name="birth_date"
                                                                    minWidth="auto"
                                                                    placeholder={t("pick_date")}
                                                                    value={values.birth_date || ""}
                                                                    ref={ref}
                                                                />
                                                            );
                                                        }}
                                                    /> */}
                                                    <Label>{t("present_address")} </Label>
                                                    <TextArea
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        height="110px"
                                                        mxheight="110px"
                                                        name="present_address"
                                                        placeholder={t("ph_preaddress")}
                                                        value={values.present_address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* <Label>{t("permanent_address")} </Label>
                                                    <TextArea
                                                        app="true"
                                                        type="text"
                                                         mxheight="90px"
                                                        width="100%"
                                                        name="permanent_address"
                                                        placeholder={t("ph_address")}
                                                        value={values.permanent_address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    /> */}
                                                    <CardHeaderButton top="32px" >
                                                        <PrimaryButton
                                                            type='submit'
                                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                            disabled={!(dirty && isValid) || disabled}
                                                        >
                                                            {t("update")}
                                                        </PrimaryButton>
                                                    </CardHeaderButton>
                                                </Flex>

                                                <Flex md={4} padding="0 0 0 5px !important">
                                                    <Typography txtalign="left" fntweight="bold">
                                                        {t("con_p_2")}
                                                    </Typography>
                                                    <ULine />
                                                    <Label>{t("cp2_fullname")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="cp2_fullname"
                                                        placeholder={t("ph_fullname")}
                                                        value={values.cp2_fullname || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.cp2_fullname && touched.cp2_fullname ? <ErrLabel>{errors.cp2_fullname}</ErrLabel> : null
                                                    }

                                                    {/* <Label>{t("gender")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="cp2_gender"
                                                        placeholder={t("gender")}
                                                        value={values.cp2_gender || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.cp2_gender && touched.cp2_gender ? <ErrLabel>{errors.cp2_gender}</ErrLabel> : null
                                                    } */}

                                                    <Label>{t("mobile_no")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="cp2_mobile"
                                                        placeholder={t("ph_mobile_no")}
                                                        value={values.cp2_mobile || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />



                                                    <Label>{t("email_id")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="cp2_email"
                                                        placeholder={t("ph_email")}
                                                        value={values.cp2_email || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {/* <Label>{t("cp2_birth_date")} </Label>
                                                    <Flatpickr
                                                        readOnly
                                                        options={{
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                        value={values.cp2_birth_date || ""}
                                                        onChange={(e, str) => {
                                                            setDate(str);
                                                        }}
                                                        render={({ value, ...props }, ref) => {
                                                            return (
                                                                <Input
                                                                    {...props}
                                                                    type="text"
                                                                    name="cp2_birth_date"
                                                                    minWidth="auto"
                                                                    placeholder={t("pick_date")}
                                                                    value={values.cp2_birth_date || ""}
                                                                    ref={ref}
                                                                />
                                                            );
                                                        }}
                                                    /> */}



                                                    <Label>{t("present_address")} </Label>
                                                    <TextArea
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        height="110px"
                                                        mxheight="110px"
                                                        name="cp2_present_address"
                                                        placeholder={t("ph_preaddress")}
                                                        value={values.cp2_present_address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.cp2_present_address && touched.cp2_present_address ? <ErrLabel>{errors.cp2_present_address}</ErrLabel> : null
                                                    }
                                                    {/* <Label>{t("permanent_address")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="cp2_permanent_address"
                                                        placeholder={t("ph_address")}
                                                        value={values.cp2_permanent_address || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.cp2_permanent_address && touched.cp2_permanent_address ? <ErrLabel>{errors.cp2_permanent_address}</ErrLabel> : null
                                                    } */}

                                                    {/* <Label>{t("sn_name")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="sn_name"
                                                        placeholder={t("sn_name")}
                                                        value={values.sn_name || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />



                                                    <Label>{t("sn_start_date")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="sn_start_date"
                                                        placeholder={t("sn_start_date")}
                                                        value={values.sn_start_date || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />



                                                    <Label>{t("sn_desc")} </Label>
                                                    <TextArea
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        height="75px"
                                                        mxheight="75px"
                                                        name="sn_desc"
                                                        placeholder={t("sn_desc")}
                                                        value={values.sn_desc || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                    <Label>{t("sn_expiry_date")} </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        width="100%"
                                                        name="sn_expiry_date"
                                                        placeholder={t("sn_expiry_date")}
                                                        value={values.sn_expiry_date || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.sn_expiry_date && touched.sn_expiry_date ? <ErrLabel>{errors.sn_expiry_date}</ErrLabel> : null
                                                    } */}


                                                </Flex>
                                            </Flex>
                                        </InfoCard>

                                        <SizeBox />

                                        <Flex row="row">
                                            <Flex md={6} padding="0 0 0 0!important">
                                                <InfoCard>
                                                    <Flex row="row">
                                                        <Flex md={5.5} sm={12} xs={12} padding="0 !important">
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
                                                        <Flex md={2.5} sm={12} xs={12} padding="30px 0 0 0  !important">
                                                            <CardHeaderButton top="10px">
                                                                <PrimaryButton
                                                                    type="button"
                                                                    onClick={() => (UploadPhoto())}>
                                                                    {t("upload")}

                                                                </PrimaryButton>
                                                            </CardHeaderButton>

                                                        </Flex>
                                                        <Flex md={4} sm={12} xs={12} padding="0 0 0 10px !important">
                                                            <ShadowCard>
                                                                <Center>
                                                                    <KDImg height={"120px"} src={user?.profile?.photo || ""} />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>

                                                    </Flex>
                                                </InfoCard>
                                            </Flex>
                                            <Flex md={6} padding="0 0 0 10px !important">
                                                <InfoCard>
                                                    <Flex row="row">
                                                        <Flex md={5.5} sm={12} xs={12} padding="0  !important">
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
                                                        <Flex md={2.5} sm={12} xs={12} padding="30px 0 0 0  !important">
                                                            <CardHeaderButton top="10px">
                                                                <PrimaryButton
                                                                    type="button"
                                                                    onClick={() => (UploadImage())}>
                                                                    {t("upload")}

                                                                </PrimaryButton>
                                                            </CardHeaderButton>

                                                        </Flex>
                                                        <Flex md={4} sm={12} xs={12} padding="0 0 0 10px !important">
                                                            <ShadowCard>
                                                                <Center>
                                                                    <KDImg height={"120px"} src={user?.profile?.logo || ""} />
                                                                </Center>
                                                            </ShadowCard>
                                                        </Flex>
                                                    </Flex>
                                                </InfoCard>
                                            </Flex>

                                        </Flex>


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