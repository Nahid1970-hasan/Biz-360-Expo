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
import { getValueByLang, MENUPOSLIST } from "../../utils/helper";
import { saveBIZTempMenuData, updateBIZTempMenuData } from "./biz_template_menu_slice";
import { Select } from "../../component/style/styled_select";

export const BIZTempModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const biztempmenudata = useSelector((state) => state.biztempmenudata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [sub_data, set_sub_data] = useState({
        menu_id: 0,
        menu_name: '',
        menu_position: '',
        menu_type: '',
        page_name: '',
    })


    useEffect(() => {
        if (data) {
            set_sub_data({
                main_lang: localStorage.i18nextLng || "en",
                menu_name: getValueByLang(data.menu_name || "{}"),
                menu_id: data.menu_id,
                menu_type: data.menu_type,
                page_name: data.page_name,
                menu_position: data.menu_position
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var menu_name = {};
        add ? "" : datad['menu_id'] = values.menu_id || 0;
        menu_name[values.main_lang] = values.menu_name;
        datad.menu_name = JSON.stringify(menu_name);
        datad.menu_type = values.menu_type || "";
        datad.menu_position = values.menu_position || "";
        datad.page_name = values.page_name || "";
        dispatch(add ? saveBIZTempMenuData(datad) : updateBIZTempMenuData(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.menu_name) {
            errors.menu_name = t("err_msg_menu_name");
        } else if (Values.menu_name.length > 260) {
            errors.menu_name = t("err_260_legnth");
        }
        if (!Values.page_name) {
            errors.page_name = t("err_page_name");
        } else if (
            !/^[a-z0-9-]+$/.test(Values.page_name)
        ) {
            errors.page_name = t("err_page_name_invalid");
        }


        if (!Values.menu_type) {
            errors.menu_type = t("err_msg_menu_type");
        }

        if (!Values.menu_position) {
            errors.menu_position = t("err_msg_menu_position");
        }

        if (!Values.main_lang) {
            errors.main_lang = t("err_msg_lang");
        }


        return errors;
    };

    useEffect(() => {
        if (biztempmenudata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [biztempmenudata.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_biz_menu") : t("update_biz_menu")}
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

                                <Flex row="row" >
                                    <Label color="cardfont">{t("language")} </Label>
                                    <Select
                                        app="true"
                                        name="main_lang"
                                        width="100%"
                                        onChange={(e) => {
                                            data && setFieldValue("menu_name", getValueByLang(data?.menu_name, e.target.value))
                                            formik.handleChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        // value={add?"DEFAULT":values.status}
                                        value={values.main_lang || 0}
                                    >

                                        <option disabled value={0}>
                                            {t("ph_select_val")}
                                        </option>
                                        {
                                            biztempmenudata?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                        }
                                    </Select>
                                    {
                                        errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                    }
                                    <Flex md={12} padding="0 10px 0 0 !important">

                                        <Label>{t("menu_name")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="menu_name"
                                            placeholder={t("menu_name")}
                                            value={values.menu_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.menu_name && touched.menu_name ? <ErrLabel>{errors.menu_name}</ErrLabel> : null
                                        }
                                        <Label>{t("menu_type")} </Label>
                                        {/* <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="menu_type"
                                            placeholder={t("menu_type")}
                                            value={values.menu_type || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        /> */}
                                        <Select
                                            app="true"
                                            name="menu_type"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.menu_type || ""}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Advance">Advance</option>
                                        </Select>
                                        {
                                            errors.menu_type && touched.menu_type ? <ErrLabel>{errors.menu_type}</ErrLabel> : null
                                        }

                                        <Label>{t("menu_position")} </Label>
                                        <Select
                                            app="true"
                                            name="menu_position"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.menu_position || ""}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}</option>
                                            {
                                                MENUPOSLIST?.map((d, i) => <option key={i} value={d.id}>{d.value}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.menu_position && touched.menu_position ? <ErrLabel>{errors.menu_position}</ErrLabel> : null
                                        }

                                        <Label>{t("page_name")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="page_name"
                                            placeholder={t("page_name")}
                                            value={values.page_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.page_name && touched.page_name ? <ErrLabel>{errors.page_name}</ErrLabel> : null
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
