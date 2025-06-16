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
import { saveMTempMenuNameData } from "./inv_biz_temp_hd_slice";
import { saveMTempFooterData, saveMTempFTMenuData } from "./inv_biz_temp_ft_slice";

export const MUpTempNavMenuModalPage = ({
    type,
    open,
    setOpen = () => { },
    data,
}) => {
    const invBizTempHDData = useSelector((state) => state.invbiztemphddata);
    const invBizTempFTData = useSelector((state) => state.invbiztempftdata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();
    const [langList, setLangList] = useState([]);
    const [main_data, set_main_data] = useState({
        menu_id: 0,
        menu_name: "",
        user_menu_name:"",
        visible: 0,
        group_id: 0,
    })


    useEffect(() => {
        if (data) {
            setLangList(data?.languageList || [])
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                menu_id: data?.rowdata?.menu_id || 0,
                group_id: data?.rowdata?.group_id || 0,
                menu_name: getValueByLang(data?.rowdata?.menu_name || "{}"),
                user_menu_name: getValueByLang(data?.rowdata?.user_menu_name || "{}"),
                visible: data?.rowdata?.visible == 1 ? "yes" : "no"
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var user_menu_name = {};
        datad.group_id = values?.group_id || 0,
        datad.menu_id = values.menu_id || 0;
        datad.visible = values.visible == "yes" ? 1 : 0;
        user_menu_name[values.main_lang] = values.user_menu_name;
        datad.user_menu_name = JSON.stringify(user_menu_name);
        dispatch(type=="header"?saveMTempMenuNameData(datad):saveMTempFTMenuData(datad));
    };

    const validate = (values) => {
        let errors = {};
        if (!values.user_menu_name) {
            errors.user_menu_name = t("err_msg_nemu_name");
        }
        if (!values.visible) {
            errors.visible = t("err_msg_visibility");
        }
        return errors;
    };

    useEffect(() => {
        if (invBizTempHDData.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [invBizTempHDData.addUpdateLoading]);

    useEffect(() => {
        if (invBizTempFTData.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [invBizTempFTData.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t(type=="header"?"update_template_header_menu":"update_template_footer_menu")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={main_data}
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

                                        <Label>{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="main_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("menu_name", getValueByLang(data?.rowdata?.menu_name || "{}", e.target.value));
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            value={values.main_lang || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                        }

                                        <Label>{t("menu_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="menu_name" 
                                            value={values.menu_name || ""} 
                                            disabled
                                        /> 
                                        <Label>{t("user_menu")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="user_menu_name"
                                            placeholder={t("user_menu_name")}
                                            value={values.user_menu_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.user_menu_name && touched.user_menu_name ? <ErrLabel>{errors.user_menu_name}</ErrLabel> : null
                                        }

                                        <Label>{t("visible")} </Label>
                                        <Select
                                            app="true"
                                            name="visible"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.visible || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            <option value="yes">{t('yes')}</option>
                                            <option value="no">{t('no')}</option>
                                        </Select>
                                        {
                                            errors.visible && touched.visible ? <ErrLabel>{errors.visible}</ErrLabel> : null
                                        }

                                    </Flex>
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        <CardHeaderButton top="10px">
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
