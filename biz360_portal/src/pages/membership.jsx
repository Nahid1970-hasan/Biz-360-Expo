import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Formik } from "formik";
import { Input } from "../component/style/styled_input";
import { PrimaryButton } from "../component/style/styled_button";
import { Typography } from "../component/style/styled_typography";
import { useTranslation } from "react-i18next";
import { ErrLabel, HLLabel, Label } from "../component/style/styled_label";
import { Card, CardBody, CardHeaderButton, HoverCard } from "../component/style/styled_card";
import { Select } from "../component/style/styled_select";
import { SizeBox } from "../component/style/styled_sizebox";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import { initLoader, saveIndvInfo, saveOrgInfo } from "../features/pubRegistration/pub_registration_slice";
import { Loading } from "../component/Loading";
import { Toast } from "../component/Toast";
import { CenterModal } from "../component/CenterModal";
import { IconButton } from "../component/IconButton";
import { InlineDiv, InlineFlex } from "../component/style/styled_inlineflex";
import { ListTooltip, Tooltip } from "../component/Tooltip";
import bazar from "../assets/hat_bazar.jpg";
import { KDImg } from "../component/style/styled_img";
import { loadPubBizGroupData } from "../features/membership/biz_pub_group_slice";
import { getValueByLang } from "../utils/helper";
import { ToggleButton } from "../component/ToggleButton";
import { TermsConditionModal } from "./TermsConditionModal";
import { NotFound } from "./NotFound";
import { NotNetwork } from "./NoNetwork";

