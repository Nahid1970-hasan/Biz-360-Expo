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
import { saveAdContentSetup, updateAdContentSetup } from "./ad_content_setup_Slice";

export const AdContentModal = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const adContentdata = useSelector((state) => state.adContentdata); 
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();
 
  const [group_data, set_group_data] = useState({
    content_id:0,
    content_name: '',
    group_lang: '',
  })


  useEffect(() => {
    if (data) {
      set_group_data({
        content_name: getValueByLang(data.content_name||"{}"),
        group_lang: localStorage.i18nextLng ||"en",
        content_id: data.content_id
      }); 
    } 
  }, [data]);

  const SubmitForm = (values) => {
    var datad = {  };
    var content_name = {  };
    add ? "" : datad['content_id'] = values.content_id||0;  
    content_name[values.group_lang] = values.content_name; 
    datad.content_name = JSON.stringify(content_name); 
    dispatch(add ? saveAdContentSetup(datad): updateAdContentSetup(datad)); 
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.content_name) {
      errors.content_name = t("err_msg_content_name");
    } else if (Values.content_name.length > 260) {
      errors.content_name = t("err_260_legnth");
    }
    if (!Values.group_lang) {
      errors.group_lang = t("err_msg_lang");
    }

    return errors;
  };

  useEffect(() => {
    if (adContentdata.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); 
      setTimeout(() => {setOpen(false);}, 3000);
    } 
  }, [adContentdata.addUpdateLoading]);

  return (<>
    <Modal
      md={4}
      sm={8}
      xs={12}
      title={add ? t("add_content") : t("up_content")}
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
                      onChange={(e)=>{ 
                        data && setFieldValue("content_name", getValueByLang(data?.content_name, e.target.value))
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
                        adContentdata?.langlist?.map((d, i)=><option key={i} value={d.language_code}>{d.language_name}</option>)
                      } 
                    </Select>
                    {
                      errors.group_lang && touched.group_lang ? <ErrLabel>{errors.group_lang}</ErrLabel> : null
                    }
                    <Label color="cardfont">{t("content_name")}</Label>
                    <Input
                      app="true"
                      type="text"
                      width="100%"
                      name="content_name"
                      placeholder={t("content_name")}
                      value={values.content_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.content_name && touched.content_name ? <ErrLabel>{errors.content_name}</ErrLabel> : null
                    }
                  </Flex>
                  <Flex md={12} padding="0 10px 0 0 !important">
                    <ULine/>
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
