import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import Flatpickr from "react-flatpickr";
import { updateSeasonalInfo } from "../../features/profile/seasonal_profile_slice";


export const SubCPInfopage = ({ add,
    open,
    setOpen = () => { },
}) => {
    const user = useSelector((state) => state.seasonalprofile);
    const [date, setDate] = useState("");
    const { t, i18n } = useTranslation(); 
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);

    const formRef = useRef();

    const [main_data, set_main_data] = useState({
        present_address: "",
        mobile: "",
        fullname: "",
        email: "",
        biz_name: ""
    })


    useEffect(() => {
        if (user?.profile) {
            set_main_data({ 
                fullname: user?.profile?.cp_info?.fullname,
                present_address: user?.profile?.cp_info?.present_address,
                mobile: user?.profile?.cp_info?.mobile,
                email: user?.profile?.cp_info?.email,
                biz_name: user?.profile?.user?.biz_name, 
            });
        }
    }, [user?.profile]);

    const SubmitForm = (Values) => {
            var datad = {};
            datad.update_user_id = localStorage.user_id || 0;
            datad.present_address = Values.present_address || "",
            datad.email = Values.email || "",
            datad.fullname = Values.fullname || "",
            datad.mobile = Values.mobile || "",
            datad.biz_name = Values.biz_name || "",
            datad.country = Values.country || "",
            dispatch(updateSeasonalInfo(datad));
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
        // if (!Values.email) {
        //     errors.email = t("err_email");
        // } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Values.email)
        // ) {
        //     errors.email = t("err_email_invalid");
        // }


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
                                            <Typography fntsize="cardSubTitleFontSize" fntweight="bold">
                                                {t("cp1_info")}
                                            </Typography>
                                            <ULine />
                                            <Label>{t("biz_name")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="biz_name"
                                                placeholder={t("biz_name")}
                                                value={values.biz_name || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.biz_name && touched.biz_name ? <ErrLabel>{errors.biz_name}</ErrLabel> : null
                                            }

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

                                            <Label>{t("mobile")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="mobile"
                                                placeholder={t("mobile")}
                                                value={values.mobile || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
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
                                            }
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

                                            {/* <Label>{t("country")}</Label>
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
                                            } */}

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
                                        </InfoCard>


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