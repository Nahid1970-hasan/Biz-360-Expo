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
import { saveADRateData, updateADRateData } from "./ad_rate_setup_slice";


export const ADRateModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const adratedata = useSelector((state) => state.adratedata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [group_data, set_group_data] = useState({
        content_id: 0,
        display_id: 0,
        content_name: '',
        display_name: '',
        group_lang: '',
        rate_id:''
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                group_lang: localStorage.i18nextLng || "en",
                display_id: data.display_id,
                content_id: data.content_id,
                rate_id: data.rate_id,
                rate: data.rate,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        add ? "" : datad['rate_id'] = values.rate_id || 0;
        datad.display_id = values.display_id || '';
        datad.content_id = values.content_id || '';
        datad.rate = values.rate || '';
        dispatch(add ? saveADRateData(datad) : updateADRateData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.rate) {
            errors.rate = t("err_msg_rate");
        } else if (Values.rate.length > 260) {
            errors.rate = t("err_260_legnth");
        }
        if (!Values.content_id) {
            errors.content_id = t("err_msg_content");
        } 

        if (!Values.display_id) {
            errors.display_id = t("err_msg_display");
        } 
        if (!Values.group_lang) {
            errors.group_lang = t("err_msg_lang");
          }

        return errors;
    };

    useEffect(() => {
        if (adratedata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [adratedata.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_rate") : t("up_rate")}
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
                                            name="group_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("rate", getValueByLang(data?.rate, e.target.value))
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
                                                adratedata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.group_lang && touched.group_lang ? <ErrLabel>{errors.group_lang}</ErrLabel> : null
                                        }

                                        <Label color="cardfont">{t("content_name")} </Label>
                                        <Select
                                            app="true"
                                            name="content_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.content_id || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                adratedata?.conList?.map((d, i) => <option key={i} value={d.content_id}>{getValueByLang(d.content_name)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.content_id && touched.content_id ? <ErrLabel>{errors.content_id}</ErrLabel> : null
                                        }

                                        <Label color="cardfont">{t("display_name")} </Label>
                                        <Select
                                            app="true"
                                            name="display_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.display_id || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                adratedata?.typeList?.map((d, i) => <option key={i} value={d.display_id}>{getValueByLang(d.display_name)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.display_id && touched.display_id ? <ErrLabel>{errors.display_id}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("rate")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="rate"
                                            placeholder={t("rate")}
                                            value={values.rate || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.rate && touched.rate ? <ErrLabel>{errors.rate}</ErrLabel> : null
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
