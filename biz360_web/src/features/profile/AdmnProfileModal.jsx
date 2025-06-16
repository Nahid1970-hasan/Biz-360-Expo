import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { AlertButton, DownloadButton, PrimaryButton } from "../../component/style/styled_button";
import { updateAdminUser } from "./admin_profile_slice";
import { Input } from "../../component/style/styled_input";
import { uploadIMGUsers } from "../../pages/memberTemplate/mmb_image_upload_slice";

export const AdmnProfileModal = ({ add,
    open,
    setOpen = () => { },
}) => {
    const admprofile = useSelector(state => state.admprofile);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);
    const { t, i18n } = useTranslation();
    const [disabled, set_disabled] = useState(false);
    const data = admprofile?.profile;
    const dispatch = useDispatch();
    const formRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const imgRef = useRef();

    const [main_data, set_main_data] = useState({
        user_id: 0,
        update_user_id: 0,
        default_lang: 0,
        fullname: '',
        designation: '',
        mobile: '',
        email: '',
        photo_url:'',
        status: '',
    })


    useEffect(() => {
        if (data) {
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                update_user_id: data.user_id,
                fullname: data.fullname || "",
                mobile: data.mobile || "",
                email: data.email || "",
                status: data.status,
                photo_url:data.photo_url||"",
                designation: data.designation || "",
                default_lang: data.default_lang || "",

            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var designation = {};
        designation[values.main_lang] = values.designation;
        datad.update_user_id = values.update_user_id;
        datad.designation = values.designation;
        datad.fullname = values.fullname;
        datad.mobile = values.mobile;
        datad.email = values.email;
        datad.status = values.status;
        datad.default_lang = values.default_lang;
        datad.group_image = mmbimgupload?.photoUrl || "";
        dispatch(updateAdminUser(datad));
    };

    const submitImgForm = () => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", "photo");
        data.append("image_type", "user");
        data.append('type', 'save_photo');
        dispatch(uploadIMGUsers(data));
        //s  set_disabled(true)
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.designation) {
            errors.designation = t("err_msg_designation");
        } else if (Values.designation.length > 200) {
            errors.designation = t("err_200_legnth");
        }

        return errors;
    };

    useEffect(() => {
        if (admprofile.updateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [admprofile.updateLoading]);
    useEffect(() => {
        if (mmbimgupload.imgUpimgUploading == "succeeded") {
            setTimeout(() => { }, 3000);
        }
    }, [mmbimgupload.imgUpimgUploading]);

    return <>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("update_profile")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={main_data}
                validate={validate}
                enableReinitialize
                innerRef={formRef}
                onSubmit={SubmitForm}
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

                                <Flex row="row" justifycenter="true" >

                                    <Flex md={12} padding="0 !important">
                                        <Label color="cardfont">{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="group_lang"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={add?"DEFAULT":values.status}
                                            value={values.default_lang || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                admprofile?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>

                                        <Label>{t("fullname")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="fullname"
                                            placeholder={t("fullname")}
                                            value={values.fullname || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.fullname && touched.fullname ? <ErrLabel>{errors.fullname}</ErrLabel> : null
                                        }

                                        <Label>{t("designation")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="designation"
                                            placeholder={t("designation")}
                                            value={values.designation || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.designation && touched.designation ? <ErrLabel>{errors.designation}</ErrLabel> : null
                                        }
                                        <Label>{t("email")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="email"
                                            placeholder={t("eamil")}
                                            value={values.email || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                        }
                                         <Label>{t("mobile")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="mobile"
                                            placeholder={t("mobile")}
                                            value={values.mobile || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.mobile && touched.mobile ? <ErrLabel>{errors.mobile}</ErrLabel> : null
                                        }

                                     
                                        <Flex row="row">
                                            <Flex md={12} padding="0!important">
                                                <Label>{t("photo")} </Label>
                                            </Flex>

                                            <Flex md={10} padding="0 !important">
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
                                                            if (fileName.length < 60) {
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
                                                                setPhotoUrl('');
                                                                setFieldValue('file', "filename");
                                                            }

                                                        } else {
                                                        }
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                            </Flex>
                                            <Flex md={2} padding="5px 0 0 10px!important">
                                                <DownloadButton
                                                    type="button"
                                                    margin="0!important"
                                                    padding="0!important"
                                                    onClick={() => {
                                                        submitImgForm()
                                                    }}
                                                >
                                                    {t("upload")}
                                                </DownloadButton>
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                    <Flex md={12} padding="10px 10px 0 0 !important">
                                        <CardHeaderButton>
                                            <AlertButton
                                                type="reset"
                                                onClick={resetForm}
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
                                    </Flex>
                                </Flex>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Modal>
    </>

}