import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { ULine } from "../../component/style/styled_uline";
import { updateFeedbackData } from "./feedback_Slice";

export const FeedbackModal = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const feedback = useSelector((state) => state.feedback);
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const [group_data, set_group_data] = useState({
    feedback_id: 0,
    req_name: '',
    req_address: '',
    req_mobile: '',
    req_email: '',
    req_detail: '',
    req_datetime: '',
    res_detail: '',
  })


  useEffect(() => {
    if (data) {
      set_group_data({
        main_lang: localStorage.i18nextLng || "en",
        res_detail: data.res_detail,
        feedback_id: data.feedback_id,

      });
    }
  }, [data]);

  const SubmitForm = (values) => {

    var datad = {};
    var res_detail = {};
    datad['feedback_id'] =  add ? 0 : (values.feedback_id || 0);
    res_detail[values.main_lang] = values.res_detail;
    datad.res_detail = JSON.stringify(res_detail);
    dispatch( updateFeedbackData(datad));
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.res_detail) {
      errors.res_detail = t("err_msg_res_detail");
    } else if (Values.res_detail.length > 260) {
      errors.res_detail = t("err_260_legnth");
    }
    // if (!Values.main_lang) {
    //   errors.main_lang = t("err_msg_lang");
    // }
    return errors;
  };

  useEffect(() => {
    if (feedback.addUpdateLoading == "succeeded") {
      formRef.current.resetForm();
      setTimeout(() => { setOpen(false); }, 3000);
    }
  }, [feedback.addUpdateLoading]);

  return (<>
    <Modal
      md={4}
      sm={8}
      xs={12}
      title={ t("up_feedback")}
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
                    {/* <Select
                      app="true"
                      name="main_lang"
                      width="100%"
                      onChange={(e) => {
                        data && setFieldValue("res_detail", getValueByLang(data?.res_detail, e.target.value))
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
                        feedback?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                      }
                    </Select>
                    {
                      errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                    } */}
                    <Label color="cardfont">{t("res_detail")}</Label>
                    <Input
                      app="true"
                      type="text"
                      width="100%"
                      name="res_detail"
                      placeholder={t("res_detail")}
                      value={values.res_detail || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.res_detail && touched.res_detail ? <ErrLabel>{errors.res_detail}</ErrLabel> : null
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
