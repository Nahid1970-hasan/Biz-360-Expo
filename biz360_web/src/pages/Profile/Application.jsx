
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordEdit } from "../../features/changePassword/changePassword_slice";
import { initLoader } from "../memberTemplate/inv_biz_temp_slice";
import { Toast } from "../../component/Toast";
import { Flex } from "../../component/style/styled_flex";
import { Loading } from "../../component/Loading";
import { loadPage } from "../../features/page/page_slice";
import { Typography } from "../../component/style/styled_typography";
import { InfoCard } from "../../component/style/styled_card";

export const ApplicationPage = () => {
    const changePassword = useSelector(state => state.changePassword);
    const [disabled, set_disabled] = useState(false);
    const dispatch = useDispatch();
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        dispatch(loadPage({ title: 'application' }))
    }, []);

    const initData = {
        current_password: "",
        password: "",
        new_password: "",
    };
    const validate = (values) => {
        let errors = {};

        return errors;
    };
    const submitForm = (values) => {
        var data = {
            current_password: values.current_password,
            password: values.new_password
        }
        dispatch(changePasswordEdit(data));

    };

    useEffect(() => {
        if (changePassword.loading == "pending") {
            setIsLoading(true);
        } else if (changePassword.loading == "succeeded") {
            formRef.current.resetForm(); setIsLoading(false);
            setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
        } else if (changePassword.loading != "idle") {
            setIsLoading(false);
            setTimeout(() => { dispatch(initLoader()); set_disabled(false); }, 5000);
        }
    }, [changePassword.loading]);

    return (
        <>
            {(changePassword.loading == "idle" || changePassword.loading == "pending") ? <></> : (
                changePassword.loading == "succeeded" ? (
                    <Toast msg={changePassword.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={changePassword.msg} />
                )
            )}

            <Formik
                initialValues={initData}
                validate={validate}
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
                            <Flex row="true">
                                <Flex md={12} padding="10px 0!important">
                                    <InfoCard background="aboutTitle">
                                        <Typography fntsize="bodyHeader" fntweight="bold">
                                            {t("application")}
                                        </Typography>
                                    </InfoCard>
                                </Flex>
                            </Flex>
                        </div>
                    );
                }}
            </Formik>


            <Loading open={isLoading} />
        </>
    );
};
