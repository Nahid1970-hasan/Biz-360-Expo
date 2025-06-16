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
import { saveAdDisplaySetup, updateAdDisplaySetup } from "./ad_dislay_setup_slice";

export const AdDisplayModal = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const adDisplyData = useSelector((state) => state.adDisplyData); 
  const [disabled, set_disabled] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();
 
  const [group_data, set_group_data] = useState({
    display_id:0,
    display_name: '',
    group_lang: '',
  })


  useEffect(() => {
    if (data) {
        // console.log(data) 
      set_group_data({
        display_name: getValueByLang(data.display_name||"{}"),
        group_lang: localStorage.i18nextLng ||"en",
        display_id: data.display_id
      }); 
    } 
  }, [data]);

  const SubmitForm = (values) => {
    var datad = {  };
    var display_name = {  };
    add ? "" : datad['display_id'] = values.display_id||0;  
    display_name[values.group_lang] = values.display_name; 
    datad.display_name = JSON.stringify(display_name); 
    dispatch(add ? saveAdDisplaySetup(datad): updateAdDisplaySetup(datad)); 
  };

  const validate = (Values) => {
    let errors = {};

    if (!Values.display_name) {
      errors.display_name = t("err_msg_display_name");
    } else if (Values.display_name.length > 260) {
      errors.display_name = t("err_260_legnth");
    }

    if (!Values.group_lang) {
      errors.group_lang = t("err_msg_lang");
    }
    return errors;
  };

  useEffect(() => {
    if (adDisplyData.addUpdateLoading == "succeeded") {
      formRef.current.resetForm(); 
      setTimeout(() => {setOpen(false);}, 3000);
    } 
  }, [adDisplyData.addUpdateLoading]);

  return (<>
    <Modal
      md={4}
      sm={8}
      xs={12}
      title={add ? t("ad_display") : t("up_display")}
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
                        data && setFieldValue("display_name", getValueByLang(data?.display_name, e.target.value))
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
                        adDisplyData?.langlist?.map((d, i)=><option key={i} value={d.language_code}>{d.language_name}</option>)
                      } 
                    </Select>
                    {
                      errors.group_lang && touched.group_lang ? <ErrLabel>{errors.group_lang}</ErrLabel> : null
                    }
                    <Label color="cardfont">{t("display_name")}</Label>
                    <Input
                      app="true"
                      type="text"
                      width="100%"
                      name="display_name"
                      placeholder={t("display_name")}
                      value={values.display_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {
                      errors.display_name && touched.display_name ? <ErrLabel>{errors.display_name}</ErrLabel> : null
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
