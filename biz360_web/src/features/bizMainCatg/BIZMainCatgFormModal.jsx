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
import { saveBIZMainData, updateBIZMainData } from "./biz_main_category_slice";
import { Typography } from "../../component/style/styled_typography";

export const BIZMainCatgFormModalPage = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizMainCatgFrmData = useSelector((state) => state.bizmaincatgdata);
    const bizMainGroupData = useSelector((state) => state.bizgroupdata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [main_data, set_main_data] = useState({
        main_id: 0,
        main_name: '',
        group_id: 0,
        main_lang: 0,
       
    })


    useEffect(() => {
        if (data) {
            set_main_data({
                main_name: getValueByLang(data.main_name || "{}"),
                main_lang: localStorage.i18nextLng || "en",
                group_id: data.group_id,
                main_id: data.main_id
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var main_name = {};
        add ? "" : datad['main_id'] = values.main_id || 0;
        main_name[values.main_lang] = values.main_name;
        datad.main_name = JSON.stringify(main_name);
        datad.group_id = values.group_id || 0;
        dispatch(add ? saveBIZMainData(datad) : updateBIZMainData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.main_name) {
            errors.main_name = t("err_msg_main_catg_name");
        } else if (Values.main_name.length > 260) {
            errors.main_name = t("err_260_legnth");
        }

        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }
        if (!Values.group_id) {
            errors.group_id = t("err_msg_detail");
        }
        if (!Values.main_name) {
            errors.main_name = t("err_msg_sub_field_name");
        }

        return errors;
    };

    useEffect(() => {
        if (bizMainCatgFrmData.addUpdateLoading == "succeeded") {
            formRef.current.resetForm(); 
            setTimeout(() => {setOpen(false);}, 4000);
        }
    }, [bizMainCatgFrmData.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_sub_field") : t("up_sub_field")}
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
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        {
                                            add?<></>:<Typography txtalign="left" fntsize="bodyTitleFontSize">{t("detail_name")}{" "}{":"} {getValueByLang(data?.group_name||"{}", values.main_lang||"en")} </Typography>
                                        }
                                        <Label>{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="main_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("main_name", getValueByLang(data?.main_name, e.target.value)); 
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            value={values.main_lang || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                bizMainGroupData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }

                                        {
                                            add ? <><Label>{t("detail_name")} </Label>
                                                <Select
                                                    app="true"
                                                    name="group_id"
                                                    width="100%"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={!add}
                                                    value={values.group_id || 0}
                                                >
                                                    <option disabled value={0}>
                                                        {t("ph_select_val")}
                                                    </option>
                                                    {
                                                        bizMainGroupData?.list?.map((d, i) => <option key={i} value={d.group_id}>{getValueByLang(d.group_name || "{}", values.main_lang)}</option>)
                                                    }
                                                </Select>
                                                {
                                                    errors.group_id && touched.group_id ? <ErrLabel>{errors.group_id}</ErrLabel> : null
                                                }</> : <></>
                                        }

                                        <Label>{t("sub_field_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="main_name"
                                            placeholder={t("ph_sub_field_name")}
                                            value={values.main_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.main_name && touched.main_name ? <ErrLabel>{errors.main_name}</ErrLabel> : null
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
