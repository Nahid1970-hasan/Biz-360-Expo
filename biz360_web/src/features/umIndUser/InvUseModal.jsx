
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { Select } from "../../component/style/styled_select";
import { Loading } from "../../component/Loading";
import { useTranslation } from "react-i18next";
import { updateINDUserData } from "./ind_user_slice";

export const InvUseModal = ({ add, open, setOpen = () => { }, data }) => {
    const [user_id, set_user_id] = useState(0);
    const IndUsersdata = useSelector((state) => state.indusersdata);
    const [disabled, set_disabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState({
        user_id: "",
        profession: "",
        email: "",
        mobile: "",
        username: "",
        fullname: "",
        language_name: "",
        designation: "",
        default_lang: "",
        status: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
       
        if (data) {
            setUserData({
                main_lang: localStorage.i18nextLng || "en",
                user_id: data?.user_id,
                username: data?.username,
                fullname: data?.fullname,
                email: data?.email,
                mobile: data?.mobile,
                designation: data?.designation,
                default_lang: data?.default_lang,
                status: data?.status?.label,
                profession: data?.profession,
                language_name: data?.language_name
            });
        }
    }, [data]);

    const validate = (values) => {
        let errors = {};
       
        if (!values.status) {
            errors.status = t("err_status");
        }
        return errors;
    };

    const submitForm = (values) => {
        var datad = {};
        datad['update_user_id'] = values.user_id || 0;
        datad.status = values.status || "";
        dispatch( updateINDUserData(datad));

    };


    useEffect(() => {
        if (IndUsersdata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [IndUsersdata.addUpdateLoading]);


    return (
        <>
            <Modal
                md={4}
                sm={8}
                xs={12}
                title={t("update_user")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Formik
                    initialValues={userData}
                    validate={validate}
                    onSubmit={submitForm}
                    innerRef={formRef}
                    enableReinitialize
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
                            setFieldValue,
                            resetForm,
                        } = formik;

                        return (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Flex row="row">
                                        <Flex md={12} padding="0 0 10px 10px!important">
                                            <Label >
                                                {t("status")}
                                            </Label>
                                            <Select
                                                app="true"
                                                width="100%"
                                                name="status"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status || ""}
                                            >
                                                <option disabled value="">
                                                    {t("ph_sel_type")}
                                                </option>
                                                <option value="RegRequest">RegRequest</option>
                                                <option value="Verified">Verified</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Blocked">Blocked</option>
                                                <option value="Canceled">Canceled</option>
                                            </Select>
                                            {errors.status && touched.status ? (
                                                <ErrLabel>{errors.status}</ErrLabel>
                                            ) : null}
                                        </Flex>
                                    </Flex>
                                    <CardHeaderButton>
                                        <AlertButton
                                            type="reset"
                                            onClick={resetForm}
                                        >
                                            {t("reset")}
                                        </AlertButton>
                                        <PrimaryButton
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid)}
                                        >
                                            {t("update")}
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            </Modal>
            <Loading open={isLoading} />
        </>
    );
};
