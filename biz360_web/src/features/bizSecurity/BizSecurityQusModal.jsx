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
import { saveSecurityQusData, updateSecurityQusData } from "./biz_security_qus_slice";

export const BizSecurityQusModal = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const bizsecurityqus = useSelector((state) => state.bizsecurityqus);
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const [group_data, set_group_data] = useState({
    question_id: 0,
    question: '',
  })


  useEffect(() => {
    if (data) {
      set_group_data({
        main_lang: localStorage.i18nextLng || "en",
        question: getValueByLang(data.question ||"{}"),
        question_id: data.question_id,

      });
    }
  }, [data]);

  const SubmitForm = (values) => {

    var datad = {};
    var question = {};
    datad['question_id'] =  add ? 0 : (values.question_id || 0);
    question[values.main_lang] = values.question;
    datad.question = JSON.stringify(question);
    dispatch(add ? saveSecurityQusData(datad) : updateSecurityQusData(datad));
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.question) {
      errors.question = t("err_msg_question");
    } else if (Values.question.length > 260) {
      errors.question = t("err_260_legnth");
    }
    if (!Values.main_lang) {
      errors.main_lang = t("err_msg_lang");
    }
    return errors;
  };

  useEffect(() => {
    if (bizsecurityqus.addUpdateLoading == "succeeded") {
      formRef.current.resetForm();
      setTimeout(() => { setOpen(false); }, 3000);
    }
  }, [bizsecurityqus.addUpdateLoading]);

  return (<>
    <Modal
      md={4}
      sm={8}
      xs={12}
      title={add ? t("add_qus") : t("up_qus")}
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
                        bizsecurityqus?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                      }
                    </Select>
                    {
                      errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
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
