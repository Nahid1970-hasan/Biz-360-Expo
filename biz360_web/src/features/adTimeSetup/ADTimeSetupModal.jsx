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
import { getValueByLang } from "../../utils/helper";
import { saveTimeSetup, updateTimeSetup } from "./ad_time_setup_slice";


export const ADTimeSetupModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const adtimedata = useSelector((state) => state.adtimedata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [group_data, set_group_data] = useState({
        time_id: 0,
        time_name: '',
        price_weight: 0,
        value_start: 0,
        value_end: 0,
        group_lang: '',
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                time_name: getValueByLang(data.time_name || "{}"),
                group_lang: localStorage.i18nextLng || "en",
                time_id: data.time_id,
                price_weight: data.price_weight,
                value_start: data.value_start,
                value_end: data.value_end
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var time_name = {};
        add ? "" : datad['time_id'] = values.time_id || 0;
        time_name[values.group_lang] = values.time_name;
        datad.time_name = JSON.stringify(time_name);
        datad.price_weight = values.price_weight || 0,
            datad.value_start = values.value_start || 0,
            datad.value_end = values.value_end || 0,
            dispatch(add ? saveTimeSetup(datad) : updateTimeSetup(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.time_name) {
            errors.time_name = t("err_msg_time");
        } else if (Values.time_name.length > 260) {
            errors.time_name = t("err_260_legnth");
        }
        if (!Values.price_weight) {
            errors.price_weight = t("err_msg_price");
        } else if (Values.price_weight.length > 260) {
            errors.price_weight = t("err_260_legnth");
        }

        if (!Values.value_start) {
            errors.value_start = t("err_msg_value_start");
        } else if (Values.value_start.length > 260) {
            errors.value_start = t("err_260_legnth");
        }
        if (!Values.value_end) {
            errors.value_end = t("err_msg_value_end");
        } else if (Values.value_end.length > 260) {
            errors.value_end = t("err_260_legnth");
        }
        if (!Values.group_lang) {
            errors.group_lang = t("err_msg_lang");
          }


        return errors;
    };

    useEffect(() => {
        if (adtimedata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [adtimedata.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_time") : t("up_time")}
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

                                <Flex row="row" >
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        <Label color="cardfont">{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="group_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("content_name", getValueByLang(data?.content_name, e.target.value))
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            // value={add?"DEFAULT":values.status}
                                            value={values.group_lang || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                adtimedata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.group_lang && touched.group_lang ? <ErrLabel>{errors.group_lang}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("time_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            value_start="100%"
                                            name="time_name"
                                            placeholder={t("time_name")}
                                            value={values.time_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.time_name && touched.time_name ? <ErrLabel>{errors.time_name}</ErrLabel> : null
                                        }

                                        <Label >{t("price_weight")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            value_start="100%"
                                            name="price_weight"
                                            placeholder={t("price_weight")}
                                            value={values.price_weight || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.price_weight && touched.price_weight ? <ErrLabel>{errors.price_weight}</ErrLabel> : null
                                        }

                                        <Label >{t("value_start")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            value_start="100%"
                                            name="value_start"
                                            placeholder={t("value_start")}
                                            value={values.value_start || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.value_start && touched.value_start ? <ErrLabel>{errors.value_start}</ErrLabel> : null
                                        }
                                        <Label >{t("value_end")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            value_start="100%"
                                            name="value_end"
                                            placeholder={t("value_end")}
                                            value={values.value_end || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.value_end && touched.value_end ? <ErrLabel>{errors.value_end}</ErrLabel> : null
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
