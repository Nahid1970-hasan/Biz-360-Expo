import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { langs } from "../../utils/helper";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { updateINDCpInfo } from "./ind_profile_Slice";
import Flatpickr from "react-flatpickr";


export const InvCp_info = ({ add,
    open,
    setOpen = () => { },
}) => {
    const user = useSelector((state) => state.invprofile);
    const [date, setDate] = useState("");
    const { t, i18n } = useTranslation();
    const data = user?.profile?.cp_info;
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);

    const formRef = useRef();

    const [main_data, set_main_data] = useState({
        present_address: "",
        gender: "",
        country: "",
        mobile: "",
        fullname: "",
        permanent_address: "",
        email: "",
        birth_date: ""
    })


    useEffect(() => {
        if (data) {
            set_main_data({
                update_user_id: data.update_user_id,
                fullname: data.fullname,
                birth_date: data.birth_date,
                gender: data.gender,
                present_address: data.present_address,
                country: data.country,
                permanent_address: data.permanent_address,
                mobile: data.mobile,
                email: data.email,

            });
        }
    }, [data]);

    const SubmitForm = (Values) => {
        var datad = {};
        datad.update_user_id = localStorage.user_id || 0;
        datad.present_address = Values.present_address || "",
        datad.email = Values.email || "",
        datad.gender = Values.gender || "",
        datad.fullname = Values.fullname || "",
        datad.country = Values.country || "",
        datad.mobile = Values.mobile || "",
        datad.birth_date=Values.birth_date||"",
        datad.permanent_address = Values.permanent_address || "",
        dispatch(updateINDCpInfo(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.fullname) {
            errors.fullname = t("err_msg_fullname");
        } else if (Values.fullname.length > 20) {
            errors.fullname = t("err_20_legnth");
        }
        if (!Values.present_address) {
            errors.present_address = t("err_msg_present_address");
        } else if (Values.present_address.length > 500) {
            errors.present_address = t("err_500_legnth");
        }

        if (!Values.permanent_address) {
            errors.permanent_address = t("err_msg_permanent_address");
        } else if (Values.permanent_address.length > 500) {
            errors.permanent_address = t("err_500_legnth");
        }

        // if (!Values.email) {
        //     errors.email = t("err_email");
        // } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Values.email)
        // ) {
        //     errors.email = t("err_email_invalid");
        // }

        if (!Values.country) {
            errors.country = t("err_country");
        }
        // if (!Values.mobile) {
        //     errors.mobile = t("err_mobile_no");
        // } else if (!/(^(01){1}[3456789]{1}(\d){8})$/i.test(Values.mobile)) {
        //     errors.mobile = t("err_mobile_invalid");
        // }

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
            title={t("update_cp_profile")}
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
                                                {t("cp1_info")}
                                            </Typography>
                                            <ULine />

                                            <Label>{t("fullname")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="fullname"
                                                placeholder={t("fullname")}
                                                value={values.fullname || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.fullname && touched.fullname ? <ErrLabel>{errors.fullname}</ErrLabel> : null
                                            }
                                            <Label>{t("birth_date")} </Label>
                                            <Flatpickr
                                                readOnly
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={values.birth_date || ""}
                                                onChange={(e, str) => {
                                                    setFieldValue("birth_date", str);
                                                }}
                                                render={({ value, ...props }, ref) => {
                                                    return (
                                                        <Input
                                                            {...props}
                                                            type="text"
                                                            name="birth_date"
                                                            mnwidth="auto"
                                                            placeholder={t("pick_date")}
                                                            value={values.birth_date || ""}
                                                            ref={ref}
                                                        />
                                                    );
                                                }}
                                            />

                                            {
                                                errors.birth_date && touched.birth_date ? <ErrLabel>{errors.birth_date}</ErrLabel> : null
                                            }

                                            <Label>{t("gender")}</Label>
                                            <Select
                                                app="true"
                                                name="gender"
                                                width="100%"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.gender || ""}
                                            >
                                                <option disabled value={0}>
                                                    {t("ph_select_val")}</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Select>
                                            <Label>{t("country")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="country"
                                                placeholder={t("country")}
                                                value={values.country || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.country && touched.country ? <ErrLabel>{errors.country}</ErrLabel> : null
                                            }

                                            {/* <Label>{t("mobile")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="mobile"
                                                placeholder={t("mobile")}
                                                value={values.mobile || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.mobile && touched.mobile ? <ErrLabel>{errors.mobile}</ErrLabel> : null
                                            }
                                            <Label>{t("email")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="email"
                                                placeholder={t("email")}
                                                value={values.email || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.email && touched.email ? <ErrLabel>{errors.email}</ErrLabel> : null
                                            } */}
                                            <Label>{t("present_address")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="present_address"
                                                placeholder={t("present_address")}
                                                value={values.present_address || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.present_address && touched.present_address ? <ErrLabel>{errors.present_address}</ErrLabel> : null
                                            }

                                            <Label>{t("permanent_address")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="permanent_address"
                                                placeholder={t("permanent_address")}
                                                value={values.permanent_address || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.permanent_address && touched.permanent_address ? <ErrLabel>{errors.permanent_address}</ErrLabel> : null
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