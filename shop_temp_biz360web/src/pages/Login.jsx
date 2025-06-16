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
import { Typography } from "../component/style/styled_typography";
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
import { Center } from "../component/style/styled_center";
import { InlineFlex } from "../component/style/styled_inlineflex";

export const LoginPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const wraperRef = useRef(null);
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [validCaptcha, setValidCaptcha] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const { t, i18n } = useTranslation();

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
            errors.username = t("err_msg_username");
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
                                    <Flex row="">
                                        <Flex md="12">
                                            <Center><Link to="/"><KDImg src={img} height={"80px"} noborder="none" /></Link></Center>
                                        </Flex>
                                        <Flex md="12">
                                            <Typography fntsize="cardTitleFontSize" fntweight="bold" >{t("login")}</Typography>
                                        </Flex>
                                        <Flex md="12">
                                            <form onSubmit={handleSubmit}>
                                                <Label color="font" htmlFor="username">{t('username')}</Label>
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
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    placeholder={t('ph_password')}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    color={errors.password && touched.password ? "error" : null}
                                                />
                                                {
                                                    errors.password && touched.password ? <ErrLabel>{errors.password}</ErrLabel> : null
                                                }
                                                <InlineFlex>
                                                    <div>
                                                        <Input app="true" type="checkbox" value="login" id="rememverMe" name="login" />
                                                        <Label margin="10px 0 10px 0" color="font" htmlFor="rememverMe">{t('remember_me')}</Label>
                                                    </div>
                                                    <div>
                                                        <Typography fntsize="bodyContentFontSize" txtalign="left"><Link to="/reset">{t("forget_password")}</Link></Typography>
                                                    </div>
                                                </InlineFlex>
                                                <CheckboxLabel disabled={validCaptcha} checked={validCaptcha} onClick={() => {
                                                    !validCaptcha && setOpen(!open);
                                                }} label={t("iam_human")} labelcolor="font" size={"md"} />

                                                <div ref={wraperRef}>
                                                    <Menu open={open} left={(buttonRef?.current?.offsetLeft + 30) + "px"} top={(buttonRef?.current?.offsetTop - 200) + "px"}>
                                                        <Card>
                                                            <ImageCaptcha setOpen={(setOpen)} setValidCaptcha={setValidCaptcha} />
                                                        </Card>
                                                    </Menu>
                                                </div>
                                                <PrimaryButton
                                                    full="true"
                                                    ref={buttonRef}
                                                    type="submit"
                                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                    disabled={!(dirty && isValid) || !validCaptcha}
                                                >
                                                    {t("login")}
                                                </PrimaryButton>
                                            </form>
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
