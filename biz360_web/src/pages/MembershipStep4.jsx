import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { TermsConditionModal } from "./TermsConditionModal";
import { Typography } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { Formik } from "formik";
import { ErrLabel, Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { PhoneInput } from "react-international-phone";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { Toast } from "../component/Toast";
import { getValueByLang } from "../utils/helper";
import { checkUserPreInfo, updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
import { RadioLabel } from "../component/RadioButton";
import styled from "styled-components";

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
            errors.fullname = t("err_msg_fullname");
        }
        if (!values.username) {
            errors.username = t("err_msg_username");
        } else if (!/^[a-z0-9]+$/i.test(values.username)) {
            errors.username = t("err_msg_username_invalid");
        }
        if (values.email) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = t("err_msg_email_invalid");
            }
        }

        if (!values.mobile_no) {
            errors.mobile_no = t("err_msg_mobile_no");
        } else if (!/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile_no)) {
            errors.mobile_no = t("err_msg_mobile_no_invalid");
        }

        if (!values.password) {
            errors.password = t("err_msg_password");
        } else if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
        ) {
            errors.password = t("err_msg_password_invalid");
        }
        if (!values.con_password) {
            errors.con_password = t("err_msg_con_password");
        } else if (values.con_password) {
            if (values.con_password != values.password) {
                errors.con_password = t("err_msg_con_password");
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
            "seasonal_trader": seasonal_traders
        });
        dispatch(updateUserInfo({ "tabpos": 3, "info": userInfod }));
        dispatch(checkUserPreInfo({ "username": values.username, "mobile": values.mobile_no, "email": values.email }));
    };
    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo])

    useEffect(() => {
        if (regDataPub.preloading == "succeeded") {
            setIsAgree(true);
            dispatch(updateUserInfo({ "tabpos": 4, "info": userInfo }));
        }
    }, [regDataPub.preloading]);

    return (<>
        {(regDataPub.preloading == "idle" || regDataPub.preloading == "pending") ? <></> : (
            regDataPub.preloading != "succeeded" && (
                <Toast color="error" msg={regDataPub.msg} />
            ))}
        <Flex row="row" justifycenter="true">

            <Flex md={12} padding="0 !important">
                <InfoCard>
                    <Typography fntsize="dsTextFontSize" fntweight="bold"> {t("member_info")}</Typography>
                </InfoCard>
            </Flex>


            <Flex md={12} sm={12} padding="10px 0 0 0 !important">
                <InfoCard >
                    {/* <Typography fntsize="bodyTitleFontSize" margin="0" fntweight="bold" >  {userInfo?.member_type == "BIZ" ? t("commercial") : t("individual")}{" "} {userInfo?.is_seasonal == "Yes" ? ("(" + (t("seasonal_trad")) + ")") : " "}</Typography>
                    <Typography fntweight="bold" >
                        {t("selected_group_name")}{" "}{":"}{" "}{getValueByLang(userInfo?.group_name || "{}") || ""}
                    </Typography> */}
                    {i18n.language === 'bn' && (
                        <Typography txtalign="left" margin="10px 0">
                            {t("bangla_note")}
                        </Typography>
                    )}
                    <Typography txtalign="left" margin="10px  0 0 0!important">
                        {t("mandatory_note1")}<span style={{ color: "red", marginLeft: "4px" }}>*</span>{t("mandatory_note2")}
                    </Typography>
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
                                        <Flex md={3} padding="10px 15px 0 0 !important">

                                            <Label >{t("member_type")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                name="fullname"
                                                maxLength={100}
                                                placeholder={t("ph_fullname")}
                                                value={ userInfo?.member_type == "BIZ" ? t("commercial") : t("individual")}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                           
                                           <Label >{t("trader_type")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                name="fullname"
                                                maxLength={100}
                                                placeholder={t("ph_fullname")}
                                                value={ userInfo?.is_seasonal == "Yes" ? (t("seasonal")) :(t("regular"))}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                             <Label >{t("selected_group_name")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                name="fullname"
                                                maxLength={100}
                                                placeholder={t("ph_fullname")}
                                                value={ getValueByLang(userInfo?.group_name || "{}") || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                      
                                        </Flex>
                                        <Flex md={5} padding="10px 15px 0 0 !important">

                                            <Label >{t("fullname")}  <span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                name="fullname"
                                                maxLength={100}
                                                placeholder={t("ph_fullname")}
                                                value={values.fullname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                color={errors.fullname && touched.fullname ? "error" : null}
                                            />
                                            {
                                                errors.fullname && touched.fullname ? <ErrLabel>{errors.fullname}</ErrLabel> : null
                                            }

                                            <InlineDiv justifycontent="start">
                                                <Label>{t("mobile_no")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>
                                                <Label htmlFor="mobile_as_username" color="font">
                                                    <Input
                                                        type="checkbox"
                                                        display="inline-block"
                                                        name="mobile_as_username"
                                                        disabled={!mobile_check_enable ? "disabled" : ""}
                                                        id="mobile_as_username"
                                                        checked={mobile_as_username}
                                                        onChange={(e) => {
                                                            e.target.checked ?
                                                                (
                                                                    setFieldValue('username', values.mobile_no.replace("+88", "")),
                                                                    set_mobile_as_username(e.target.checked),
                                                                    set_email_as_username(!e.target.checked)
                                                                ) : set_mobile_as_username(e.target.checked);

                                                            formik.handleChange(e);
                                                        }}
                                                    />
                                                    <Label margin="0 !important" color="font">{t("use_con_num_username")}</Label>
                                                </Label>
                                            </InlineDiv>

                                            <PhoneInput
                                                defaultCountry="bd"
                                                name="mobile_no"
                                                placeholder={t("ph_mobile_no")}
                                                value={values.mobile_no}
                                                onChange={(d) => {
                                                    set_mobile_check_enable(d.length > 13),
                                                        setFieldValue("mobile_no", d)
                                                }}
                                                onBlur={(d) => formik.handleBlur(d)}
                                            />
                                            {
                                                errors.mobile_no && touched.mobile_no ? <ErrLabel>{errors.mobile_no}</ErrLabel> : null
                                            }


                                            <Label>{t("email")}</Label>
                                            <Input
                                                app="true"
                                                type="email"
                                                name="email"
                                                placeholder={t("ph_email")}
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                color={errors.email && touched.email ? "error" : null}
                                            />
                                            {
                                                errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                            }
                                        </Flex>
                                        <Flex md={4} padding="10px 0 0 10px !important">
                                            <Label>{t("username")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                name="username"
                                                maxLength={100}
                                                placeholder={t("ph_username")}
                                                value={values.username}
                                                onChange={(e) => {
                                                    setFieldValue("username", e.target.value?.toLowerCase())
                                                }}
                                                onBlur={handleBlur}
                                                color={errors.username && touched.username ? "error" : null}
                                            />
                                            {
                                                errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                                            }

                                            <Label>{t("password")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>
                                            <div style={{ position: 'relative' }}>
                                                <Input
                                                    app="true"
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder={t("ph_password")}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={{ paddingRight: '40px' }}
                                                />
                                                <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? (
                                                        <i className="material-icons md-15">visibility_off</i>
                                                    ) : (
                                                        <i className="material-icons md-15">visibility</i>
                                                    )}
                                                </EyeIcon >
                                            </div>
                                            {
                                                errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                                            }
                                            <Label>{t("con_password")}<span style={{ color: "red", marginLeft: "4px" }}>*</span></Label>
                                            <div style={{ position: 'relative' }}>
                                                <Input
                                                    app="true"
                                                    type={showConPassword ? "text" : "password"}
                                                    name="con_password"
                                                    placeholder={t("ph_con_password")}
                                                    value={values.con_password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    style={{ paddingRight: '40px' }}
                                                />
                                                <EyeIcon onClick={() => setShowConPassword(!showConPassword)}>
                                                    {showConPassword ? (
                                                        <i className="material-icons md-15">visibility_off</i>
                                                    ) : (
                                                        <i className="material-icons md-15">visibility</i>
                                                    )}
                                                </EyeIcon >
                                            </div>
                                            {
                                                errors.con_password && touched.con_password ? <ErrLabel>{errors.con_password}</ErrLabel> : null
                                            }
                                            <Flex row="true">
                                                <Flex md={12} padding="45px 0!important">
                                                    <CardHeaderButton>
                                                        <PrimaryButton
                                                            type="button"
                                                            onClick={() => { dispatch(updateUserInfo({ "tabpos": 2, "info": userInfo })), set_url_active("categorypanel") }}
                                                        >
                                                            {t("prev")}
                                                        </PrimaryButton>
                                                        <PrimaryButton color="error" onClick={resetForm} type="reset">{t("reset")}</PrimaryButton>

                                                        <PrimaryButton
                                                            type="submit"
                                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                            disabled={!(dirty && isValid)}
                                                        >
                                                            {t("next")}
                                                        </PrimaryButton>

                                                    </CardHeaderButton>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </form>
                            );
                        }}
                    </Formik>
                </InfoCard>
            </Flex>



        </Flex>
        <TermsConditionModal open={isAgree} setOpen={setIsAgree} reqdata={reqData} set_url_active={set_url_active} />

    </>)
};
