
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { Select } from "../../component/style/styled_select";
import { initLoader, saveKDRLUserData, updateKDRLUserData } from "./kdrl_user_slice";
import { Loading } from "../../component/Loading";
import { useTranslation } from "react-i18next";

export const KDRLUseModal = ({ add, open, setOpen = () => { }, data }) => {
    const [user_id, set_user_id] = useState(0);
    const kdrlUserData = useSelector((state) => state.kdrlusersdata);
    const [disabled, set_disabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState({
        user_id: "",
        email: "",
        mobile: "",
        username: "",
        fullname: "",
        language_name: "",
        designation: "",
        default_lang: "",
        status: "",
        password: ""
    });

    const [isMobileAsUsername, setMobileAsUsername] = useState(false);
    const [isEmailAsUsername, setEmailAsUsername] = useState(false);
    const [mobileCheckEnable, setMobileCheckEnable] = useState(false);
    const [emailCheckEnable, setEmailCheckEnable] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setUserData({
                main_lang: localStorage.i18nextLng || "en",
                user_id: data?.user_id,
                username: data?.username,
                fullname: data?.fullname,
                email: data?.email,
                mobile: data?.mobile,
                designation: data?.designation,
                default_lang: data?.default_lang,
                status: data?.status?.label,
                language_name: data?.language_name
            });
        }
    }, [data]);

    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = t("err_email");
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = t("err_email_invalid");
        }

        if (!values.username) {
            errors.username = t("err_username");
        } else if (values.username.length < 4) {
            errors.username = t("err_username_length");
        }
        if (!values.mobile) {
            errors.mobile = t("err_mobile_no");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(values.mobile)) {
            errors.mobile = t("err_mobile_invalid");
        }
        if (add && !values.password) {
            errors.password = t("err_password");
        }

        if (!values.fullname) {
            errors.fullname = t("err_fullname");
        }

        if (!values.designation) {
            errors.designation = t("err_designation");
        }
        if (!values.default_lang) {
            errors.default_lang = t("err_default_lang");
        }
        if (!values.status) {
            errors.status = t("err_status");
        }
        return errors;
    };

    const submitForm = (values) => {
        var datad = {};
        add ? "" : datad['update_user_id'] = values.user_id || 0;
        datad.username = values.username || "";
        datad.email = values.email || "";
        datad.mobile = values.mobile,
            datad.fullname = values.fullname,
            datad.designation = values.designation,
            datad.default_lang = values.default_lang,
            datad.status = values.status,
            datad.password = values.password,
            datad.language_name = values.language_name,
            dispatch(add ? saveKDRLUserData(datad) : updateKDRLUserData(datad));

    };


    useEffect(() => {
        if (kdrlUserData.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [kdrlUserData.addUpdateLoading]);


    return (
        <>
            <Modal
                md={6}
                sm={8}
                xs={12}
                title={add ? t("add_user") : t("update_user")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Formik
                    initialValues={userData}
                    validate={validate}
                    onSubmit={submitForm}
                    innerRef={formRef}
                    enableReinitialize
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
                            resetForm,
                        } = formik;

                        return (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Flex row="row">
                                        <Flex md={6} padding="0 10px 0 0 !important">
                                            <Label>
                                                {t("email")}
                                            </Label>
                                            <Input
                                                app="app"
                                                type="email"
                                                name="email"
                                                placeholder={t("ph_email")}
                                                value={values.email || ""}
                                                onBlur={handleBlur}
                                                color={errors.email && touched.email ? "error" : null}
                                                onChange={(e) => (
                                                    setEmailCheckEnable(e.target.value.length > 4),
                                                    formik.handleChange(e)
                                                )}
                                            />
                                            <Label
                                                style={{ display: add ? "flex" : "none" }}

                                            >
                                                <Input
                                                    app="app"
                                                    type="checkbox"
                                                    name="email_as_username"
                                                    disabled={!emailCheckEnable ? "disabled" : ""}
                                                    checked={isEmailAsUsername || false}
                                                    onChange={(e) => {
                                                        e.target.checked
                                                            ? (setFieldValue("username", values.email),
                                                                setEmailAsUsername(e.target.checked),
                                                                setMobileAsUsername(!e.target.checked))
                                                            : setEmailAsUsername(e.target.checked);
                                                    }}
                                                />
                                                <span>{t("use _email_username")}</span>
                                            </Label>
                                            {errors.email && touched.email ? (
                                                <ErrLabel>{errors.email}</ErrLabel>
                                            ) : null}

                                            <Label  >
                                                {t("mobile_no")}
                                            </Label>
                                            <Input
                                                app="app"
                                                type="text"
                                                name="mobile"
                                                placeholder={t("ph_mobile_no")}
                                                value={values.mobile || ""}
                                                onBlur={handleBlur}
                                                color={
                                                    errors.mobile && touched.mobile
                                                        ? "error"
                                                        : null
                                                }
                                                onChange={(e) => (
                                                    setMobileCheckEnable(e.target.value.length > 10),
                                                    formik.handleChange(e)
                                                )}
                                            />
                                            <Label>
                                                <Input
                                                    app="app"
                                                    type="checkbox"
                                                    disabled={!mobileCheckEnable ? "disabled" : ""}
                                                    name="contact_no_as_username"
                                                    checked={isMobileAsUsername || false}
                                                    onChange={(e) => {
                                                        e.target.checked
                                                            ? (setFieldValue("username", values.mobile),
                                                                setMobileAsUsername(e.target.checked),
                                                                setEmailAsUsername(!e.target.checked))
                                                            : setMobileAsUsername(e.target.checked);
                                                    }}
                                                />
                                                <span> {t("use_con_num_username")} </span>
                                            </Label>
                                            {errors.mobile && touched.mobile ? (
                                                <ErrLabel>{errors.mobile}</ErrLabel>
                                            ) : null}

                                            <Label>  {t("user_id")} </Label>
                                            <Input
                                                app="app"
                                                type="text"
                                                name="username"
                                                placeholder={t("ph_username")}
                                                disabled={
                                                    add
                                                        ? isMobileAsUsername || isEmailAsUsername
                                                            ? "disabled"
                                                            : ""
                                                        : "disabled"
                                                }
                                                value={
                                                    (add
                                                        ? isMobileAsUsername
                                                            ? values.mobile
                                                            : isEmailAsUsername
                                                                ? values.email
                                                                : values.username
                                                        : values.username) || ""
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                color={errors.username && touched.username ? "error" : null}
                                            />
                                            {errors.username && touched.username ? (
                                                <ErrLabel>{errors.username}</ErrLabel>
                                            ) : null}
                                            <Label
                                                style={{ display: add ? "block" : "none" }}

                                            >
                                                {t("password")}
                                            </Label>
                                            <Input
                                                app="app"
                                                display={add ? "block" : "none"}
                                                type="password"
                                                name="password"
                                                placeholder={t("ph_password")}
                                                value={(add ? values.password : "") || ""}
                                                color={errors.password && touched.password ? "error" : null}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.password && touched.password ? (
                                                <ErrLabel>{errors.password}</ErrLabel>
                                            ) : null}
                                        </Flex>
                                        <Flex md={6} padding="0 0 0 10px !important">
                                            <Label >
                                                {t("full_name")}
                                            </Label>
                                            <Input
                                                app="app"
                                                type="text"
                                                name="fullname"
                                                placeholder={t("ph_fullname")}
                                                value={values.fullname || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                color={errors.fullname && touched.fullname ? "error" : null}
                                            />
                                            {errors.fullname && touched.fullname ? (
                                                <ErrLabel>{errors.fullname}</ErrLabel>
                                            ) : null}

                                            <Label >
                                                {t("designation")}{" "}
                                            </Label>
                                            <Input
                                                app="app"
                                                type="text"
                                                name="designation"
                                                placeholder={t("designation")}
                                                value={values.designation || ""}
                                                color={errors.designation && touched.designation ? "error" : null}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.designation && touched.designation ? (
                                                <ErrLabel>{errors.designation}</ErrLabel>
                                            ) : null}

                                            <Label >
                                                {t("def_lang")}
                                            </Label>
                                            <Select
                                                app="true"
                                                width="100%"
                                                name="default_lang"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.default_lang || ""}
                                                color={errors.default_lang && touched.default_lang ? "error" : null}
                                            >
                                                <option disabled value="">
                                                    {t("ph_select_lang")}
                                                </option>
                                                <option value="en">English</option>
                                                <option value="bn">বাংলা</option>
                                            </Select>

                                            <Label >
                                                {t("status")}
                                            </Label>
                                            <Select
                                                app="true"
                                                width="100%"
                                                name="status"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status || ""}
                                            >
                                                <option disabled value="">
                                                    {t("ph_sel_type")}
                                                </option>
                                                <option value="RegRequest">RegRequest</option>
                                                <option value="Verified">Verified</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Blocked">Blocked</option>
                                                <option value="Canceled">Canceled</option>
                                            </Select>
                                            {errors.status && touched.status ? (
                                                <ErrLabel>{errors.status}</ErrLabel>
                                            ) : null}
                                        </Flex>
                                        <Flex  md={12} padding="10px 0 0 10px !important">
                                        <CardHeaderButton>
                                        <AlertButton
                                            type="reset"
                                            onClick={resetForm}
                                        >
                                            {t("reset")}
                                        </AlertButton>
                                        <PrimaryButton
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid)}
                                        >
                                            {t(add ? "submit" : "update")}
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
            <Loading open={isLoading} />
        </>
    );
};
