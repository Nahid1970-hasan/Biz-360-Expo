import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savesmsconfigdata, updateSmsConfig } from "./smsConfig_slice";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Flex } from "../../component/style/styled_flex";
import { Input } from "../../component/style/styled_input";
import { Select } from "../../component/style/styled_select";
import { Formik } from "formik";
import { Modal } from "../../component/Modal";
import { useTranslation } from "react-i18next";
import { Loading } from "../../component/Loading";


export const SMSConfigModal = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const smsConfig = useSelector((state) => state.smsconfigdata);
  const [isLoading, setIsLoading] = useState(false);
  const [config_id, set_config_id] = useState(0);
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const { t, i18n } = useTranslation();
  const [sms_data, set_sms_data] = useState({
    sender_name: '',
    company_name: '',
    base_url: '',
    gateway_username: '',
    gateway_password: '',
    gateway_api_key: '',
    gateway_sender_id: '',
    sms_type: "DEFAULT",
    sender_id: '',
    status: "DEFAULT",
  })

  const dispatch = useDispatch();

  useEffect(() => {
    set_sms_data(data);
    set_config_id(data.config_id || "");
  }, [data]);

  const SubmitForm = (values) => {
    add ? "" : values.config_id = config_id;
    dispatch(add ? savesmsconfigdata(values) : updateSmsConfig(values));
    set_disabled(true);
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.sender_name) {
      errors.sender_name = t("err_sender_name");
    } else if (Values.sender_name.length > 260) {
      errors.sender_name = t("err_260_legnth");
    }

    if (!Values.company_name) {
      errors.company_name = t("company_name");
    } else if (Values.company_name.length > 260) {
      errors.company_name = t("err_260_legnth");
    }
    if (!Values.base_url) {
      errors.base_url = t("err_base_url");
    } else if (Values.base_url.length > 500) {
      errors.base_url = t("err_500_legnth");
    }
    if (!Values.gateway_username) {
      errors.gateway_username = t("gateway_username");
    } else if (Values.gateway_username.length > 500) {
      errors.gateway_username = t("err_500_legnth");
    }

    if (!Values.gateway_password) {
      errors.gateway_password = t("gateway_password");
    } else if (Values.gateway_password.length > 500) {
      errors.gateway_password = t("err_500_legnth");
    }
    if (!Values.sms_type) {
      errors.sms_type = t("sms_type");
    }
    if (!Values.gateway_api_key) {
      errors.gateway_api_key = t("gateway_api_key");
    } else if (Values.gateway_api_key.length > 500) {
      errors.gateway_api_key = t("err_500_legnth");
    }
    if (!Values.gateway_sender_id) {
      errors.gateway_sender_id = t("gateway_sender_id");
    } else if (Values.gateway_sender_id.length > 500) {
      errors.gateway_sender_id = t("err_500_legnth");
    }

    if (!Values.status) {
      errors.status = t("err_status");
    }
    return errors;
  };

  useEffect(() => {
    if (smsConfig.addUpdateLoading == "succeeded") {
      formRef.current.resetForm();
      setTimeout(() => { setOpen(false); }, 4000);
    }
  }, [smsConfig.addUpdateLoading]);

  return (<>
    <Modal
      md={6}
      sm={8}
      xs={12}
      title={add ? t("add_sms_congf") : t("up_sms_conf")}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      outsideclick
    >
      <Formik
        initialValues={sms_data}
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
            resetForm
          } = formik;

          return (
            <div>
              <form onSubmit={handleSubmit}>
              
                <Flex row="row">
                  <Flex md={6} padding="0 10px 0 0 !important">
                    <Label color="cardfont">{t("comp_name")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="company_name"
                      placeholder={t("comp_name")}
                      value={values.company_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.company_name && touched.company_name ? <ErrLabel>{errors.company_name}</ErrLabel> : null
                    }


                    <Label color="cardfont">{t("base_url")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="base_url"
                      placeholder={t("base_url")}
                      value={values.base_url || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.base_url && touched.base_url ? <ErrLabel>{errors.base_url}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("sender_name")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="sender_name"
                      placeholder={t("sender_name")}
                      value={values.sender_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.sender_name && touched.sender_name ? <ErrLabel>{errors.sender_name}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("user_name")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="gateway_username"
                      placeholder={t("user_name")}
                      value={values.gateway_username || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.gateway_username && touched.gateway_username ? <ErrLabel>{errors.gateway_username}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("password")}</Label>
                    <Input
                      app="app"
                      type="password"
                      name="gateway_password"
                      placeholder={t("password")}
                      value={values.gateway_password || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.gateway_password && touched.gateway_password ? <ErrLabel>{errors.gateway_password}</ErrLabel> : null
                    }
                  </Flex>

                  <Flex md={6} padding="0 0 0 10px !important">
                    <Label color="cardfont" htmlFor="gateway_api_key">{t("api_key")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="gateway_api_key"
                      placeholder={t("api_key")}
                      value={values.gateway_api_key || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.gateway_api_key && touched.gateway_api_key ? <ErrLabel>{errors.gateway_api_key}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("sender_id")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="gateway_sender_id"
                      placeholder={t("sender_id")}
                      value={values.gateway_sender_id || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.gateway_sender_id && touched.gateway_sender_id ? <ErrLabel>{errors.gateway_sender_id}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("type")}</Label>
                    <Select
                      app="app"
                      width="100%"
                      name="sms_type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sms_type || "DEFAULT"}
                    >
                      <option disabled value="DEFAULT">
                        {t("ph_type")}
                      </option>
                      <option value="Masking">Masking</option>
                      <option value="Non-masking">Non-masking</option>
                    </Select>
                    {
                      errors.sms_type && touched.sms_type ? <ErrLabel>{errors.sms_type}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("status")} </Label>
                    <Select
                      app="app"
                      width="100%"
                      name="status"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // value={add?"DEFAULT":values.status}
                      value={values.status || "DEFAULT"}
                    >

                      <option disabled value="DEFAULT">
                        {t("ph_select_status")}
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                    {
                      errors.status && touched.status ? <ErrLabel>{errors.status}</ErrLabel> : null
                    }

                  </Flex>
                </Flex>

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

              </form>

            </div>
          );
        }}
      </Formik>
    </Modal>
    <Loading open={isLoading} />
  </>
  );
};
