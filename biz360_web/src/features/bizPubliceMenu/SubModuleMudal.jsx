import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, DownloadButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { ULine } from "../../component/style/styled_uline";
import { saveSubModulesData, updateSubModule } from "./public_menu_Slice";
import { uploadIMGUsers } from "../../pages/memberTemplate/mmb_image_upload_slice";
import { getValueByLang } from "../../utils/helper";


export const SubModuleMudal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizpublicdata = useSelector((state) => state.bizpublicdata);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);

    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const [previewPhoto, setPreviewPhoto] = useState();
    const imgRef = useRef();
    const dispatch = useDispatch();

    const [main_data, set_main_data] = useState({
        module_id: 0,
        sub_id: 0,
        sub_name: "",
        sub_page: "",
        sub_image: "",
        sub_desc: ""
    })

    const submitImgForm = (sub_id) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", sub_id); 
        data.append("image_type", "menu");
        data.append('type', 'save_photo');
        dispatch(uploadIMGUsers(data));
        
    };


    useEffect(() => {
        if (data) {
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                module_id: data.module_id,
                sub_id: data.sub_id,
                sub_name:getValueByLang(data.sub_name || "{}"),
                sub_desc: data.sub_desc,
                sub_page: data.sub_page,
                sub_image: data.sub_image
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var sub_name = {};
        var sub_desc = {};
        datad.module_id = values.module_id || 0;
        add ? "" : datad.sub_id = values.sub_id || 0;
        sub_name[values.main_lang] = values.sub_name;
        datad.sub_name = JSON.stringify(sub_name);
        sub_desc[values.main_lang] = values.sub_desc;
        datad.sub_desc = JSON.stringify(sub_desc);
        datad.sub_image = values.sub_image || "";
        datad.sub_page = values.sub_page || "";
        console.log(datad)
        dispatch(add ? saveSubModulesData(datad) : updateSubModule(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.sub_name) {
            errors.sub_name = t("err_msg_sub_name");
        } else if (Values.sub_name.length > 20) {
            errors.sub_name = t("err_20_legnth");
        }

        if (!Values.sub_desc) {
            errors.sub_desc = t("err_msg_sub_desc");
        } else if (Values.sub_desc.length > 500) {
            errors.sub_desc = t("err_500_legnth");
        }
        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }

        return errors;
    };

    useEffect(() => {
        if (bizpublicdata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [bizpublicdata.addUpdateLoading]);

    useEffect(() => {
        if (mmbimgupload.imgUpimgUploading == "succeeded") {
            setTimeout(() => { }, 3000);
        }
    }, [mmbimgupload.imgUpimgUploading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("save_sub_modules") : t("up_sub_modules")}
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
                                    <Flex md={12} padding="0 10px 0 0 !important">

                                        <Label>{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="main_lang"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.main_lang || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                bizpublicdata?.languageList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }

                                        <Label>{t("sub_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="sub_name"
                                            placeholder={t("sub_name")}
                                            value={values.sub_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.sub_name && touched.sub_name ? <ErrLabel>{errors.sub_name}</ErrLabel> : null
                                        }

                                        <Label>{t("sub_desc")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="sub_desc"
                                            placeholder={t("sub_desc")}
                                            value={values.sub_desc || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.sub_desc && touched.sub_desc ? <ErrLabel>{errors.sub_desc}</ErrLabel> : null
                                        }
                                        {/* <Flex row="row">
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
                                                        submitImgForm(values.module_id +"-"+values.sub_id)
                                                    }}
                                                >
                                                    {t("upload")}
                                                </DownloadButton>
                                            </Flex>

                                        </Flex> */}

                                    </Flex>
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        <ULine />
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
    );
};