export const MembershipPage = () => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [reqData, setReqData] = useState("");
    const [isAgree, setIsAgree] = useState(false);
    const [group_id, set_group_id] = useState(0);
    const { t, i18n } = useTranslation();
    const [isSuccess, setIsSuccess] = useState(false);
    const [member_type, set_member_type] = useState(false);
    const [email_as_username, set_email_as_username] = useState(false);
    const [email_check_enable, set_email_check_enable] = useState(false);
    const formRef = useRef();

    const initialValues = {
        fullname: '',
        username: '',
        email: '',
        mobile_no: '',
        language: 0,
        member_type: '',
        password: '',
        con_password: ''
    };

    useEffect(() => {
        dispatch(loadPubBizGroupData())
    }, []);


    const validate = (values) => {

        let errors = {};
        if (!values.fullname) {
            errors.fullname = t("err_msg_fullname");
        }
        if (!values.username) {
            errors.username = t("err_msg_username");
        }
        if (!values.email) {
            errors.email = t("err_msg_email");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = t("err_msg_email_invalid");
        }

        if (!values.mobile_no) {
            errors.mobile_no = t("err_msg_mobile_no");
        }

        // if (!values.language) {
        //     errors.language = t("err_msg_language");
        // }

        // if (!values.member_type) {
        //     errors.member_type = t("err_msg_member_type");
        // }
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
        var data = {
            "username": values.username,
            "fullname": values.fullname,
            "password": values.con_password,
            "email": values.email,
            "mobile": values.mobile_no,
            "group_id": group_id,
        }
        setIsAgree(true);
        setReqData(data);
    };


    useEffect(() => {
        if (regDataPub.loading == "pending") {
            setIsLoading(true)
        } else if (regDataPub.loading == "succeeded") {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => { dispatch(initLoader()); formRef.current.resetForm(); }, 4000);
        } else if (regDataPub.loading != "failed" || regDataPub.loading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
        }
    }, [regDataPub.loading]);

    const memberGroupData = member_type ? bizGroupData?.indvGroupData || [] : bizGroupData?.orgGroupData || [];
    return bizGroupData.loading == "nonetwork" ? <NotNetwork /> : (
        <>
            {(regDataPub.loading == "idle" || regDataPub.loading == "pending") ? <></> : (
                regDataPub.loading != "succeeded" && <Toast color="error" msg={regDataPub.msg} />)}
            <Suspense>
                <Container>
                    {!group_id ? <Flex row="row" justifycenter="true">
                        <Flex md={8} sm={12}>
                            <Flex row="row">
                                <Flex md={12}>
                                    <Typography fntsize="bodyTitleFontSize"> {"Please choose a category to represent your business"}</Typography>
                                </Flex>
                                <Flex md={12}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <ToggleButton active={member_type} set_active={set_member_type} />
                                    </div>
                                </Flex>
                                {memberGroupData?.map((d, i) =>
                                    <Flex md={6} key={i}>
                                        <IconButton width="100%" color={"font"} height={"100%"} onClick={() => set_group_id(d.group_id)} nothover={"true"}>
                                            <ListTooltip width="100%" position={'right'} color="font" background={'bg'} title={d.main_names || []}>
                                                <HoverCard background="primary">
                                                    <InlineFlex justifycontent="start">
                                                        {d.group_image && <KDImg src={d.group_image || bazar} height={"60px"} />}
                                                        <Label>{getValueByLang(d.group_name || "{}")}</Label>
                                                    </InlineFlex>
                                                </HoverCard>
                                            </ListTooltip>
                                        </IconButton>
                                    </Flex>)}
                            </Flex>
                        </Flex>
                    </Flex> :
                        <Flex row="row">
                            <Flex md={7} sm={12}>
                                <Typography fntsize="bodyTitleFontSize"> {t("membership_img")}</Typography>
                            </Flex>
                            <Flex md={5} sm={12}>
                                <Typography fntsize="bodyTitleFontSize"> {t("membership_title")}</Typography>
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

                                                <Label>{t("fullname")}</Label>
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

                                                <Label>{t("mobile_no")}</Label>
                                                <PhoneInput
                                                    defaultCountry="bd"
                                                    name="mobile_no"
                                                    placeholder={t("ph_mobile_no")}
                                                    value={values.mobile_no}
                                                    onChange={(d) => setFieldValue("mobile_no", d)}
                                                    onBlur={(d) => formik.handleBlur(d)}
                                                />
                                                {
                                                    errors.mobile_no && touched.mobile_no ? <ErrLabel>{errors.mobile_no}</ErrLabel> : null
                                                }
                                                <InlineDiv justifycontent="start">
                                                    <Label>{t("email")}</Label>
                                                    <Label htmlFor="email_as_username" color="font">
                                                        <Input
                                                            type="checkbox"
                                                            display="inline-block"
                                                            name="email_as_username"
                                                            disabled={errors.email && touched.email ? "disabled" : ""}
                                                            id="email_as_username"
                                                            checked={email_as_username}
                                                            onChange={(e) => {
                                                                e.target.checked ?
                                                                    (
                                                                        setFieldValue('username', values.email),
                                                                        set_email_as_username(e.target.checked)
                                                                    ) : set_email_as_username(e.target.checked);

                                                                formik.handleChange(e);
                                                            }}
                                                        />
                                                        <Label margin="0 !important" color="font">{t("chck_email_username")}</Label>
                                                    </Label>
                                                </InlineDiv>

                                                <Input
                                                app="true"
                                                    type="email"
                                                    name="email"
                                                    placeholder={t("ph_email")}
                                                    value={values.email}
                                                    onChange={(e) => {
                                                        set_email_check_enable(e.target.value.length > 9)
                                                        formik.handleChange(e);
                                                    }}
                                                    onBlur={handleBlur}
                                                    color={errors.email && touched.email ? "error" : null}
                                                />
                                                {
                                                    errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                                }

                                                <Label>{t("username")}</Label>
                                                <Input
                                                app="true"
                                                    type="text"
                                                    name="username"
                                                    maxLength={100}
                                                    placeholder={t("ph_username")}
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    color={errors.username && touched.username ? "error" : null}
                                                />
                                                {
                                                    errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                                                }

                                                <Label>{t("password")}</Label>
                                                <Input
                                                app="true"
                                                    type="password"
                                                    name="password"
                                                    placeholder={t("ph_password")}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                                                }
                                                <Label>{t("con_password")}</Label>
                                                <Input
                                                app="true"
                                                    type="password"
                                                    name="con_password"
                                                    placeholder={t("ph_con_password")}
                                                    value={values.con_password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {
                                                    errors.con_password && touched.con_password ? <ErrLabel>{errors.con_password}</ErrLabel> : null
                                                }

                                                <Flex row="">
                                                    <Flex md={12}>
                                                        <CardHeaderButton start="start">
                                                            
                                                            <PrimaryButton full="true" color="error" onClick={resetForm} type="reset">{t("reset")}</PrimaryButton>
                                                            <PrimaryButton full="true" type="submit"
                                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                disabled={!(dirty && isValid)}
                                                            >
                                                                {t("next")}
                                                            </PrimaryButton>
                                                        </CardHeaderButton>
                                                    </Flex>
                                                </Flex>

                                            </form>
                                        );
                                    }}
                                </Formik>
                            </Flex>

                        </Flex>}
                </Container>
            </Suspense>
            <Loading open={(bizGroupData.loading == "pending" || regDataPub.loading == "pending")} />
            <CenterModal md={4} xs={12} open={isSuccess} setOpen={setIsSuccess} bodymsg={regDataPub.display_msg || "Successfully Saved"} />
            <TermsConditionModal open={true} setOpen={setIsAgree} reqdata={reqData} member_type={member_type} />
        </>

    );
};
