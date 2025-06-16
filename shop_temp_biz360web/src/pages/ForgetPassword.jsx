import { Formik } from "formik";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../component/style/styled_button";
import { Input } from "../component/style/styled_input";
import { Toast } from "../component/Toast";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Loading } from "../component/Loading";
import { getPassResetLink, initLoader } from "../features/resetPassword/forget_password_slice";
import { Container } from "../component/style/styled_contrainer";
import { Card, CardBody } from "../component/style/styled_card";
import { Center } from "../component/style/styled_center";
import { Flex } from "../component/style/styled_flex";
import { ErrLabel, Label } from "../component/style/styled_label";
import { Typography } from "../component/style/styled_typography";

export const ForgetPasswordPage = () => {
  const { t, i18n } = useTranslation();
  const forgetPassData = useSelector((state) => state.forgetpassdata);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();

  const [initData, setInitData] = useState({ email_address: "" });
  const validate = (values) => {
    let errors = {};
    if (!values.email_address) {
      errors.email_address = t("err_msg_email");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_address)
    ) {
      errors.email_address = t("err_msg_email_invalid");
    }
    return errors;
  };
  const submitForm = (values) => {
    dispatch(getPassResetLink(values));
  };

  useEffect(() => {
    if (forgetPassData.loading == "pending") {
      setIsLoading(true);
      setIsSuccess(false);
    } else if (forgetPassData.loading == "succeeded") {
      setInitData({ email_address: "" })
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (forgetPassData.loading != "idle") {
      setIsLoading(false);
      setIsSuccess(false);
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    }
  }, [forgetPassData.loading]);

  return (
    <>
      {(forgetPassData.loading == "idle" || forgetPassData.loading == "pending") ? <></> : (
        forgetPassData.loading != "succeeded" && (
          <Toast color="error" msg={forgetPassData.msg} />
        )
      )}
      <Suspense>
        <Container>
          <Card color={"bg"}>
            <CardBody>
              {isSuccess ? (
                <Flex row="row" justifycenter="true">
                  <Flex md={4} sm={6} xs={12}>
                    <Center>
                      <Typography fntsize="bodySubTitleFontSize" lnheight="23px">
                        {forgetPassData?.display_msg || ""}
                      </Typography>
                    </Center>
                  </Flex> 
                </Flex>
              ) : (
                <Formik
                  initialValues={initData}
                  validate={validate}
                  innerRef={formRef}
                  onSubmit={submitForm}
                  enableReinitialize
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
                      <Flex row="row" justifycenter="true">
                        <Flex md={4} sm={6} xs={12}>
                          <Flex row="row">
                            <Flex md={12}>
                              <Typography
                                fntsize="bodySubTitleFontSize"
                                color="font"
                                txtalign="left"
                                fntweight="bold"
                              >
                                {t("forget_password")}
                              </Typography>

                              <Typography
                                color="font"
                                txtalign="left"
                              >
                                {t("forget_pass_subtitle")}
                              </Typography>
                            </Flex>
                            <Flex padding="0 !important" md={12}>
                              <form onSubmit={handleSubmit}>
                                <Input
                                  type="email"
                                  name="email_address"
                                  placeholder={t("ph_email")}
                                  value={values.email_address || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.email_address &&
                                  touched.email_address ? (
                                  <ErrLabel>{errors.email_address}</ErrLabel>
                                ) : null}
                                <PrimaryButton
                                  full="true"
                                  type="submit"
                                  className={!(dirty && isValid) ? "disabled-btn" : ""}
                                  disabled={!(dirty && isValid)}
                                >
                                  {t("submit")}
                                </PrimaryButton>
                              </form>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>

                    );
                  }}
                </Formik>
              )}
            </CardBody>
          </Card>
        </Container>
      </Suspense>

      <Loading open={isLoading} />
    </>
  );
};
