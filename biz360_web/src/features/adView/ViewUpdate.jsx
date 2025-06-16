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
import { updateAdviewSetup } from "./ad_view_slice";


export const ViewUpdate = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const adviewdata = useSelector((state) => state.adviewdata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [group_data, set_group_data] = useState({
        content_id: 0,
        display_id: 0,
        dimension_id: 0,
        content_name: '',
        display_name: '',
        dimension_name: '',
        act_amount: '',
        est_amount: '',
        status: '',
        time_value: ''
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                group_lang: localStorage.i18nextLng || "en",
                display_id: data.display_id,
                content_id: data.content_id,
                dimension_id: data.dimension_id,
                act_amount: data.act_amount,
                status: data?.status?.label,
                est_amount: data.est_amount,
                time_value: data.time_value,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        add ? "" : datad['ad_id'] = values.ad_id || 0;
        datad.display_id = values.display_id || '';
        datad.content_id = values.content_id || '';
        datad.dimension_id = values.dimension_id || '';
        datad.act_amount = values.act_amount || '';
        datad.status = values.status || '';
        datad.est_amount = values.est_amount || '';
        datad.time_value = values.time_value || '';
        dispatch(updateAdviewSetup(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.rate) {
            errors.rate = t("err_msg_rate");
        } else if (Values.rate.length > 260) {
            errors.rate = t("err_260_legnth");
        }


        return errors;
    };

    useEffect(() => {
        if (adviewdata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [adviewdata.addUpdateLoading]);

    return (<>
        <Modal
            md={6}
            sm={8}
            xs={12}
            title={t("up_add_view")}
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
                                    <Flex md={6} padding="0 5px !important">
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
                                                adviewdata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
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
                                                adviewdata?.list?.map((d, i) => <option key={i} value={d.content_id}>{getValueByLang(d.content_name)}</option>)
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
                                                adviewdata?.list?.map((d, i) => <option key={i} value={d.display_id}>{getValueByLang(d.display_name)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.display_id && touched.display_id ? <ErrLabel>{errors.display_id}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("dimension_name")} </Label>
                                        <Select
                                            app="true"
                                            name="dimension_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.dimension_id || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                adviewdata?.list?.map((d, i) => <option key={i} value={d.dimension_id}>{getValueByLang(d.dimension_name)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.dimension_id && touched.dimension_id ? <ErrLabel>{errors.dimension_id}</ErrLabel> : null
                                        }


                                    </Flex>
                                    <Flex md={6} padding="0 5px !important">
                                        <Label color="cardfont">{t("duration")}</Label>
                                        <Input
                                            app="app"
                                            type="text"
                                            width="100%"
                                            name="time_value"
                                            placeholder={t("time_value")}
                                            value={values.time_value || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.time_value && touched.time_value ? <ErrLabel>{errors.time_value}</ErrLabel> : null
                                        }

                                        <Label color="cardfont">{t("est_amount")}</Label>
                                        <Input
                                            app="app"
                                            type="text"
                                            width="100%"
                                            name="est_amount"
                                            placeholder={t("est_amount")}
                                            value={values.est_amount || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.est_amount && touched.est_amount ? <ErrLabel>{errors.est_amount}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("act_amount")}</Label>
                                        <Input
                                            app="app"
                                            type="text"
                                            width="100%"
                                            name="act_amount"
                                            placeholder={t("act_amount")}
                                            value={values.act_amount || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.act_amount && touched.act_amount ? <ErrLabel>{errors.act_amount}</ErrLabel> : null
                                        }

                                        <Label >
                                            {t("status")}
                                        </Label>
                                        <Select
                                            app="app"
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
                                            <option value="Pending">Pending</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Blocked">Blocked</option>
                                            <option value="Canceled">Canceled</option>
                                        </Select>
                                        {errors.status && touched.status ? (
                                            <ErrLabel>{errors.status}</ErrLabel>
                                        ) : null}


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
