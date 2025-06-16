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
import { saveBizTemplate, updateTemplate } from "./template_slice";

export const BizTemplateModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const biztempdata = useSelector((state) => state.biztempdata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [main_data, set_main_data] = useState({
        template_id: 0,
        template_name: '',
        template_desc: '',
        group_id: 0,
        main_lang: 0,
        published:"DEFAULT",
        })


    useEffect(() => {
        if (data) {
            // console.log(data)
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                group_id: data.group_id,
                template_id: data.template_id,
                template_name:data.template_name,
                template_desc:data.template_desc,
                published:data.published=="Published"?"yes":"no",
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var template_desc = {};
        add ? "" : datad['template_id'] = values.template_id || 0;
        template_desc[values.main_lang] = values.template_desc;
        datad.template_desc = JSON.stringify(template_desc);
        datad.group_id = values.group_id || 0;
        datad.template_name = values.template_name || "";
        datad.published = values.published=="yes"?1:0 || 0;
        dispatch(add ? saveBizTemplate(datad) : updateTemplate(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.template_name) {
            errors.template_name = t("err_msg_tem_name");
        } else if (Values.template_name.length > 20) {
            errors.template_name = t("err_20_legnth");
        }
        if (!Values.template_desc) {
            errors.template_desc = t("err_tem_desc");
        } else if (Values.template_desc.length > 500) {
            errors.template_desc = t("err_500_legnth");
        }
        if (!Values.group_id) {
            errors.group_id = t("err_msg_group");
        }

        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }

        return errors;
    };

    useEffect(() => {
        if (biztempdata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [biztempdata.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_template") : t("update_template")}
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
                                            add ? <></> : <Label fntsize="bodyTitleFontSize">{t("group_name : ")} {getValueByLang(data?.group_name || "{}", values.main_lang || "en")} </Label>
                                        }
                                        <Label>{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="main_lang"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.main_lang || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                biztempdata?.languageList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }

                                        {
                                            add ? <><Label>{t("biz_group")} </Label>
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
                                                        biztempdata?.list?.map((d, i) => <option key={i} value={d.group_id}>{getValueByLang(d.group_name || "{}", values.main_lang)}</option>)
                                                    }
                                                </Select>
                                                {
                                                    errors.group_id && touched.group_id ? <ErrLabel>{errors.group_id}</ErrLabel> : null
                                                }</> : <></>
                                        }

                                        <Label>{t("template_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="template_name"
                                            placeholder={t("template_name")}
                                            value={values.template_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.template_name && touched.template_name ? <ErrLabel>{errors.template_name}</ErrLabel> : null
                                        }

                                        <Label>{t("template_desc")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="template_desc"
                                            placeholder={t("template_desc")}
                                            value={values.template_desc || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.template_desc && touched.template_desc ? <ErrLabel>{errors.template_desc}</ErrLabel> : null
                                        }
                                        <Label>{t("template_status")}</Label>
                                        <Select
                                            app="true"
                                            name="published"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.published || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                        </Select>

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
