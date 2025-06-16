import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";

import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import Flatpickr from "react-flatpickr";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { updateSeasonalSub } from "../../features/profile/seasonal_profile_slice";

export const SecurityPage = ({ add,
    open,
    setOpen = () => { },
}) => {
    const user = useSelector((state) => state.seasonalprofile);

    const { t, i18n } = useTranslation();
    const [fullname, setFullname] = useState('');
    const [designation, setDesignation] = useState('');
    const [nickname, setNickname] = useState('');
    const [default_lang, setDefault_lang] = useState('');
    const [update_user_id, setUpdate_user_id] = useState('');
    const data = user.user;
    const dispatch = useDispatch();
    const formRef = useRef();
    const [disabled, set_disabled] = useState(false);


    const [main_data, set_main_data] = useState({
        template_id: 0,
        sn_name: '',
        sn_desc: '',
        group_id: 0,
        main_lang: 0,
        published: "DEFAULT",
    })


    useEffect(() => {
        if (data) {
            // console.log(data)
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                group_id: data.group_id,
                template_id: data.template_id,
                sn_name: data.sn_name,
                sn_desc: data.sn_desc,
                published: data.published == "Published" ? "yes" : "no",
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var sn_name = {};
        var sn_desc = {};
        sn_name[values.main_lang] = values.sn_name;
        datad.sn_name = JSON.stringify(sn_name);
        sn_desc[values.main_lang] = values.sn_desc;
        datad.sn_desc = JSON.stringify(sn_desc);
        datad.sn_expiry_date = values.sn_expiry_date || "";
        dispatch(updateSeasonalSub(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.sn_name) {
            errors.sn_name = t("err_msg_sn_name");
        } else if (Values.sn_name.length > 20) {
            errors.sn_name = t("err_20_legnth");
        }
        if (!Values.sn_desc) {
            errors.sn_desc = t("err_msg_sn_desc");
        } else if (Values.sn_desc.length > 500) {
            errors.sn_desc = t("err_500_legnth");
        }
        if (!Values.sn_expiry_date) {
            errors.sn_expiry_date = t("err_msg_sn_expiry_date");
        }

        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
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
            title={t("update_subc")}
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
                                                {t("subscription")}
                                            </Typography>
                                            <ULine />

                                            <Label>{t("sn_name")} </Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="sn_name"
                                                placeholder={t("sn_name")}
                                                value={values.sn_name || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.sn_name && touched.sn_name ? <ErrLabel>{errors.sn_name}</ErrLabel> : null
                                            }
                                            <Label>{t("sn_desc")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="sn_desc"
                                                placeholder={t("sn_desc")}
                                                value={values.sn_desc || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.sn_desc && touched.sn_desc ? <ErrLabel>{errors.sn_desc}</ErrLabel> : null
                                            }

                                            <Label>{t("sn_start_date")} </Label>
                                            <Flatpickr
                                                readOnly
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                }}
                                                value={values.sn_start_date || ""}
                                                onChange={(e, str) => {
                                                    setFieldValue("sn_start_date", str);
                                                }}
                                                render={({ value, ...props }, ref) => {
                                                    return (
                                                        <Input
                                                            {...props}
                                                            type="text"
                                                            name="sn_start_date"
                                                            mnwidth="auto"
                                                            placeholder={t("pick_date")}
                                                            value={values.sn_start_date || ""}
                                                            ref={ref}
                                                        />
                                                    );
                                                }}
                                            />

                                            <Label>{t("sn_expiry_date")} </Label>
                                            <Flatpickr
                                                readOnly
                                                options={{
                                                    dateFormat: "Y-m-d",
                                                    minDate: values.sn_start_date ? new Date(values.sn_start_date).fp_incr(1) : null,
                                                }}
                                                value={values.sn_expiry_date || ""}
                                                onChange={(e, str) => {
                                                    setFieldValue("sn_expiry_date", str);
                                                }}
                                                render={({ value, ...props }, ref) => {
                                                    return (
                                                        <Input
                                                            {...props}
                                                            type="text"
                                                            name="sn_expiry_date"
                                                            mnwidth="auto"
                                                            placeholder={t("pick_date")}
                                                            value={values.sn_expiry_date || ""}
                                                            ref={ref}
                                                        />
                                                    );
                                                }}
                                            />


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