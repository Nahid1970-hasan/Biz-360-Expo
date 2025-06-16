import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { Typography } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { Formik } from "formik";
import { ErrLabel, Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { PhoneInput } from "react-international-phone";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { Toast } from "../component/Toast";
import { getValueByLang } from "../utils/helper";
import { checkUserPreInfo, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import styled from "styled-components";
import { KDImg } from "../component/style/styled_img";
import next from "../assets/small-icon/next-icon-biz360expo.png";
import back from "../assets/small-icon/back-icon-biz360expo.png";
import reset from "../assets/small-icon/reset-icon-biz360expo.png";
import { TermsConditionModal } from "./TermsConditionModal";
import { TextArea } from "../component/style/styled_textarea";


const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const CustSpan = styled.span`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : "0")};
`;

export const MembershipStep4Page = ({ set_url_active = () => { }, set_url_pos = () => { } }) => {

    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [isAgree, setIsAgree] = useState(false);
    const [reqData, setReqData] = useState("");
    const [seasonal_traders, set_seasonal_traders] = useState("No");
    const [email_as_username, set_email_as_username] = useState(false);
    const [mobile_as_username, set_mobile_as_username] = useState(false);
    const [email_check_enable, set_email_check_enable] = useState(false);
    const [mobile_check_enable, set_mobile_check_enable] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const formRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);



    const initialValues = {
        fullname: '',
        username: '',
        email: '',
        mobile_no: '',
        password: '',
        con_password: ''
    };

    const validate = (values) => {

        let errors = {};
        if (!values.fullname) {
            errors.fullname = t("Full Name is required");
        }
        if (!values.username) {
            errors.username = t("User ID is required");
        } else if (!/^[a-z0-9]+$/i.test(values.username)) {
            errors.username = t("User ID is required");
        }
        if (values.email) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = t("Email Id is required");
            }
        }

        if (!values.mobile_no) {
            errors.mobile_no = t("Mobile number is required");
        } else if (!/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
            errors.mobile_no = t("Mobile number is not valid");
        }

        if (!values.password) {
            errors.password = t("Password is required");
        } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
        ) {
            errors.password = t("Minimum eight characters, at least one letter, one number & one special character");
        }
        if (!values.con_password) {
            errors.con_password = t("Confirm password doesn’t match");
        } else if (values.con_password) {
            if (values.con_password != values.password) {
                errors.con_password = t("Confirm password doesn’t match");
            }
        }
        return errors;
    };
    const submitForm = (values) => {
        var userInfod = Object.assign({
            ...userInfo,
            "username": values.username,
            "fullname": values.fullname,
            "password": values.con_password,
            "email": values.email,
            "mobile": values.mobile_no.replace("+88", ""),
            "seasonal_trader": userInfo?.is_seasonal || "No"
        });
        dispatch(updateUserInfo({ "tabpos": 3, "info": userInfod }));
        dispatch(checkUserPreInfo({ "username": values.username, "mobile": values.mobile_no, "email": values.email }));
    };
    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) },
        [regDataPub.userInfo])

    useEffect(() => {
        if (regDataPub.preloading == "succeeded") {
            setIsAgree(true);
            dispatch(updateUserInfo({ "tabpos": 4, "info": userInfo }));
        }
    }, [regDataPub.preloading]);

    return (<div style={{ userSelect: "none" }}>
        {(regDataPub.preloading == "idle" || regDataPub.preloading == "pending") ? <></> : (
            regDataPub.preloading != "succeeded" && (
                <Toast color="error" msg={regDataPub.msg} />
            ))}
        <Flex row="row" justifycenter="true">

            {/* <Flex md={12} xs={12} padding="0 !important">
                <InfoCard>
                    <Typography fntsize="dsTextFontSize" fntweight="bold"> {t("promember_info")}</Typography>
                </InfoCard>
            </Flex> */}


            <Flex md={12} sm={12} padding="0!important">
                <InfoCard >
                    {/* <Typography fntsize="bodyTitleFontSize" margin="0" fntweight="bold" >  {userInfo?.member_type == "BIZ" ? t("commercial") : t("individual")}{" "} {userInfo?.is_seasonal == "Yes" ? ("(" + (t("seasonal_trad")) + ")") : " "}</Typography>
                    <Typography fntweight="bold" >
                        {t("selected_group_name")}{" "}{":"}{" "}{getValueByLang(userInfo?.group_name || "{}") || ""}
                    </Typography> */}
                    <Flex row="row">
                        <Flex md={12} padding="0 10px !important">
                            <ShadowCard>
                                <Typography txtalign="left" fntsize="cardSubTitleFontSize" fntweight="bold">
                                    {t("promember_info")}
                                </Typography>
                            </ShadowCard>

                        </Flex>
                        {/* <ShadowCard top="10px">
                            <Flex row="row">
                                <Flex md={6} padding="0 !important"></Flex>
                                <Flex md={2}></Flex>
                                <Flex md={4} padding="0 !important">
                                    <Typography txtalign="left" margin="0!important">
                                        {t("mandatory_note1")}<span style={{ color: "red", marginLeft: "4px" }}>*</span>{t("mandatory_note2")}
                                        {i18n.language === 'bn' && (
                                            <Typography txtalign="left" margin="10px 0 0 0">
                                                {t("bangla_note")}
                                            </Typography>
                                        )}
                                    </Typography> </Flex>
                            </Flex>

                        </ShadowCard> */}

                    </Flex>
                    <SizeBox />
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
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
                                <form onSubmit={handleSubmit}>
                                    <Flex row="row">
                                        <Flex md={4} xs={12} padding="0 10px 0 0 !important">
                                            <ShadowCard>
                                                <Label fntsize="bodyContentFontSize" margin="0 0 10px 0">{t("member_type")}</Label>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    name="member_type"
                                                    maxLength={100}
                                                    placeholder={t("member_type")}
                                                    value={userInfo?.member_type == "BIZ" ? t("commercial") : t("individual")}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />

                                                <Label margin="10px  0" fntsize="bodyContentFontSize">{t("trader_type")} </Label>
                                                <Input
                                                    app="true"
                                                    type="text"
                                                    name="is_seasonal"
                                                    maxLength={100}
                                                    placeholder={t("is_seasonal")}
                                                    value={userInfo?.is_seasonal == "Yes" ? (t("seasonal_occ")) : (t("regular"))}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />
                                                <Label fntsize="bodyContentFontSize" margin="10px  0">{t("field_mem")} </Label>
                                                <TextArea
                                                    style={{
                                                        lineHeight: '25px',
                                                        resize: 'none',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'pre-wrap',
                                                        padding: '6px 12px',
                                                        boxSizing: 'border-box'
                                                    }}
                                                    width="100%"
                                                    height="60px"
                                                    mxheight="95px"
                                                    app="true"
                                                    type="text"
                                                    name="group_codename"
                                                    maxLength={120}
                                                    placeholder={t("ph_field_mem")}
                                                    value={getValueByLang(userInfo?.group_data?.group_codename || "{}") || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled
                                                />

                                            </ShadowCard>

                                        </Flex>
                                        <Flex md={8} xs={12} padding="0 0 10px 0 !important">
                                            <ShadowCard>
                                                <Flex row="row">
                                                    <Flex md={12} padding="0 !important">
                                                        <Typography txtalign="left" margin="0!important">
                                                            {i18n.language === 'en' && (
                                                                <Typography txtalign="left" >
                                                                    {t("mandatory_note1")}<span style={{ color: "red", marginLeft: "4px" }}>*</span>{t("mandatory_note2")}

                                                                </Typography>
                                                            )}

                                                        </Typography> </Flex>
                                                    <Flex md={12} padding="0 !important">
                                                        <Typography txtalign="left" margin="0!important">
                                                            {i18n.language === 'bn' && (
                                                                <Typography txtalign="left" >
                                                                    {t("mandatory_note1")}<span style={{ color: "red", marginLeft: "4px" }}>*</span>{t("mandatory_note2")}   <span style={{ color: "red", marginLeft: "4px" }}>{t("bangla_note")}</span>
                                                                </Typography>
                                                            )}
                                                        </Typography> </Flex>
                                                </Flex>

                                                <Flex row="row">
                                                    <Flex md={5} padding="10px 5px 0 0!important">
                                                        {i18n.language === 'en' ? <Label fntsize="bodyContentFontSize" >{t("Full Name")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> : <Label fntsize="labelFont" fnfamily="var(--dashboard-font)">{t("Full Name")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>}
                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            name="fullname"
                                                            maxLength={100}
                                                            placeholder={t("enter full name")}
                                                            value={values.fullname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            color={errors.fullname && touched.fullname ? "error" : null}
                                                        />
                                                        {
                                                            errors.fullname && touched.fullname ? <ErrLabel>{errors.fullname}</ErrLabel> : null
                                                        }

                                                        {i18n.language === 'en' ? <Label fntsize="bodyContentFontSize" margin="10px 0 10px 0!important">{t("Mobile No.")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> : <Label fntsize="labelFont" fnfamily="var(--dashboard-font)">{t("Mobile No.")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>}

                                                        {/* <Label fntsize="bodyContentFontSize" margin="10px 0 10px 0!important">{t("Mobile No.")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> */}



                                                        <PhoneInput
                                                            defaultCountry="bd"
                                                            name="mobile_no"
                                                            placeholder={t("enter mobile number")}
                                                            value={values.mobile_no}
                                                            onChange={(d) => {
                                                                set_mobile_check_enable(d.length > 13),
                                                                    setFieldValue("mobile_no", d)
                                                            }}
                                                            onBlur={(d) => formik.handleBlur(d)}
                                                            style={{ borderRadius: "0.3rem" }}
                                                        />
                                                        {
                                                            errors.mobile_no && touched.mobile_no ? <ErrLabel>{errors.mobile_no}</ErrLabel> : null
                                                        }


                                                        {i18n.language === 'en' ? <Label margin="10px 0 10px 0!important" fntsize="bodyContentFontSize">{t("Email ID")} </Label> : <Label fntsize="labelFont" fnfamily="var(--dashboard-font)">{t("Email ID")} </Label>}

                                                        {/* <Label margin="10px 0 10px 0!important" fntsize="bodyContentFontSize">{t("Email ID")}</Label> */}
                                                        <Input
                                                            app="true"
                                                            type="email"
                                                            name="email"
                                                            placeholder={t("enter email Id")}
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            color={errors.email && touched.email ? "error" : null}
                                                        />
                                                        {
                                                            errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                                        }
                                                    </Flex>
                                                    <Flex md={7} padding="0 0 0 5px!important">
                                                        <Flex row="row">
                                                            <Flex md={3} padding="0 !important">
                                                                {i18n.language === 'en' ? <Label fntsize="bodyContentFontSize" margin="15px 0 5px 0!important">{t("User ID")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> : <Label fntsize="labelFont" margin="12px 0 10px 0!important" fnfamily="var(--dashboard-font)">{t("User ID")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>}

                                                                {/* <Label fntsize="bodyContentFontSize" margin="12px 0 10px 0!important">{t("User ID")}<span style={{ color: "red",   marginLeft: "4px"}}>*</span></Label> */}
                                                            </Flex>
                                                            <Flex md={9} padding="0 !important">
                                                                <InlineDiv padding="5px 0 0 0" justifycontent="start" style={{ alignItems: "center", gap: "10px 0 0 0" }}>
                                                                    {i18n.language === 'en' ? <Label
                                                                        htmlFor="mobile_as_username"
                                                                        color="font"
                                                                        fntsize="bodyContentFontSize"
                                                                        margin="10px 0 0 0 !important"
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        {t("Mobile No. as User ID")}
                                                                    </Label> : <Label
                                                                        htmlFor="mobile_as_username"
                                                                        color="font"
                                                                        fntsize="labelFont"
                                                                        margin="10px 0 5px 0 !important"
                                                                        fnfamily="var(--dashboard-font)"
                                                                        style={{ cursor: "pointer" }}
                                                                    >
                                                                        {t("Mobile No. as User ID")}
                                                                    </Label>}
                                                                    <Input
                                                                        type="checkbox"
                                                                        display="inline-block"
                                                                        name="mobile_as_username"
                                                                        disabled={!mobile_check_enable ? "disabled" : ""}
                                                                        id="mobile_as_username"
                                                                        checked={mobile_as_username}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                setFieldValue('username', values.mobile_no.replace("+88", ""));
                                                                                set_mobile_as_username(true);
                                                                                set_email_as_username(false);
                                                                            } else {
                                                                                setFieldValue('username', "");
                                                                                set_mobile_as_username(false);
                                                                            }
                                                                            formik.handleChange(e);
                                                                        }}
                                                                    />

                                                                </InlineDiv></Flex>
                                                        </Flex>

                                                        <Input
                                                            app="true"
                                                            type="text"
                                                            name="username"
                                                            maxLength={100}
                                                            placeholder={t("enter user ID")}
                                                            value={values.username}
                                                            onChange={(e) => {
                                                                setFieldValue("username", e.target.value?.toLowerCase())
                                                            }}
                                                            onBlur={handleBlur}
                                                            color={errors.username && touched.username ? "error" : null}
                                                            disabled={mobile_as_username}
                                                        />
                                                        {
                                                            errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                                                        }
                                                        {i18n.language === 'en' ? <Label fntsize="bodyContentFontSize" margin="10px 0 10px 0!important">{t("Password")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> : <Label fntsize="labelFont" fnfamily="var(--dashboard-font)">{t("Password")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>}

                                                        {/* <Label fntsize="bodyContentFontSize" margin="10px 0 10px 0!important">{t("Password")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> */}
                                                        <div style={{ position: 'relative' }}>
                                                            <Input
                                                                app="true"
                                                                type={showPassword ? "text" : "password"}
                                                                name="password"
                                                                placeholder={t("enter password")}
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ paddingRight: '40px' }}
                                                            />
                                                            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                                                                {showPassword ? (
                                                                    <i className="material-icons md-13">visibility_off</i>
                                                                ) : (
                                                                    <i className="material-icons md-13">visibility</i>
                                                                )}
                                                            </EyeIcon >
                                                        </div>
                                                        {
                                                            errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                                                        }


                                                        {i18n.language === 'en' ? <Label fntsize="bodyContentFontSize" margin="11px 0 10px 0!important">{t("Confirm Password")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> : <Label fntsize="labelFont" fnfamily="var(--dashboard-font)">{t("Confirm Password")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>}

                                                        {/* <Label fntsize="bodyContentFontSize" margin="11px 0 10px 0!important">{t("Confirm Password")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label> */}
                                                        <div style={{ position: 'relative' }}>
                                                            <Input
                                                                app="true"
                                                                type={showConPassword ? "text" : "password"}
                                                                name="con_password"
                                                                placeholder={t("enter confirm password")}
                                                                value={values.con_password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                style={{ paddingRight: '40px' }}
                                                            />
                                                            <EyeIcon onClick={() => setShowConPassword(!showConPassword)}>
                                                                {showConPassword ? (
                                                                    <i className="material-icons md-13">visibility_off</i>
                                                                ) : (
                                                                    <i className="material-icons md-13">visibility</i>
                                                                )}
                                                            </EyeIcon >
                                                        </div>
                                                        {
                                                            errors.con_password && touched.con_password ? <ErrLabel>{errors.con_password}</ErrLabel> : null
                                                        }
                                                    </Flex>
                                                </Flex>
                                            </ShadowCard>



                                        </Flex>

                                        <ShadowCard top="10px">
                                            <Flex row="row">
                                                <Flex md={4} padding="0 10px!important"></Flex>
                                                <Flex md={4} sm={12} xs={12} padding="0 0 0 10px !important">
                                                    <CardHeaderButton start="true">
                                                        <PrimaryButton
                                                            type="button"
                                                            onClick={() => { dispatch(updateUserInfo({ "tabpos": 2, "info": userInfo })), set_url_active("categorypanel") }}
                                                        >
                                                            <KDImg
                                                                src={back}
                                                                height={"auto"}
                                                                width={"auto"}
                                                                noborder="true"
                                                            />
                                                            {t("prev")}

                                                        </PrimaryButton>
                                                        <PrimaryButton fntcolor="bg" color="error" onClick={resetForm} type="reset">{t("reset_alt")}
                                                            <KDImg
                                                                src={reset}
                                                                height={"auto"}
                                                                width={"auto"}
                                                                noborder="true"
                                                            />
                                                        </PrimaryButton>

                                                        <PrimaryButton
                                                            type="submit"
                                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                            disabled={!(dirty && isValid)}
                                                        >
                                                            {t("next")}
                                                            <KDImg
                                                                src={next}
                                                                height={"auto"}
                                                                width={"auto"}
                                                                noborder="true"
                                                            />

                                                        </PrimaryButton>

                                                    </CardHeaderButton>
                                                </Flex>
                                                <Flex md={4} padding="7px 10px 0 10px !important">  </Flex>
                                            </Flex>
                                        </ShadowCard>




                                    </Flex>
                                </form>
                            );
                        }}
                    </Formik>
                </InfoCard>
            </Flex>

        </Flex>
        <TermsConditionModal open={isAgree} setOpen={setIsAgree} reqdata={reqData} set_url_active={set_url_active} />

    </div>)
};
