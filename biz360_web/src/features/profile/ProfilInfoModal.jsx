import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardBody, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { IMGTAGLIST, langs } from "../../utils/helper";
import { updateBizUser } from "./profile_slice";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { uploadIMGUsers } from "../../pages/memberTemplate/mmb_image_upload_slice";

export const ProfilInfoModal = ({ add,
    open,
    setOpen = () => { },
}) => {
    const user = useSelector((state) => state.bizprofile);
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [user_url, set_user_url] = useState('');
    const [disabled, set_disabled] = useState(false);
    const [default_lang, setDefault_lang] = useState('');
    const [photo_tag, set_photo_tag] = useState(0);
    const data = user?.profile?.user;
    const dispatch = useDispatch();
    const formRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const [previewPhoto, setPreviewPhoto] = useState();
    const imgRef = useRef();

    const [main_data, set_main_data] = useState({
        image_tag: 0,
        file:"",
    })

    const submitForm = (values) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", values.image_tag);
        data.append("image_type", "profile");
        data.append('type', 'save_photo'); 
        dispatch(uploadIMGUsers(data));
    };

    const validate = (Values) => {
        let errors = {};
        if (!Values.file) {
            errors.file = t("err_msg_image_choose");
        }
        if (!Values.image_tag) {
            errors.image_tag = t("err_msg_image_tag");
        }
        return errors;
    };
    useEffect(() => {
        if (mmImgUploadData.imgUploading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [mmImgUploadData.imgUploading]);

    return <>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("up_profile_img")}
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
                onSubmit={submitForm}
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
                                    <Flex md={12}>
                                        <CardBody>
                                            <Flex row="row" >
                                                <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                    <Label color="font">{t("image_tag")}</Label>
                                                </Flex>
                                                <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
                                                    <Select
                                                        app="true"
                                                        name="image_tag"
                                                        width="100%"
                                                        value={values.image_tag||0} 
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option disabled value={0}>
                                                            {t("ph_select_val")}
                                                        </option>
                                                        {
                                                            IMGTAGLIST?.map((d, i) => <option key={i} value={d.id}>{d.value}</option>)
                                                        }
                                                    </Select>
                                                    {
                                                        errors.image_tag && touched.image_tag ? <ErrLabel>{errors.image_tag}</ErrLabel> : null
                                                    }

                                                </Flex>
                                            </Flex>

                                            <Flex row="row">
                                                <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                                                    <Label color="font">{t("photo")}</Label>
                                                </Flex>
                                                <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
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
                                            </Flex>
                                        </CardBody>

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
                                                disabled={!(dirty && isValid)}
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