import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { langs } from "../../utils/helper";
import { updateBizCp2 } from "./profile_slice";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import Flatpickr from "react-flatpickr";

import { AlertButton, PrimaryButton } from "../../component/style/styled_button";

export const ProfileCp_2Modal = ({ add,
    open,
    setOpen = () => { },
}) => {
    const user = useSelector((state) => state.bizprofile);
    const [disabled, set_disabled] = useState(false);

    const { t, i18n } = useTranslation();
    const data = user?.profile?.cp2_info;
    const dispatch = useDispatch();
    const formRef = useRef();

    const [main_data, set_main_data] = useState({
        cp2_present_address: "",
        cp2_gender: "",
        cp2_birth_date: "",
        cp2_mobile: "",
        cp2_fullname: "",
        cp2_permanent_address: "",
        cp2_email: ""
    })


    useEffect(() => {
        if (data) {
            set_main_data({
                cp2_present_address: data.cp2_present_address,
                cp2_birth_date: data.cp2_birth_date,
                cp2_mobile: data.cp2_mobile,
                cp2_gender: data.cp2_gender,
                cp2_email: data.cp2_email,
                cp2_fullname: data.cp2_fullname,
                cp2_permanent_address: data.cp2_permanent_address,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        datad.update_user_id = localStorage.user_id || 0;
        datad.cp2_present_address = values.cp2_present_address || "",
        datad.cp2_email = values.cp2_email || "",
        datad.cp2_gender = values.cp2_gender || "",
        datad.cp2_fullname = values.cp2_fullname || "",
        datad.cp2_birth_date = values.cp2_birth_date || "",
        datad.cp2_mobile = values.cp2_mobile || "",
        datad.cp2_permanent_address = values.cp2_permanent_address || "",
        dispatch(updateBizCp2(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.cp2_fullname) {
            errors.cp2_fullname = t("err_msg_fullname");
        } else if (Values.cp2_fullname.length > 20) {
            errors.cp2_fullname = t("err_20_legnth");
        }
        if (!Values.cp2_present_address) {
            errors.cp2_present_address = t("err_msg_present_address");
        } else if (Values.cp2_present_address.length > 500) {
            errors.cp2_present_address = t("err_500_legnth");
        }

        if (!Values.cp2_permanent_address) {
            errors.cp2_permanent_address = t("err_msg_permanent_address");
        } else if (Values.cp2_permanent_address.length > 500) {
            errors.cp2_permanent_address = t("err_500_legnth");
        }

        if (!Values.cp2_email) {
            errors.cp2_email = t("err_email");
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Values.cp2_email)
        ) {
            errors.cp2_email = t("err_email_invalid");
        }

        if (!Values.cp2_birth_date) {
            errors.cp2_birth_date = t("err_birth_date");
        }
        if (!Values.cp2_mobile) {
            errors.cp2_mobile = t("err_contact_no");
        } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(Values.cp2_mobile)) {
            errors.cp2_mobile = t("err_contact_no_invalid");
        }

        return errors;
    };

    useEffect(() => {
        if (user.updateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [user.updateLoading]);

    return <>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("update_cp_profile")+(" "+"2")}
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
                                    <Flex md={12}>
                                        <InfoCard>
                                            <Typography fntsize="cardSubTitleFontSize"  fntweight="bold">
                                                {t("cp2_info")}
                                            </Typography>
                                            <ULine />

                                            <Label>{t("fullname")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="cp2_fullname"
                                                placeholder={t("fullname")}
                                                value={values.cp2_fullname || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.cp2_fullname && touched.cp2_fullname ? <ErrLabel>{errors.cp2_fullname}</ErrLabel> : null
                                            }
                                            <Label>{t("gender")}</Label>
                                            <Select
                                                app="true"
                                                name="cp2_gender"
                                                width="100%"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.cp2_gender || ""}
                                            >
                                                <option disabled value={0}>
                                                    {t("ph_select_val")}</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Select>
                                            <Label>{t("birth_date")} </Label>
                                            <Flatpickr
                                                readOnly
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={values.cp2_birth_date || ""}
                                                onChange={(e, str) => {
                                                    setFieldValue("cp2_birth_date", str);
                                                }}
                                                render={({ value, ...props }, ref) => {
                                                    return (
                                                        <Input
                                                            {...props}
                                                            type="text"
                                                            name="cp2_birth_date"
                                                            mnwidth="auto"
                                                            placeholder={t("birth_date")}
                                                            value={values.cp2_birth_date || ""}
                                                            ref={ref}
                                                        />
                                                    );
                                                }}
                                            />
                                            {
                                                errors.cp2_birth_date && touched.cp2_birth_date ? <ErrLabel>{errors.cp2_birth_date}</ErrLabel> : null
                                            }


                                            <Label>{t("mobile")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="cp2_mobile"
                                                placeholder={t("mobile")}
                                                value={values.cp2_mobile || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.cp2_mobile && touched.cp2_mobile ? <ErrLabel>{errors.cp2_mobile}</ErrLabel> : null
                                            }
                                             <Label>{t("email")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="cp2_email"
                                                placeholder={t("email")}
                                                value={values.cp2_email || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.cp2_email && touched.cp2_email ? <ErrLabel>{errors.cp2_email}</ErrLabel> : null
                                            }
                                            <Label>{t("present_address")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="cp2_present_address"
                                                placeholder={t("present_address")}
                                                value={values.cp2_present_address || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.cp2_present_address && touched.cp2_present_address ? <ErrLabel>{errors.cp2_present_address}</ErrLabel> : null
                                            }

                                            <Label>{t("permanent_address")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="cp2_permanent_address"
                                                placeholder={t("permanent_address")}
                                                value={values.cp2_permanent_address || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.cp2_permanent_address && touched.cp2_permanent_address ? <ErrLabel>{errors.cp2_permanent_address}</ErrLabel> : null
                                            }


                                        </InfoCard>


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