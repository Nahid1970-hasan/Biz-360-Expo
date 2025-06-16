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
import { FaqSave, UpdateFaq } from "./faq_Slice";
import { Typography } from "../../component/style/styled_typography";

export const FAQModal = ({
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
        faq_id: 0,
        question: '',
        group_name: '',
        group_id: 0,
        answer: '',
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                main_lang: localStorage.i18nextLng || "en",
                question: getValueByLang(data.question || "{}"),
                faq_id: data.faq_id,
                group_id: data.group_id,
                answer: getValueByLang(data.answer || "{}"),
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var question = {};
        var answer = {};
        datad['faq_id'] = add ? 0 : (values.faq_id || 0);
        question[values.main_lang] = values.question;
        datad.question = JSON.stringify(question);
        answer[values.main_lang] = values.answer;
        datad.answer = JSON.stringify(answer);
        datad.group_id = values.group_id || 0;
        dispatch(add ? FaqSave(datad) : UpdateFaq(datad));
    };

    const validate = (Values) => {
        let errors = {};
        if (!Values.group_id) {
            errors.group_id = t("err_msg_group");
        } else if (Values.group_id.length > 500) {
            errors.group_id = t("err_500_legnth");
        }
        if (!Values.question) {
            errors.question = t("err_msg_question");
        } else if (Values.question.length > 500) {
            errors.question = t("err_500_legnth");
        }

        if (!Values.answer) {
            errors.answer = t("err_msg_ans");
        } else if (Values.answer.length > 500) {
            errors.answer = t("err_500_legnth");
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
            title={add ? t("add_faq") : t("up_faq")}
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
                                                data && setFieldValue("question", getValueByLang(data?.question, e.target.value))
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
                                                faqData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }


                                        <Label>{t("group_name")} </Label>
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
                                                faqData?.dataList?.map((d, i) => <option key={i} value={d.group_id}>{getValueByLang(d.group_name || "{}", values.main_lang)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.group_id && touched.group_id ? <ErrLabel>{errors.group_id}</ErrLabel> : null
                                        }

                                        <Label color="cardfont">{t("question")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="question"
                                            placeholder={t("question")}
                                            value={values.question || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.question && touched.question ? <ErrLabel>{errors.question}</ErrLabel> : null
                                        }

                                        <Label color="cardfont">{t("answer")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="answer"
                                            placeholder={t("answer")}
                                            value={values.answer || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.answer && touched.answer ? <ErrLabel>{errors.answer}</ErrLabel> : null
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
