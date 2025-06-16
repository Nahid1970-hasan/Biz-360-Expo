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
import { saveCompanyInfoData } from "./biz_company_info_slice";

export const CompanyInfoModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizcompanyinfo = useSelector((state) => state.bizcompanyinfo);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [sub_data, set_sub_data] = useState({
        comp_id:0,
        company_name: '',
        short_name: '',
        address: '',
        mobile: '',
        email: '',
        web: '',
        slogan: ''
    })


    useEffect(() => {
        if (data) {
            set_sub_data({
                main_lang: localStorage.i18nextLng || "en",
                company_name: data.company_name,
                comp_id: data.comp_id,
                address: data.address,
                short_name: data.short_name,
                mobile: data.mobile,
                email: data.email,
                web: data.web,
                slogan: data.slogan,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        datad.comp_id = bizcompanyinfo?.compInfo?.comp_id|| 0;
        datad.company_name = values.company_name || "";
        datad.address = values.address || "";
        datad.short_name = values.short_name || "";
        datad.mobile = values.mobile || "";
        datad.email = values.email || "";
        datad.web = values.web || "";
        datad.slogan = values.slogan || "";
        dispatch(saveCompanyInfoData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.company_name) {
            errors.company_name = t("err_msg_company_name");
        } else if (Values.company_name.length > 260) {
            errors.company_name = t("err_260_legnth");
        }


        if (!Values.short_name) {
            errors.short_name = t("err_msg_short_name");
        }


        return errors;
    };

    useEffect(() => {
        if (bizcompanyinfo.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [bizcompanyinfo.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("add_cmp_info")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={sub_data}
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

                                        <Label>{t("company_name")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="company_name"
                                            placeholder={t("company_name")}
                                            value={values.company_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.company_name && touched.company_name ? <ErrLabel>{errors.company_name}</ErrLabel> : null
                                        }
                                        <Label>{t("short_name")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="short_name"
                                            placeholder={t("short_name")}
                                            value={values.short_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.short_name && touched.short_name ? <ErrLabel>{errors.short_name}</ErrLabel> : null
                                        }

                                        <Label>{t("address")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="address"
                                            placeholder={t("address")}
                                            value={values.address || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Label>{t("mobile")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="mobile"
                                            placeholder={t("mobile")}
                                            value={values.mobile || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        <Label>{t("email")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="email"
                                            placeholder={t("email")}
                                            value={values.email || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Label>{t("web")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="web"
                                            placeholder={t("web")}
                                            value={values.web || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Label>{t("slogan")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="slogan"
                                            placeholder={t("slogan")}
                                            value={values.slogan || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Flex>
                                    <Flex md={8} padding="0 10px 0 0 !important">
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
