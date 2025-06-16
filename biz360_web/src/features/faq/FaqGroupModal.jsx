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
import {  SaveFaqGroup, UpdateFaqGroup } from "./faq_Slice";

export const FaqGroupModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const faqData = useSelector((state) => state.faqData);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [group_data, set_group_data] = useState({
        group_id: 0,
        group_name: '',
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                main_lang: localStorage.i18nextLng || "en",
                group_name:getValueByLang(data.group_name ||"{}") ,
                group_id: data.group_id,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var group_name = {};
        datad['group_id'] = add ? 0 : (values.group_id || 0);
        group_name[values.main_lang] = values.group_name;
        datad.group_name = JSON.stringify(group_name);
        dispatch(add ? SaveFaqGroup(datad) : UpdateFaqGroup(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.group_name) {
            errors.group_name = t("err_msg_group_name");
        } else if (Values.group_name.length > 260) {
            errors.group_name = t("err_260_legnth");
        }
        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }
        return errors;
    };

    useEffect(() => {
        if (faqData.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [faqData.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_faq_gruop") : t("up_faq_group")}
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
                                                data && setFieldValue("group_name", getValueByLang(data?.group_name, e.target.value))
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
                                                faqData?.groupLang?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("group_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="group_name"
                                            placeholder={t("group_name")}
                                            value={values.group_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.group_name && touched.group_name ? <ErrLabel>{errors.group_name}</ErrLabel> : null
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
