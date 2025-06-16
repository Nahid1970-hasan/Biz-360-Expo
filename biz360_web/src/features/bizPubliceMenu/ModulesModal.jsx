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
import { updateModulesData } from "./public_menu_Slice";
import { getValueByLang } from "../../utils/helper";

export const ModulesModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizpublicdata = useSelector((state) => state.bizpublicdata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [main_data, set_main_data] = useState({
        module_id: 0,
        module_name: '',
        })


    useEffect(() => {
        if (data) {
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                module_id: data.module_id,
                module_name:getValueByLang(data.module_name || "{}"),
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var module_name={};
        add ? "" : datad['module_id'] = values.module_id || 0;
        module_name[values.main_lang] = values.module_name;
        datad.module_name = JSON.stringify(module_name);
        dispatch( updateModulesData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.module_name) {
            errors.module_name = t("err_msg_module_name");
        } else if (Values.module_name.length > 20) {
            errors.module_name = t("err_20_legnth");
        }

        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }

        return errors;
    };

    useEffect(() => {
        if (bizpublicdata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [bizpublicdata.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("Up_menu_name")}
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
                                                bizpublicdata?.languageList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }

                                        <Label>{t("module_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="module_name"
                                            placeholder={t("module_name")}
                                            value={values.module_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.module_name && touched.module_name ? <ErrLabel>{errors.module_name}</ErrLabel> : null
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
