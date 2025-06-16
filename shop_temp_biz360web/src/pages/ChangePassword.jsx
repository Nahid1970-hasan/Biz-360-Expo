import { changePasswordEdit, initLoader } from "../features/changePassword/changePassword_slice";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import { Toast } from "../component/Toast";
import { Input } from "../component/style/styled_input";
import { ErrLabel, Label } from "../component/style/styled_label";
import { Loading } from "../component/Loading";
import { CardBody } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { loadPage } from "../features/page/page_slice";

export const ChangePassword = () => {


  const changePassword = useSelector(state => state.changePassword);
  const [disabled, set_disabled] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(loadPage({ title: 'change_password' }))
  }, []);

  const initData = {
    current_password: "",
    password: "",
    new_password: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.current_password) {
      errors.current_password = t("err_ern_pass");
    }
    if (!values.password) {
      errors.password = t("err_new_pass");
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
    ) {
      errors.password = t("err_password_invalid");
    }
    if (!values.new_password) {
      errors.new_password = t("err_con_new_pass");
    } else if (values.new_password != values.password) {
      errors.new_password = t("err_password_mismatch");
    }
    return errors;
  };
  const submitForm = (values) => {
    var data = {
      current_password: values.current_password,
      password: values.new_password
    }
    dispatch(changePasswordEdit(data));

  };

//   useEffect(() => {
//     if (changePassword.loading == "pending") {
//       setIsLoading(true);
//     } else if (changePassword.loading == "succeeded") {
//       formRef.current.resetForm(); setIsLoading(false);
//       setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
//     } else if (changePassword.loading != "idle") {
//       setIsLoading(false);
//       setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
//     }
//   }, [changePassword.loading]);

  return (
    <>
      {/* {(changePassword.loading == "idle" || changePassword.loading == "pending") ? <></> : (
        changePassword.loading == "succeeded" ? (
          <Toast msg={changePassword.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={changePassword.msg} />
        )
      )} */}
      <Flex row>
        <Flex padding="0" md={12} sm={12} xs={12}>
          <CardBody>
            <Formik
              initialValues={initData}
              validate={validate}
              innerRef={formRef}
              onSubmit={submitForm}
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
                } = formik;
                return (
                  <div>
                    <Flex row>
                      <Flex padding="0 !important" md={6} sm={8} xs={12}>
                        <form onSubmit={handleSubmit} >
                          <label htmlFor="current_password">{t("crn_pass")}</label>
                          <Input
                            type="password"
                            id="current_password"
                            name='current_password'
                            placeholder={t("ph_crn_pass")}
                            value={values.current_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.current_password &&
                            touched.current_password ? (
                            <ErrLabel>{errors.current_password}</ErrLabel>
                          ) : null}
                          <label htmlFor="password">{t("new_password")}</label>
                          <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder={t("ph_new_pass")}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password &&
                            touched.password ? (
                            <Label>{errors.password}</Label>
                          ) : null}
                          <label htmlFor="new_password">{t("con_new_password")}</label>
                          <Input
                            type="password"
                            id="new_password"
                            name="new_password"
                            placeholder={t("ph_con_new_pass")}
                            value={values.new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.new_password &&
                            touched.new_password ? (
                            <Label>{errors.new_password}</Label>
                          ) : null}
                          <PrimaryButton
                            type="submit"  
                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                            disabled={!(dirty && isValid) || disabled}>
                            {t("submit")}
                          </PrimaryButton>
                        </form>
                      </Flex>
                    </Flex>
                  </div>
                );
              }}
            </Formik>
          </CardBody>
        </Flex>
      </Flex>
      <Loading open={isLoading} />
    </>
  );
};
