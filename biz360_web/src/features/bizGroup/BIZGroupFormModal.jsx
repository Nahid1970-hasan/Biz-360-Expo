import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, Button, DownloadButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { initLoader, loadBIZGroupData, saveBIZGroupData, updateBIZGroupData } from "./biz_group_slice";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { uploadIMGUsers } from "../../pages/memberTemplate/mmb_image_upload_slice";

export const BIZGroupFormModalPage = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const bizGroupFormData = useSelector((state) => state.bizgroupdata);

  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const [group_data, set_group_data] = useState({
    group_id: 0,
    group_name: '',
    group_lang: '',
    group_image: '',
    group_shortname: '',
    group_codename: '',
    is_seasonal: 0,
  });

  useEffect(() => {
    if (data) {
      set_group_data({
        group_name: getValueByLang(data.group_name || "{}"),
        group_shortname: getValueByLang(data.group_shortname || "{}"),
        group_codename: getValueByLang(data.group_codename || "{}"),
        group_lang: localStorage.i18nextLng || "en",
        group_id: data.group_id,
        group_image: data.group_image,
        is_seasonal: data.is_seasonal,
      });
    }
  }, [data]);

  const SubmitForm = (values) => {
    var datad = {};
     var group_codename = {};
    var group_name = {};
    var group_shortname = {};
    add ? "" : datad['group_id'] = values.group_id || 0;
    group_codename[values.group_lang] = values.group_codename;
    group_name[values.group_lang] = values.group_name;
    group_shortname[values.group_lang] = values.group_shortname;
    datad.group_name = JSON.stringify(group_name);
    datad.group_codename = JSON.stringify(group_codename);
    datad.group_shortname = JSON.stringify(group_shortname);
    datad.is_seasonal = values.is_seasonal || 0;
    dispatch(add ? saveBIZGroupData(datad) : updateBIZGroupData(datad));
    set_disabled(true)
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.group_name) {
      errors.group_name = t("err_detail_name");
    } else if (Values.group_name.length > 260) {
      errors.group_name = t("err_260_legnth");
    }

    if (!Values.group_lang) {
      errors.group_lang = t("err_msg_lang");
    }

    return errors;
  };

  useEffect(() => {
    if (bizGroupFormData.addUpdateLoading == "succeeded") {
      formRef.current.resetForm();
      setTimeout(() => { setOpen(false); set_disabled(false) }, 3000);
    }
  }, [bizGroupFormData.addUpdateLoading]);



  return (<>
    <Modal
      md={4}
      sm={8}
      xs={12}
      title={add ? t("add_main_field") : t("up_main_field")}
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
                      name="group_lang"
                      width="100%"
                      onChange={(e) => {
                        data && setFieldValue("group_name", getValueByLang(data?.group_name, e.target.value))
                        formik.handleChange(e)
                      }}
                      onBlur={handleBlur}
                      // value={add?"DEFAULT":values.status}
                      value={values.group_lang || 0}
                    >

                      <option disabled value={0}>
                        {t("ph_select_val")}
                      </option>
                      {
                        bizGroupFormData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                      }
                    </Select>
                    {
                      errors.group_lang && touched.group_lang ? <ErrLabel>{errors.group_lang}</ErrLabel> : null
                    }
                    <Label color="cardfont">{t("code_name")}</Label>
                    <Input
                      app="true"
                      type="text"
                      width="100%"
                      name="group_codename"
                      placeholder={t("ph_code_name")}
                      value={values.group_codename || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.group_codename && touched.group_codename ? <ErrLabel>{errors.group_codename}</ErrLabel> : null
                    }
                    <Label color="cardfont">{t("short_name")}</Label>
                    <Input
                      app="true"
                      type="text"
                      width="100%"
                      name="group_shortname"
                      placeholder={t("ph_short_name")}
                      value={values.group_shortname || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.group_shortname && touched.group_shortname ? <ErrLabel>{errors.group_shortname}</ErrLabel> : null
                    }


                    <Label color="cardfont">{t("detail_name")}</Label>
                    <Input
                      app="true"
                      type="text"
                      width="100%"
                      name="group_name"
                      placeholder={t("ph_detail_name")}
                      value={values.group_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.group_name && touched.group_name ? <ErrLabel>{errors.group_name}</ErrLabel> : null
                    }

                    <Label color="cardfont">{t("seasonal")}</Label>
                    <Select
                      app="true"
                      name="is_seasonal"
                      width="100%"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.is_seasonal || 0}
                    >

                      <option disabled value={"default"}>
                        {t("ph_select_val")}
                      </option>

                      <option value={1}>{t("yes")}</option>
                      <option value={0}>{t("no")}</option>

                    </Select>
                    {
                      errors.is_seasonal && touched.is_seasonal ? <ErrLabel>{errors.is_seasonal}</ErrLabel> : null
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
