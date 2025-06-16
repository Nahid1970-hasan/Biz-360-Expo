import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClicker } from "../utils/helper";
import { loadPage } from "../features/page/page_slice";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import { Link, useNavigate } from "react-router-dom";
import { CenterBox } from "../component/style/styled_center_box";
import { PrimaryButton } from "../component/style/styled_button";
import { GL, Typography } from "../component/style/styled_typography";
import { Formik } from "formik";
import { ErrLabel, Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { Flex } from "../component/style/styled_flex";
import { CheckboxLabel } from "../component/Checkbox";
import { Menu } from "../component/Menu";
import ImageCaptcha from "../component/ImgCaptcha";
import { Card } from "../component/style/styled_card";
import { getLogin, initLoader } from "../features/user/user_slice";
import { KDImg } from "../component/style/styled_img";
import img from "../assets/logo.jpg";
import logimg from "../assets/banner-icon/icon-biz360expo.png";
import { Center } from "../component/style/styled_center";
import { InlineFlex } from "../component/style/styled_inlineflex";
import styled from "styled-components";
import log_in from "../assets/small-icon/login-icon_biz360expo.png";

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
const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;
export const CustSpan = styled.span`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : "10px 0")};
`;

export const LoginPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const wraperRef = useRef(null);
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [validCaptcha, setValidCaptcha] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { t, i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    useOutsideClicker(wraperRef, () => { setOpen(false) });

    useEffect(() => {
        i18n.changeLanguage(localStorage.i18nextLng ?? "en");
        if (user.login) {
            dispatch(loadPage({ title: "dashboard" }));
            nevigate("/app");
        }
    }, [user]);

    useEffect(() => {
        user.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [user.loading]);


    const initialValues = {
        username: '',
        password: ''
    };

    const validate = (values) => {
        let errors = {};
        if (!values.username) {
            errors.username = t("err_msg_userid");
        }
        if (!values.password) {
            errors.password = t("err_msg_password");
        } else if ((values.password.length < 5)) {
            errors.password = t("err_msg_password_length");
        }

        return errors;
    };

    const submitForm = (values) => {
        dispatch(getLogin(values));

    };

    useEffect(() => {
        if (user.loading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); }, 5000);
        } else if (user.loading == "failed" || user.loading == "unauthorized") {
            formRef.current.setFieldValue("password", "")
            setTimeout(() => { dispatch(initLoader()); }, 5000);
        }
    }, [user.loading]);

    return (
        <>
            {(user.loading == "idle" || user.loading == "pending") ? <></> : (
                user.loading != "succeeded" && (
                    <Toast color="error" msg={user.msg} />
                )
            )}
            <Suspense>
                <CenterBox>
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={submitForm}
                        innerRef={formRef}
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
                                setFieldValue,
                                resetForm
                            } = formik;
                            return (
                                <section>
                                    <Flex row="row">
                                        <Flex md="12" padding="0 !important" sm={12} xs={12}>
                                            <Center><Link to="/"><KDImg src={logimg} height={"100px"} width={"110px"} noborder="none" /></Link></Center>
                                        </Flex>
                                        <Flex md="12" padding="0 !important" sm={12} xs={12}>
                                            <Typography fntsize="dsFontSize" fntweight="bold" >{t("biz_360")}</Typography>
                                            <Typography fntsize="cardTitleFontSize" fntweight="bold" >
                                                <GL>{t("biz_header")}</GL> </Typography>
                                            <Typography fntsize="cardTitleFontSize" fntweight="bold" >{t("login")}</Typography>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md="2"></Flex>
                                            <Flex md="8" padding="0!important" xs={10}>
                                                <form onSubmit={handleSubmit}>
                                                    <Label color="font" htmlFor="username">{t('user_id')}</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder={t('ph_username')}
                                                        name="username"
                                                        value={values.username}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.username && touched.username ? "error" : null}
                                                    />
                                                    {
                                                        errors.username && touched.username ? <ErrLabel>{errors.username}</ErrLabel> : null
                                                    }
                                                    <Label color="font" htmlFor="password">{t('password')}</Label>
                                                    <PasswordContainer>
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            name="password"
                                                            placeholder={t('ph_password')}
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            color={errors.password && touched.password ? "error" : null}
                                                        />
                                                        <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? (
                                                                <i className="material-icons md-13">visibility_off</i>
                                                            ) : (
                                                                <i className="material-icons md-13">visibility</i>
                                                            )}
                                                        </EyeIcon>
                                                    </PasswordContainer>
                                                    {
                                                        errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                                                    }
                                                    <InlineFlex>
                                                        {/* <div>
                                                            <Input app="true" type="checkbox" value="login" id="rememverMe" name="login" />
                                                            <Label margin="10px 0 10px 0" color="font" htmlFor="rememverMe">{t('remember_me')}</Label>
                                                        </div> */}

                                                        <div>
                                                            <CheckboxLabel padding="5px 7px" disabled={validCaptcha} checked={validCaptcha} onClick={() => {
                                                                !validCaptcha && setOpen(!open);
                                                            }} label={t("iam_human")} labelcolor="font" size={"md"} />

                                                            <div ref={wraperRef}>
                                                                <Menu open={open} left={(buttonRef?.current?.offsetLeft - 40) + "px"} top={(buttonRef?.current?.offsetTop - 200) + "px"}>
                                                                    <Card>
                                                                        <ImageCaptcha setOpen={(setOpen)} setValidCaptcha={setValidCaptcha} />
                                                                    </Card>
                                                                </Menu>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {/* <Typography fntsize="bodyContentFontSize" txtalign="left"><Link to="/reset">{t("forget_password")}</Link></Typography> */}
                                                        </div>
                                                    </InlineFlex>
                                                    <Flex row="row">

                                                        <Flex md={12} padding="0!important">
                                                            <Center>
                                                                <PrimaryButton

                                                                    height="46px"
                                                                    ref={buttonRef}
                                                                    type="submit"
                                                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                    disabled={!(dirty && isValid) || !validCaptcha}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: '8px'
                                                                    }}
                                                                >
                                                                    {t("login")}
                                                                    <KDImg
                                                                        src={log_in}
                                                                        height={"auto"}
                                                                        width={"auto"}
                                                                        noborder="true"
                                                                    />
                                                                    {/* <span
                                                                    className="material-icons"
                                                                    style={{
                                                                        fontSize: '20px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    login
                                                                </span> */}
                                                                </PrimaryButton>
                                                            </Center>

                                                        </Flex>

                                                    </Flex>



                                                </form>
                                            </Flex>

                                        </Flex>
                                    </Flex>
                                </section>
                            );
                        }}
                    </Formik>
                </CenterBox>
            </Suspense>

            <Loading open={isLoading} />
        </>

    );
};
