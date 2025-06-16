import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { ULine } from "../../component/style/styled_uline";
import { checkNumber, getValueByLang } from "../../utils/helper";
import { saveSubscriptionData, updateSubscriptionData } from "./biz_subscription_slice";

export const BizSubscriptionModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizsubscription = useSelector((state) => state.bizsubscription);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [group_data, set_group_data] = useState({
        sn_id: 0,
        sn_name: '',
        sn_desc: '',
        sn_type: '',
        sn_duration: '',
        sn_rate: '',
        pk_type: ''
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                main_lang: localStorage.i18nextLng || "en",
                sn_name: getValueByLang(data.sn_name || "{}"),
                sn_id: data.sn_id,
                sn_desc: getValueByLang(data.sn_desc || "{}"),
                sn_type: data.sn_type,
                sn_duration: data.sn_duration,
                sn_rate: data.sn_rate,
                pk_type: data.pk_type

            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var sn_name = {};
        var sn_desc = {};
        datad['sn_id'] = add ? 0 : (values.sn_id || 0);
        sn_name[values.main_lang] = values.sn_name;
        datad.sn_name = JSON.stringify(sn_name);
        sn_desc[values.main_lang] = values.sn_desc;
        datad.sn_desc = JSON.stringify(sn_desc);
        datad.sn_type = values.sn_type || "";
        datad.sn_duration = values.sn_duration || "";
        datad.sn_rate = values.sn_rate || "";
        datad.pk_type = values.pk_type || "";
        dispatch(add ? saveSubscriptionData(datad) : updateSubscriptionData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.sn_name) {
            errors.sn_name = t("err_msg_sn_name");
        } else if (Values.sn_name.length > 260) {
            errors.sn_name = t("err_260_legnth");
        }

        if (!Values.sn_desc) {
            errors.sn_desc = t("err_msg_desc");
        } else if (Values.sn_desc.length > 500) {
            errors.sn_desc = t("err_500_legnth");
        }

        if (!Values.sn_duration) {
            errors.sn_duration = t("err_msg_duration");
        } else if (Values.sn_duration.length > 260) {
            errors.sn_duration = t("err_260_legnth");
        }

        if (!Values.sn_type) {
            errors.sn_type = t("err_msg_sn_type");
        }
        if (!Values.pk_type) {
            errors.pk_type = t("err_msg_pk_type");
        }

        if (!Values.sn_rate) {
            errors.sn_rate = t("err_msg_price");
        } else if (Values.sn_rate.length > 260) {
            errors.sn_rate = t("err_260_legnth");
        }

        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }
        return errors;
    };

    useEffect(() => {
        if (bizsubscription.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [bizsubscription.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_subs") : t("up_subs")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={group_data}
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
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        <Label color="cardfont">{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="main_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("sn_name", getValueByLang(data?.sn_name, e.target.value))
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            // value={add?"DEFAULT":values.status}
                                            value={values.main_lang || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                bizsubscription?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }

                                        <Label>{t("pk_type")}</Label>
                                        <Select
                                            app="true"
                                            name="pk_type"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.pk_type || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Trial">Trial</option>
                                        </Select>
                                        {
                                            errors.pk_type && touched.pk_type ? <ErrLabel>{errors.pk_type}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("sn_name")}</Label>
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

                                        <Label color="cardfont">{t("sn_desc")}</Label>
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
                                        <Label>{t("sn_type")}</Label>
                                        <Select
                                            app="true"
                                            name="sn_type"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.sn_type || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}</option>
                                            <option value="BIZ">Commercial</option>
                                            <option value="IND">Individual</option>
                                            <option value="SEASONAL">Seasonal</option>
                                        </Select>
                                        {
                                            errors.sn_type && touched.sn_type ? <ErrLabel>{errors.sn_type}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("sn_duration")}{t("days")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            onKeyDown={(event) => {
                                                if (!checkNumber(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            name="sn_duration"
                                            placeholder={t("sn_duration")}
                                            value={values.sn_duration || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.sn_duration && touched.sn_duration ? <ErrLabel>{errors.sn_duration}</ErrLabel> : null
                                        }

                                        <Label color="cardfont">{t("sn_rate")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            onKeyDown={(event) => {
                                                if (!checkNumber(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            name="sn_rate"
                                            placeholder={t("sn_rate")}
                                            value={values.sn_rate || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.sn_rate && touched.sn_rate ? <ErrLabel>{errors.sn_rate}</ErrLabel> : null
                                        }
                                    </Flex>
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        <ULine />
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
    );
};
