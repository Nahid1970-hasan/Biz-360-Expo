import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Modal } from "../../component/Modal";
import { Input } from "../../component/style/styled_input";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { langs } from "../../utils/helper";
import {  updateBizUser } from "./profile_slice";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";

export const ProfileUserModal = ({ add,
    open,
    setOpen = () => { },
}) => {
    const user = useSelector((state) => state.bizprofile);

    const { t, i18n } = useTranslation();
    const [username, setUsername] = useState('');
    const [user_url, set_user_url] = useState('');
    const [disabled, set_disabled] = useState(false);
    const [default_lang, setDefault_lang] = useState('');
    const [update_user_id, setUpdate_user_id] = useState('');
    const data = user?.profile?.user;
    const dispatch = useDispatch();
    const formRef = useRef();

    const [main_data, set_main_data] = useState({
        update_user_id: 0,
        username: '',
        user_url:'',
        default_lang:'',
        main_lang: 0,
    })


    useEffect(() => {
        if (data) {
            // console.log(data)
            set_main_data({
                main_lang: localStorage.i18nextLng || "en",
                update_user_id: data.update_user_id,
                username: data.username,
                user_url: data.user_url,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        datad.update_user_id = localStorage.user_id ||0;
        datad.username = values.username || "";
        datad.user_url = values.user_url || "";
        datad.default_lang = values.default_lang || "";
        dispatch(updateBizUser(datad));
    };

    const validate = (Values) => {
        let errors = {};

        // if (!Values.default_lang) {
        //     errors.default_lang = t("err_msg_default_lang");
        // } else if (Values.default_lang.length > 20) {
        //     errors.default_lang = t("err_20_legnth");
        // }
        if (!Values.user_url) {
            errors.user_url = t("err_msg_user_url");
        } else if (Values.user_url.length > 20) {
            errors.user_url = t("err_20_legnth");
        }

      

        return errors;
    };
    useEffect(() => {
        if (user.updateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [user.updateLoading]);

    return <>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={ t("update_profile")}
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

                                    <Flex md={12}>
                                        <InfoCard>
                                            <Typography fntsize="cardSubTitleFontSize"  fntweight="bold">
                                                {t("user")}
                                            </Typography>
                                            <ULine />

                                            <Label>{t("language")} </Label>
                                            <Select
                                                app="true"
                                                name="default_lang"
                                                width="100%"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.default_lang || 0}
                                            >
                                                <option disabled value={0}>
                                                    {t("ph_select_val")}
                                                </option>
                                                {
                                                    user?.user?.map((d, i) => <option key={i} value={d.default_lang}>{d.default_lang}</option>)
                                                }
                                            </Select>
                                            {
                                                errors.main_lang && touched.main_lang ? <ErrLabel>{errors.main_lang}</ErrLabel> : null
                                            }

                                            <Label>{t("user_url")}</Label>
                                            <Input
                                                app="true"
                                                type="text"
                                                width="100%"
                                                name="user_url"
                                                placeholder={t("user_url")}
                                                value={values.user_url || ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {
                                                errors.user_url && touched.user_url ? <ErrLabel>{errors.user_url}</ErrLabel> : null
                                            }
                                        </InfoCard>
                                    </Flex>
                                 
                                    <Flex md={12} padding="10px 10px 0 0 !important">
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

}