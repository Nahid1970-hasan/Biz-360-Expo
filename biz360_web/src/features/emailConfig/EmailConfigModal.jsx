
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { CardBody, CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { Select } from "../../component/style/styled_select";
import { Loading } from "../../component/Loading";
import { saveEmailConfig, updateEmailConfig } from "./email_config_slice";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";


export const EmailConfigModal = ({ add, open, setOpen = () => { }, data }) => {
  const emailConfig = useSelector((state) => state.emailconfigdata);
  const [isLoading, setIsLoading] = useState(false);
  const [config_id, set_config_id] = useState(0);
  const formRef = useRef();
  const { t, i18n } = useTranslation();
  const [disabled, set_disabled] = useState(false);
  const [email_data, set_email_data] = useState({
    config_id: "",
    email_server: "",
    enable_ssl: "",
    network_cred_pass: "",
    network_cred_user_email: "",
    port: "",
    sender_name: "",
    sending_email_address: "",
    used_for: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    set_email_data(data);
    set_config_id(data.config_id || "");
  }, [data]);

  const submitForm = (values) => {
    add ? "" : (values.config_id = config_id);
    dispatch(add ? saveEmailConfig(values) : updateEmailConfig(values));
    set_disabled(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.sender_name) {
      errors.sender_name = t("err_sender_name");
    } else if (values.sender_name.length > 260) {
      errors.sender_name = t("err_sender_name_length");
    }

    if (!values.network_cred_pass) {
      errors.network_cred_pass = t("network_cred_pass");
    } else if (values.network_cred_pass.length > 260) {
      errors.network_cred_pass = t("err_network_cred_pass");
    }
    if (!values.email_server) {
      errors.email_server = t("err_email_server");
    } else if (values.email_server.length > 500) {
      errors.email_server = t("err_email_server");
    }
    if (!values.port) {
      errors.port = t("err_port");
    } else if (values.port.length > 500) {
      errors.port = t("err_port_length");
    }
    if (!values.network_cred_user_email) {
      errors.network_cred_user_email = t("err_net_cred_emails");
    } else if (values.network_cred_user_email.length > 560) {
      errors.network_cred_user_email = t("err_net_cred_email_length");
    }
    if (!values.sending_email_address) {
      errors.sending_email_address = t("sending_email_address");
    } else if (values.sending_email_address.length > 500) {
      errors.sending_email_address = t("err_sending_email_address");
    }
    if (!values.used_for) {
      errors.used_for = t("err_used_for");
    } else if (values.used_for.length > 500) {
      errors.used_for = t("err_used_for_length");
    }
    return errors;
  };


  useEffect(() => {
    if (emailConfig.addUpdateLoading == "succeeded") {
        formRef.current.resetForm();
        setTimeout(() => { setOpen(false); }, 4000);
    }
}, [emailConfig.addUpdateLoading]);

  return (
    <>
      <Modal
        md={6}
        sm={8}
        xs={10}
        title={add ? t("add_email_congf") : t("update_email_congf")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >
        <Formik
          initialValues={email_data}
          validate={validate}
          enableReinitialize
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
                <form onSubmit={handleSubmit}>
                 
                  <CardBody>
                    <Flex row="row">
                      <Flex md={6} padding="0 10px!important">
                      <Label color="font">{t("sender_name")}</Label>
                    <Input
                      app="app"
                      type="text"
                      name="sender_name"
                      placeholder={t("sender_name")}
                      value={values.sender_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sender_name && touched.sender_name ? (
                      <ErrLabel>{errors.sender_name}</ErrLabel>
                    ) : null}

                    <Label color="font" htmlFor="sending_email">{t("sending_email")}</Label>
                    <Input
                      app="app"
                      type="email"
                      name="sending_email_address"
                      placeholder={t("sending_email")}
                      value={values.sending_email_address || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.sending_email_address &&
                      touched.sending_email_address ? (
                      <ErrLabel>{errors.sending_email_address}</ErrLabel>
                    ) : null}

                    <Label color="cardfont" >{t("email_server")} </Label>
                    <Input
                      app="app"
                      type="text"
                      name="email_server"
                      placeholder={t("email_server")}
                      value={values.email_server || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email_server && touched.email_server ? (
                      <ErrLabel>{errors.email_server}</ErrLabel>
                    ) : null}
                    <Label color="cardfont">{t("enable_ssl")} </Label>

                    <Select
                      width="100%"
                      app="app"
                      defaultValue={""}
                      name="enable_ssl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option disabled value="">
                        {t("ph_sel_ssl")}
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                        </Flex>
                        <Flex md={6} padding="0 10px!important">
                        <Label margin="0.65rem 0 0 0"
                      color="cardFont" >
                      {t("net_cred_email")}{" "}
                    </Label>
                    <Input
                      app="app"
                      type="email"
                      name="network_cred_user_email"
                      placeholder={t("net_cred_email")}
                      value={values.network_cred_user_email || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.network_cred_user_email &&
                      touched.network_cred_user_email ? (
                      <ErrLabel>{errors.network_cred_user_email}</ErrLabel>
                    ) : null}

                    <Label margin="0.65rem 0 0 0"
                      color="cardFont" htmlFor="network_cred_pass">
                      {t("net_cred_pass")}{" "}
                    </Label>
                    <Input
                      app="app"
                      type="password"
                      name="network_cred_pass"
                      placeholder={t("net_cred_pass")}
                      value={values.network_cred_pass || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.network_cred_pass && touched.network_cred_pass ? (
                      <ErrLabel>{errors.network_cred_pass}</ErrLabel>
                    ) : null}

                    <Label margin="0.65rem 0 0 0"
                      color="cardFont" >{t("port")} </Label>
                    <Input
                      app="app"
                      type="text"
                      name="port"
                      placeholder={t("port")}
                      value={values.port || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.port && touched.port ? (
                      <ErrLabel>{errors.port}</ErrLabel>
                    ) : null}

                    <Label margin="0.65rem 0 0 0"
                      color="cardFont" htmlFor="used_for">{t("used_for")} </Label>
                    <Input
                      app="app"
                      type="text"
                      name="used_for"
                      placeholder={t("used_for")}
                      value={values.used_for || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.used_for && touched.used_for ? (
                      <ErrLabel>{errors.used_for}</ErrLabel>
                    ) : null}
                        </Flex>
                    </Flex>
                  </CardBody>
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
