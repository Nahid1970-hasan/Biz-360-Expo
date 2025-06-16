
import { useDispatch, useSelector } from "react-redux";
import { loadCompanyInfoData, saveCompanyInfoData, initLoader } from "../../features/bizCompanyInfo/biz_company_info_slice";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { loadPage } from "../../features/page/page_slice";
import { CardBody, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Flex } from "../../component/style/styled_flex";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { Formik } from "formik";
import UnAuthorized from "../UnAuthorized";
import { Loading } from "../../component/Loading";
import styled from "styled-components";
import { PrimaryButton } from "../../component/style/styled_button";
import { Toast } from "../../component/Toast";
import { initImgLoader, uploadIMGUsers } from "../memberTemplate/mmb_image_upload_slice";
import { Typography } from "../../component/style/styled_typography";
import { Link } from "react-router-dom";
import { CircleKDImg, KDImg } from "../../component/style/styled_img";
import { TextArea } from "../../component/style/styled_textarea";

const CircleLogoWrapper = styled.div`
  width: 100px;  // Adjust size as needed
  height: 100px; // Must match width for perfect circle
  border-radius: 50%;
  overflow: hidden;
  padding:"0 20px";
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.colors.primary}; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;



export const CompanyInfoPage = () => {
    const bizcompanyinfo = useSelector((state) => state.bizcompanyinfo);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [comp_id, set_comp_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const [previewPhoto, setPreviewPhoto] = useState();
    const imgRef = useRef();
    const [savedData, setSavedData] = useState({
        comp_id: 0,
        company_name: '',
        short_name: '',
        address: '',
        mobile: '',
        email: '',
        web: '',
        com_logo: '',
        slogan: '',

    });
    const data = bizcompanyinfo?.compInfo;

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadCompanyInfoData());
        dispatch(
            loadPage({
                title: ("comp_info"),
                button: false,
            })
        );
    }, []);




    const validate = (values) => {
        let errors = {};

        if (!values.company_name) {
            errors.company_name = t("err_company_name");
        } else if (values.company_name.length > 260) {
            errors.company_name = t("err_260_legnth");
        }
        if (!values.short_name) {
            errors.short_name = t("err_short_name");
        } else if (values.short_name.length > 260) {
            errors.short_name = t("err_260_legnth");
        }
        if (!values.address) {
            errors.address = t("err_address");
        } else if (values.address.length > 500) {
            errors.address = t("err_500_legnth");
        }

        if (!values.mobile) {
            errors.mobile = t("err_mobile_no");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile)) {
            errors.mobile = t("err_mobile_invalid");
        }
        if (!values.email) {
            errors.email = t("err_email");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = t("err_email_invalid");
        }
        if (!values.web) {
            errors.web = t("err_web");
        } else if (values.web.length > 160) {
            errors.web = t("err_160_legnth");
        }
        return errors;
    };

    useEffect(() => {
        if (data) {
            setSavedData({
                main_lang: localStorage.i18nextLng || "en",
                company_name: data.company_name,
                comp_id: data.comp_id,
                address: data.address,
                short_name: data.short_name,
                mobile: data.mobile,
                com_logo: data.com_logo,
                email: data.email,
                web: data.web,
                slogan: data.slogan,
                image_tag: data.image_tag
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        datad.comp_id = bizcompanyinfo?.compInfo?.comp_id || 0;
        datad.company_name = values.company_name || "";
        datad.address = values.address || "";
        datad.short_name = values.short_name || "";
        datad.mobile = values.mobile || "";
        datad.email = values.email || "";
        datad.web = values.web || "";
        datad.slogan = values.slogan || "";
        datad.com_logo = values.com_logo || "";
        datad.image_tag = values.image_tag || "";
        dispatch(saveCompanyInfoData(datad));
    };
    const UploadImage = (values) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", " ");
        data.append("image_type", "com_logo");
        data.append('type', 'save_photo');
        console.log(data)
        dispatch(uploadIMGUsers(data));
    };

    useEffect(() => {
        bizcompanyinfo.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizcompanyinfo.loading]);



    useEffect(() => {
        if (bizcompanyinfo.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (bizcompanyinfo.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadCompanyInfoData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [bizcompanyinfo.addUpdateLoading]);
    useEffect(() => {
        if (mmbimgupload.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmbimgupload.imgUploading == "succeeded") {
            setIsLoading(false);
            dispatch(loadCompanyInfoData());
            setTimeout(() => { dispatch(initImgLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmbimgupload.imgUploading]);

    return bizcompanyinfo.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(bizcompanyinfo.addUpdateLoading == "idle" || bizcompanyinfo.addUpdateLoading == "pending") ? <></> : (
                bizcompanyinfo.addUpdateLoading == "succeeded" ? (
                    <Toast msg={bizcompanyinfo.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={bizcompanyinfo.msg} />
                )
            )}
            {(mmbimgupload.imgUploading == "idle" || mmbimgupload.imgUploading == "pending") ? <></> : (
                    mmbimgupload.imgUploading == "succeeded" ? (
                        <Toast msg={mmbimgupload.msg} color="success" />
                    ) : (
                        <Toast color="error" msg={mmbimgupload.msg} />
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
                                            <Flex row="row">

                                                <Flex md={4} padding="0 10px 0 0 !important">
                                                    <InfoCard >
                                                        <Flex row="row">
                                                            <Flex md={4}></Flex>
                                                            <Flex md={4} padding="20px 0!important">
                                                                <CircleLogoWrapper >
                                                                    <KDImg noborder="true" src={bizcompanyinfo?.compInfo?.logo_url} alt="LOGO" />
                                                                </CircleLogoWrapper>
                                                            </Flex>
                                                            <Flex md={4}></Flex>

                                                        </Flex>


                                                        <Typography margin="10px 0 0 0" fntsize="cardTitleFontSize" fntweight="bold">
                                                            {bizcompanyinfo?.compInfo?.company_name || " "}
                                                        </Typography>
                                                        <Typography margin="10px 0" fntsize="cardSubTitleFontSize" fntweight="bold">
                                                            {bizcompanyinfo?.compInfo?.slogan || " "}
                                                        </Typography>
                                                        <Typography margin="10px 0 0 0" fntsize="cardSubTitleFontSize" txtalign="left" >
                                                            {t("mobile")}{" "}{":"}{" "}   {bizcompanyinfo?.compInfo?.mobile || " "}
                                                        </Typography>
                                                        <Typography margin="5px 0 0 0" fntsize="cardSubTitleFontSize" txtalign="left">
                                                            {t("email")}{" "}{":"}{" "}     {bizcompanyinfo?.compInfo?.email || " "}
                                                        </Typography>
                                                        <Typography margin="5px 0 0 0" fntsize="cardSubTitleFontSize" txtalign="left">
                                                            {t("address")}{" "}{":"}{" "}     {bizcompanyinfo?.compInfo?.address || " "}
                                                        </Typography>
                                                          <Typography margin="5px 0 20px 0" fntsize="cardSubTitleFontSize" txtalign="left">
                                                            {t("web")}{" "}{":"}{" "}  <Link>{bizcompanyinfo?.compInfo?.web || " "}</Link>   
                                                        </Typography>


                                                    </InfoCard>

                                                </Flex>
                                                <Flex md={8} padding="0 !important">
                                                    <InfoCard>
                                                        <Flex row="row">
                                                            <Flex md={6} padding="0 5px 0 0!important">
                                                                <Label>{t("company_name")} </Label>
                                                                <Input
                                                                    app="true"
                                                                    type="text"
                                                                    width="100%"
                                                                    name="company_name"
                                                                    placeholder={t("company_name")}
                                                                    value={values.company_name || ""}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {
                                                                    errors.company_name && touched.company_name ? <ErrLabel>{errors.company_name}</ErrLabel> : null
                                                                }
                                                                <Label>{t("short_name")} </Label>
                                                                <Input
                                                                    app="true"
                                                                    type="text"
                                                                    width="100%"
                                                                    name="short_name"
                                                                    placeholder={t("short_name")}
                                                                    value={values.short_name || ""}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                {
                                                                    errors.short_name && touched.short_name ? <ErrLabel>{errors.short_name}</ErrLabel> : null
                                                                }
                                                                 <Label>{t("slogan")} </Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="slogan"
                                                            placeholder={t("slogan")}
                                                            value={values.slogan || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                               
                                                            </Flex>
                                                            <Flex md={6} padding="0 0 0 5px !important">
                                                            <Label>{t("mobile")} </Label>
                                                                <Input
                                                                    app="true"
                                                                    type="text"
                                                                    width="100%"
                                                                    name="mobile"
                                                                    placeholder={t("ph_mobile_no")}
                                                                    value={values.mobile || ""}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
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
                                                        <Label>{t("web")} </Label>
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="web"
                                                            placeholder={t("web")}
                                                            value={values.web || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.web && touched.web ? <ErrLabel>{errors.web}</ErrLabel> : null
                                                        }
                                                       
                                                            </Flex>
                                                            <Flex md={12} padding="0 10px !important">
                                                            <Label>{t("address")} </Label>
                                                        <TextArea
                                                            app="true"
                                                            type="text"
                                                            width="100%"
                                                            name="address"
                                                            placeholder={t("ph_address")}
                                                            value={values.address || ""}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                        {
                                                            errors.address && touched.address ? <ErrLabel>{errors.address}</ErrLabel> : null
                                                        }


                                                      


                                                        <Label color="font">{t("logo")}</Label>
                                                        <Flex row="row">
                                                            <Flex md={10} padding="0 !important">
                                                                <Input
                                                                    app="true"
                                                                    type="file"
                                                                    name="com_logo"
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
                                                            </Flex>
                                                            <Flex md={2} padding="5px 0 0 0 !important">
                                                                <CardHeaderButton>
                                                                    <PrimaryButton onClick={() => (UploadImage())}>
                                                                        {t("upload")}

                                                                    </PrimaryButton>
                                                                </CardHeaderButton>

                                                            </Flex>
                                                        </Flex>
                                                            </Flex>
                                                        </Flex>


                                                     
                                                        <CardHeaderButton top="10px">
                                                            <PrimaryButton
                                                                type='submit'
                                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                disabled={!(dirty && isValid) || disabled}
                                                            >
                                                                {t("up_com_info")}
                                                            </PrimaryButton>
                                                        </CardHeaderButton>
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
    );
};
