
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardBody, CardHeaderButton } from "../../component/style/styled_card";
import DataGrid from "../../component/DataGrid";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Select } from "../../component/style/styled_select";
import { useEffect, useState } from "react";
import { getValueByLang, STATUSLIST } from "../../utils/helper";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Formik } from "formik";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { updateOrderData } from "./member_temp_order_slice";
import { Input } from "../../component/style/styled_input";

export const UpdateCusOrder = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const mOrderData = useSelector((state) => state.memberorderdata);
    const { t, i18n } = useTranslation();
    const [courier_id, set_courier] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        courier_id: 0,
        order_id: 0,
        courier_name: "",
        delivery_status: "Pending",
        delivery_name: "",
        received_amount: "",
        payment_method: ""
    });

    useEffect(() => {
        if (data) {
            setUserData({
                courier_id: 0,
                order_id: data.order_id || 0,
                delivery_status: data?.delivery_status?.label || "",
                received_amount: data?.order_total_price || "",
                payment_method: ""
            });
        }
    }, [data]);
    const SubmitForm = (values) => {
        var datad = {
            "order_id": values.order_id,
            "payment_method": values.payment_method,
            "received_amount": values.received_amount,
            "delivery_status": values.delivery_status,
            "delivery_name": values.delivery_status == "Booked" ? getValueByLang(values.delivery_name, "en") : "",
        };
        dispatch(updateOrderData(datad));
    };

    const validate = (Values) => {
        let errors = {};
        if (!Values.delivery_status) {
            errors.delivery_status = t("err_status");
        }
 
        if (Values.delivery_status == "Booked") {
            if (!Values.courier_id) {
                errors.courier_id = t("err_msg_courier_name");
            } else if (Values.courier_id.length > 260) {
                errors.courier_id = t("err_260_legnth");
            }
            if (!Values.received_amount) {
                errors.received_amount = t("err_received_amount");
            }else if(Values.received_amount > data.order_total_price) {
                errors.received_amount = t("err_received_amount_size");
            }
    
            if (!Values.payment_method) {
                errors.payment_method = t("err_payment_method");
            }
        }
        return errors;
    };


    useEffect(() => {
        if (mOrderData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [mOrderData.addUpdateLoading]);



    return (<>
        <Modal
            md={4}
            sm={12}
            xs={12}
            title={t("up_order")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={userData}
                validate={validate}
                onSubmit={SubmitForm}
                // innerRef={formRef}
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
                                    <Flex md={12} padding=" 0 20px !important"> 
                                        <Label >
                                            {t("status")}
                                        </Label>
                                        <Select
                                            app="true"
                                            width="100%"
                                            name="delivery_status"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.delivery_status || "Pending"}
                                        >
                                            <option disabled value="Pending">
                                                {t("pending")}
                                            </option>
                                            {
                                                STATUSLIST?.map((d, i) => <option key={i} value={d.status_id}> {d.status_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.delivery_status && touched.delivery_status ? <ErrLabel>{errors.delivery_status}</ErrLabel> : null
                                        }

                                        {
                                            values.delivery_status == "Booked" ?
                                                <>
                                                    <Label>{t("courier_name")}  </Label>
                                                    <Select
                                                        app="true"
                                                        width="100%"
                                                        name="courier_id"
                                                        onChange={(e) => {
                                                            var sid = e.target.value;
                                                            var slData = mOrderData?.cList.find((d) => d.courier_id == sid);
                                                            setFieldValue("delivery_name", slData?.courier_name);
                                                            formik.handleChange(e);
                                                        }}
                                                        onBlur={handleBlur}
                                                        value={values.courier_id || 0}
                                                    >

                                                        <option disabled value={0}>
                                                            {t("ph_select")}
                                                        </option>
                                                        {
                                                            mOrderData?.cList?.map((d, i) => <option key={i} value={d.courier_id}> {getValueByLang(d.courier_name || "{}")}</option>)
                                                        }
                                                    </Select>
                                                    {
                                                        errors.courier_id && touched.courier_id ? <ErrLabel>{errors.courier_id}</ErrLabel> : null
                                                    }
                                                     <Label>{t("order_price")}  </Label>
                                                    <Input
                                                        app="app"
                                                        type="text" 
                                                        value={data.order_total_price ||  ""}
                                                        disabled="disabled"
                                                    />
                                                  
                                                    <Label>{t("received_amount")}  </Label>
                                                    <Input
                                                        app="true"
                                                        type="text"
                                                        name="received_amount"
                                                        placeholder="search value"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.received_amount ||  ""}
                                                    />
                                                    {
                                                        errors.received_amount && touched.received_amount ? <ErrLabel>{errors.received_amount}</ErrLabel> : null
                                                    }
                                                    <Label>{t("payment_method")}  </Label>
                                                    <Select
                                                        app="true"
                                                        width="100%"
                                                        name="payment_method"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.payment_method || 0}
                                                    >

                                                        <option disabled value={0}>
                                                            {t("ph_select")}
                                                        </option>
                                                        <option value={"bKash"}>{"bKash"}</option>
                                                        <option value={"Nagad"}>{"Nagad"}</option>
                                                        <option value={"Rocket"}>{"Rocket"}</option>
                                                    </Select>
                                                    {
                                                        errors.payment_method && touched.payment_method ? <ErrLabel>{errors.payment_method}</ErrLabel> : null
                                                    }
                                                </> : <></>}

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
    );
};
