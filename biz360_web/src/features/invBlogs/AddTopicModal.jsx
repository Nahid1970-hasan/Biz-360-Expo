import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { TextArea } from "../../component/style/styled_textarea";
import { Toast } from "../../component/Toast";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { CardHeaderButton } from "../../component/style/styled_card";
import { Button } from "../../component/style/styled_button";
import { Label } from "../../component/style/styled_label";
import { saveInvBlogsData ,initLoader } from "./inv_blogs_Slice";
import { t } from "i18next";


export const AddTopicModal = ({
  open,
  setOpen = () => { },
  data,
}) => {
  const dispatch = useDispatch();
  const invblogs = useSelector((state) => state.invblogs);
  const [disabled, set_disabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const initialValues = {
    blog_detail: "",
    user_id:0,
    blog_date:""
  };

  const CustInput = styled(TextArea)`
  margin-left: 5px;
  padding: 2px 7px;
  margin-top: -5px;
  min-width: auto;
  min-height:120px;
`;

  const validate = (values) => {

    let errors = {};
    if (!values.blog_detail) {
      errors.blog_detail = t("cont_required");
    }
    if (values.blog_detail.length < 10) {
      errors.blog_detail = t("cont_small");
    }
    return errors;
  };

  const handleSubmit = (values) => {
    dispatch(saveInvBlogsData(values)); 
  };
  useEffect(() => {
     if (invblogs.addUpdateLoading == "succeeded") {
      set_disabled(false); 
      setTimeout(() => { dispatch(initLoader()); setOpen(false)}, 5000);
    } else if (invblogs.addUpdateLoading != "idle") { 
      formRef.current.resetForm(); setTimeout(() => { dispatch(initLoader ()); set_disabled(false); }, 5000);
    }
  }, [invblogs.addUpdateLoading]);

  return (
    <>
      {(invblogs.addUpdateLoading == "idle" || invblogs.addUpdateLoading == "pending") ? <></> : (
        invblogs.addUpdateLoading == "succeeded" ? (
          <Toast msg={invblogs.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={invblogs.msg} />
        )
      )}

      <Modal
        md={4}
        sm={6}
        xs={10}
        title={t("add_topic")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          innerRef={formRef}
        // handleChange={onchangeForm}
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
                  <CardHeaderButton>
                    <Button
                      color="error"
                      fontColor="barFont"
                      type="reset"
                      onClick={resetForm}
                    >
                      {t("reset")}
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)|| disabled}
                    >
                      {t("submit")}
                    </Button>
                  </CardHeaderButton>

                  <Label color="cardFont"> {t("content")}
                  </Label>
                  <CustInput
                    app
                    type="text"
                    name="blog_detail"
                    placeholder={t("content_text")}
                    value={values.blog_detail}
                    onBlur={handleBlur}
                    color={errors.blog_detail && touched.blog_detail ? "error" : null}
                    onChange={handleChange}
                  />
                  {
                    errors.blog_detail && touched.blog_detail ? <Label>{errors.blog_detail}</Label> : null
                  }
                </form>
              </div>
            );

          }}
        </Formik>

      </Modal> 
    </>
  );
};
