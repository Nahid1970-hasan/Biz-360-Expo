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
import { CATFORLIST, getValueByLang } from "../../utils/helper"; 

export const BIZTempMenuFormModalPage = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizMainCatgData = useSelector((state) => state.bizmaincatgdata);
    const bizSubCatgFrmData = useSelector((state) => state.bizsubcatgdata);
    const [disabled, set_disabled] = useState(false);

    const formRef = useRef();
    const dispatch = useDispatch();

    const [sub_data, set_sub_data] = useState({
        sub_id: 0,
        sub_name: '',
        main_id: 0,
        type_id: '',
        sub_lang: 0,
        keywords: "",
    })


    useEffect(() => {
        if (data) {
            set_sub_data({
                sub_name: getValueByLang(data.sub_name || "{}"),
                sub_lang: localStorage.i18nextLng || "en",
                main_id: data.main_id,
                sub_id: data.sub_id,
                type_id: data.sub_type,
                keywords: data.keywords
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var sub_name = {};
        add ? "" : datad['sub_id'] = values.sub_id || 0;
        sub_name[values.sub_lang] = values.sub_name;
        datad.sub_name = JSON.stringify(sub_name);
        datad.main_id = values.main_id || 0;
        datad.sub_type = values.type_id || 0;
        datad.keywords = values.keywords || "";
        dispatch(add ? saveBIZSubData(datad) : updateBIZSubData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.sub_name) {
            errors.sub_name = t("err_msg_sub_catg_name");
        } else if (Values.sub_name.length > 260) {
            errors.sub_name = t("err_260_legnth");
        }
        if (!Values.keywords) {
            errors.keywords = t("err_msg_kewword");
        } else if (Values.keywords.length > 300) {
            errors.keywords = t("err_300_legnth");
        }

        if (!Values.sub_lang) {
            errors.sub_lang = t("err_msg_lang");
        }

        if (!Values.type_id) {
            errors.type_id = t("err_msg_sub_type");
        }


        return errors;
    };

    useEffect(() => {
        if (bizSubCatgFrmData.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [bizSubCatgFrmData.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_biz_sub_catg") : t("update_biz_sub_catg")}
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
                                    <Flex md={8} padding="0 10px 0 0 !important">
                                        {
                                            add ? <></> : <Label fntsize="bodyTitleFontSize">{t("main_catg_name : ")} {getValueByLang(data?.main_name || "{}", values.sub_lang || "en")} </Label>
                                        }
                                        <Label>{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="sub_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("sub_name", getValueByLang(data?.sub_name, e.target.value));
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            value={values.sub_lang || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                bizMainCatgData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.sub_lang && touched.sub_lang ? <ErrLabel>{errors.sub_lang}</ErrLabel> : null
                                        }

                                        {
                                            add ? <><Label>{t("main_catg_name")} </Label>
                                                <Select
                                                    app="true"
                                                    name="main_id"
                                                    width="100%"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={!add}
                                                    value={values.main_id || 0}
                                                >
                                                    <option disabled value={0}>
                                                        {t("ph_select_val")}
                                                    </option>
                                                    {
                                                        bizMainCatgData?.list?.map((d, i) => <option key={i} value={d.main_id}>{getValueByLang(d.main_name || "{}", values.sub_lang)}</option>)
                                                    }
                                                </Select>
                                                {
                                                    errors.main_id && touched.main_id ? <ErrLabel>{errors.main_id}</ErrLabel> : null
                                                }</> : <></>
                                        }

                                        <Label>{t("sub_catg_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="sub_name"
                                            placeholder={t("sub_name")}
                                            value={values.sub_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.sub_name && touched.sub_name ? <ErrLabel>{errors.sub_name}</ErrLabel> : null
                                        }
                                        <Label>{t("catg_for")} </Label>
                                        <Select
                                            app="true"
                                            name="type_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.type_id || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                CATFORLIST?.map((d, i) => <option key={i} value={d.type_id}>{d.type_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.type_id && touched.type_id ? <ErrLabel>{errors.type_id}</ErrLabel> : null
                                        }

                                        <Label>{t("keywords")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="keywords"
                                            placeholder={t("keywords")}
                                            value={values.keywords || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.keywords && touched.keywords ? <ErrLabel>{errors.keywords}</ErrLabel> : null
                                        }
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
