import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Toast } from "../component/Toast";
import { Container } from "../component/style/styled_contrainer";
import { Card, CardBody } from "../component/style/styled_card";
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../component/style/styled_flex";
import { NotFound } from "./NotFound";
import { Input } from "../component/style/styled_input";
import { ErrLabel } from "../component/style/styled_label";
import { PrimaryButton } from "../component/style/styled_button";
import { getResetPassword, initLoader } from "../features/resetPassword/reset_password_slice";
import { Loading } from "../component/Loading";

 
  
export const ResetPasswordPage = () => {
  const { t, i18n } = useTranslation();
  const resetPassData = useSelector((state) => state.resetpassdata);
  const dispatch = useDispatch();
  const { token } = useParams();
  const [tokenstr] = useState(token.split(":token=")[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
   const formRef = useRef();

  const initData = {
    password: "",
    new_password: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.password) {
      errors.password = t("err_new_pass");
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(values.password)
    ) {
      errors.password = t("err_msg_password_invalid");
    }
    if (!values.new_password) {
        errors.new_password = t("err_con_new_pass");
    }else if (values.new_password != values.password) {
      errors.new_password = t("err_msg_con_password");
    }
    return errors;
  };
  const submitForm = (values) => {
    var data = {
        token: tokenstr,
        new_password: values.new_password
    }
    dispatch(getResetPassword(data));
  };

  useEffect(() => {
      if (resetPassData.loading == "pending") {
        setIsLoading(true);
        setIsSuccess(false);
      } else if (resetPassData.loading == "succeeded") {
        if( formRef!=null){
          formRef.current.resetForm(); 
        }
        setIsSuccess(true);
        setIsLoading(false);
        setTimeout(() => { dispatch(initLoader()); }, 5000);
      } else if (resetPassData.loading != "idle") {
        setIsLoading(false);
        setIsSuccess(false);
        setTimeout(() => { dispatch(initLoader()); }, 5000);
      }
    }, [resetPassData.loading]);

  return (
    <>   {(resetPassData.loading == "idle" || resetPassData.loading == "pending") ? <></> : (
      resetPassData.loading != "succeeded" && (
          <Toast color="error" msg={resetPassData.msg} />
      )
  )}
      <Suspense>
        <Container>
          <Card color={"bg"}>
            <CardBody>
              {tokenstr != undefined ? isSuccess? ( 
                  <Flex row="row" justifycenter="true">
                  <Flex md={4} sm={6} xs={12}>
                    <Center>
                      <Typography fntsize="bodySubTitleFontSize" lnheight="23px">
                        {resetPassData?.display_msg || ""}
                      </Typography>
                    </Center>
                  </Flex> 
                </Flex>
              ) :  (
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
                        <Flex row ="row" justifycenter="true"> 
                            <Flex md={3} sm={6} xs={12}>
                                <Typography
                                txtalign="center"
                                fntweight="bold"
                                >
                                {t("reset_title")}
                                </Typography>
                                <form  onSubmit={handleSubmit}>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder={t("ph_new_pass")}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                     {errors.password &&
                                  touched.password ? (
                                    <ErrLabel>{errors.password}</ErrLabel>
                                  ) : null}
                                    <Input
                                        type="password"
                                        name="new_password"
                                        placeholder={t("ph_con_new_pass")}
                                        value={values.new_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                     {errors.new_password &&
                                  touched.new_password ? (
                                    <ErrLabel>{errors.new_password}</ErrLabel>
                                  ) : null} 
                                    <PrimaryButton
                                        full="true"
                                        color="primaryButton"
                                        type="submit"
                                        fontcolor="font"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid)}
                                    >
                                        {t("submit")}{" "}
                                    </PrimaryButton>
                                    </form>
                                
                            </Flex> 
                        </Flex> 
                    </div>
                  );
                }}
              </Formik> ) : (
                <NotFound/> 
              )}
            </CardBody>
          </Card>
        </Container>
      </Suspense>
      <Loading open={isLoading} />
    </>
  );
};
