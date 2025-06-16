import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { langs } from "../../utils/helper";
import { updateBizBussiness } from "./profile_slice";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";

export const ProfileBussModal = ({ add, open,setOpen = () => { },}) => {
    
    const user = useSelector((state) => state.bizprofile);
    const { t, i18n } = useTranslation();
    const data = user?.profile?.business;
    const [disabled, set_disabled] = useState(false);

    const dispatch = useDispatch();
    const formRef = useRef();

    const [main_data, set_main_data] = useState({
        biz_mobile: "",
        update_user_id: 0,
        biz_name: "",
        biz_email: "",
        biz_address: "",
        biz_structure: "",
        biz_size: "",
        keywords: "",
        country: ""
    })

    useEffect(() => {
        if (data) {
            set_main_data({
                update_user_id: data.update_user_id,
                biz_address: data.biz_address,
                biz_name: data.biz_name,
                biz_email: data.biz_email,
                biz_mobile: data.biz_mobile,
                biz_structure: data.biz_structure,
                biz_size: data.biz_size,
                keywords: data.keywords,
                country: data.country,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        datad.update_user_id = localStorage.user_id || 0;
        datad.biz_address = values.biz_address || "",
            datad.biz_name = values.biz_name || "",
            datad.biz_email = values.biz_email || "",
            datad.biz_mobile = values.biz_mobile || "",
            datad.biz_structure = values.biz_structure || "",
            datad.biz_size = values.biz_size || "",
            datad.keywords = values.keywords || "",
            datad.country = values.country || "",

            dispatch(updateBizBussiness(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.biz_name) {
            errors.biz_name = t("err_msg_biz_name");
        } else if (Values.biz_name.length > 20) {
            errors.biz_name = t("err_20_legnth");
        }
        if (!Values.biz_email) {
            errors.biz_email = t("err_msg_biz_email");
        } else if (Values.biz_email.length > 500) {
            errors.biz_email = t("err_500_legnth");
        }
        if (!Values.biz_mobile) {
            errors.biz_mobile = t("err_msg_biz_mobile");
        } else if (Values.biz_mobile.length > 500) {
            errors.biz_mobile = t("err_500_legnth");
        }
        if (!Values.biz_structure) {
            errors.biz_structure = t("err_msg_biz_structure");
        } else if (Values.biz_structure.length > 500) {
            errors.biz_structure = t("err_500_legnth");
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
            title={t("update_biz_profile")}
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
                                                {t("business")}
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
                                            <Label>{t("biz_email")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="biz_email"
                                                placeholder={t("biz_email")}
                                                value={values.biz_email || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            {
                                                errors.biz_email && touched.biz_email ? <ErrLabel>{errors.biz_email}</ErrLabel> : null
                                            }


                                            <Label>{t("biz_mobile")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="biz_mobile"
                                                placeholder={t("biz_mobile")}
                                                value={values.biz_mobile || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.biz_mobile && touched.biz_mobile ? <ErrLabel>{errors.biz_mobile}</ErrLabel> : null
                                            }
                                            <Label>{t("biz_address")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="biz_address"
                                                placeholder={t("biz_address")}
                                                value={values.biz_address || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.biz_address && touched.biz_address ? <ErrLabel>{errors.biz_address}</ErrLabel> : null
                                            }

                                            <Label>{t("biz_structure")}</Label>
                                            <Select
                                                app="true"
                                                name="biz_structure"
                                                width="100%"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.biz_structure || ""}
                                            >
                                                <option disabled value={0}>
                                                    {t("ph_select_val")}</option>
                                                <option value="Proprietorship">Proprietorship </option>
                                                <option value="Partnership">Partnership  </option>
                                                <option value="Limited">Limited </option>
                                            </Select>
                                            {
                                                errors.biz_structure && touched.biz_structure ? <ErrLabel>{errors.biz_structure}</ErrLabel> : null
                                            }
                                            <Label>{t("biz_size")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="biz_size"
                                                placeholder={t("biz_size")}
                                                value={values.biz_size || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.biz_size && touched.biz_size ? <ErrLabel>{errors.biz_size}</ErrLabel> : null
                                            }

                                            <Label>{t("country")}</Label>
                                            <Select
                                                app="true"
                                                name="country"
                                                width="100%"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.country || ""}
                                            >
                                                <option disabled value={0}>
                                                    {t("ph_select_val")}</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="USA">USA</option>
                                            </Select>
                                            {
                                                errors.country && touched.country ? <ErrLabel>{errors.country}</ErrLabel> : null
                                            }
                                            <Label>{t("keywords")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="keywords"
                                                placeholder={t("keywords")}
                                                value={values.keywords || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.keywords && touched.keywords ? <ErrLabel>{errors.keywords}</ErrLabel> : null
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