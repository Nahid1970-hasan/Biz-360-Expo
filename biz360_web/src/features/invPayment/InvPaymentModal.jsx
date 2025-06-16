
import { t } from "i18next";

import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { saveInvPayment, updateInvPayment } from "./inv_payment_Slice";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { Flex } from "../../component/style/styled_flex";
import { ErrLabel, Label, RedMark } from "../../component/style/styled_label";
import { Typography, ULine } from "../../component/style/styled_typography";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { checkNumber, getValueByLang, PAYMETHODLIST } from "../../utils/helper";
import { TextArea } from "../../component/style/styled_textarea";
import { saveMemberInvoicePayment } from "../memInvoice/member_invoice_slice";

export const InvPaymentModal = ({ add, open, setOpen = () => { }, data, }) => { 
    const invoiceData= useSelector((state) => state.meminvoicedata);
    const [payment_id, set_payment_id] = useState(0);
    const [invoice_id, set_invoice_id] = useState("");
    const formRef = useRef();
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);
    const [init_data, set_init_data] = useState({
        payment_id: 0,
        invoice_no: "",
        payment_method: "",
        payment_type: "Manual",
        transaction_no: "",
        account_no: "",
        payment_date: DateTime.now().toFormat('yyyy-MM-dd'),
        amount: "",
        payment_notes: ""
    })

    useEffect(() => {
        if (data) {
            set_init_data({
                "amount": data?.net_amount || 0,
                "invoice_id": data.invoice_id||0,
                "invoice_no": data?.invoice_no,
                "payment_status": data?.payment_status || "",
                "account_no": data?.account_no || "",
                "payment_type": "Manual",
                "payment_date": data?.payment_date || "",
                "payment_method": data?.payment_method || "",
                "transaction_no": data?.transaction_no || "",
                "payment_notes": data?.payment_notes || "",
            }); 
        }

    }, [data]);

    const SubmitForm = (values) => {
        var payData = {
            "amount": values?.amount || 0,
            "invoice_id": values.invoice_id,
            "invoice_no": parseInt(values?.invoice_no),
            "payment_status": values?.payment_status || "",
            "account_no": values?.account_no || "",
            "payment_type": "Manual",
            "payment_date": values?.payment_date || "",
            "payment_method": values?.payment_method || "",
            "transaction_no": values?.transaction_no || "",
            "payment_notes": values?.payment_notes || "",
        }
        dispatch(saveMemberInvoicePayment(payData));
       // set_disabled(true);
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.invoice_no) {
            errors.invoice_no = t("err_invoice_no");
        }

        if (!Values.payment_method) {
            errors.payment_method = t("err_payment_method");
        }

        if (!Values.account_no) {
            errors.account_no = t("err_account_mobile_no");
        }

        if (!Values.payment_date) {
            errors.payment_date = t("err_payment_date");
        }

        if (!Values.amount) {
            errors.amount = t("err_amount");
        }

        if (Values.payment_notes) {
            if (Values.payment_notes.length > 99) {
                errors.payment_notes = t("err_100_legnth");
            }
        }
        return errors;
    };


    useEffect(() => {
        if (invoiceData.payLoading == "succeeded") { 
            setTimeout(() => { set_disabled(false); setOpen(false) }, 4000);
        } else if (invoiceData.payLoading == "failed") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [invoiceData.payLoading]);

    function clearForm() {
        set_init_data({
            payment_id: "",
            invoice_no: "",
            payment_method: "",
            payment_type: "Manual",
            transaction_no: "",
            account_no: "",
            payment_date: DateTime.now().toFormat('yyyy-MM-dd'),
            amount: "",
            payment_notes: ""
        })
    }

    return (<>
        <Modal
            md={6}
            sm={8}
            xs={12}
            title={add ? t("add_pay_info") : t("update_pay_info")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >

            <Formik
                initialValues={init_data}
                validate={validate}
                enableReinitialize
                onSubmit={SubmitForm}
                innerRef={formRef}
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
                        setFieldValue,
                    } = formik;

                    return (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <Flex row="row">
                                    <Flex md={6} sm={6} xs={12}>
                                        <Label >{("invoice_no")}<RedMark>*</RedMark> </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            name="invoice_no"
                                            placeholder={("ph_invoice_no")}
                                            value={values.invoice_no || ""}
                                            maxLength={12}
                                            disabled={"disabled"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.invoice_no && touched.invoice_no ? <ErrLabel>{errors.invoice_no}</ErrLabel> : null
                                        }
                                    </Flex>
                                    <Flex md={6} sm={6} xs={12}>
                                        <Label >{("payment_amount")} <RedMark>*</RedMark> </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            onKeyDown={(event) => {
                                                if (!checkNumber(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            name="amount"
                                            disabled={'disabled'}
                                            placeholder={("ph_payment_amount")}
                                            value={values.amount || ""}
                                            maxLength={4}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.amount && touched.amount ? <ErrLabel>{errors.amount}</ErrLabel> : null
                                        }
                                    </Flex>
                                </Flex> 
                                <Flex row="row">
                                    <Flex md={6} sm={6} xs={12}> 
                                        <Label >{("payment_method")} <RedMark>*</RedMark> </Label>
                                        <Select
                                            app="app"
                                            width="100%"
                                            name="payment_method"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.payment_method || ""}
                                        >

                                            <option disabled value=""> {t("ph_select")}
                                            </option>
                                            {
                                                invoiceData?.payMethod?.map((d, i) => <option key={i} value={getValueByLang(d, 'en')}>{getValueByLang(d)}</option>)
                                            }

                                        </Select>
                                        {
                                            errors.payment_method && touched.payment_method ? <ErrLabel>{errors.payment_method}</ErrLabel> : null
                                        }

                                        <Label >{("account_mobile_no")} <RedMark>*</RedMark> </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            name="account_no"
                                            placeholder={("ph_account_mobile_no")}
                                            value={values.account_no || ""}
                                            maxLength={18}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.account_no && touched.account_no ? <ErrLabel>{errors.account_no}</ErrLabel> : null
                                        }
                                    </Flex>
                                    <Flex md={6} sm={6} xs={12}>
                                        <Label >{("payment_date")} <RedMark>*</RedMark> </Label>

                                        <Flatpickr
                                            readOnly
                                            options={{
                                                dateFormat: "Y-m-d",
                                                maxDate: DateTime.now().toFormat("yyyy-MM-dd")
                                            }}
                                            value={values.payment_date}
                                            onChange={(e, str) => {
                                                setFieldValue('payment_date', str)
                                            }}
                                            render={({ defaultValue, value, ...props }, ref) => {
                                                return (
                                                    <Input
                                                        app="true"
                                                        {...props}
                                                        type="text"
                                                        name="payment_date"
                                                        placeholder={("ph_payment_date")}
                                                        value={values.payment_date || ""}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        color={errors.payment_date && touched.payment_date ? "error" : null}
                                                        ref={ref}
                                                    />
                                                );
                                            }}
                                        />
                                        {
                                            errors.payment_date && touched.payment_date ? <ErrLabel>{errors.payment_date}</ErrLabel> : null
                                        }
                                        <Label >{("transaction_id")} </Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            name="transaction_no"
                                            placeholder={("ph_transaction_id")}
                                            value={values.transaction_no || ""}
                                            onChange={handleChange}
                                            maxLength={20}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.transaction_no && touched.transaction_no ? <ErrLabel>{errors.transaction_no}</ErrLabel> : null
                                        } 
                                    </Flex>
                                    <Flex padding="0 10px !important" md={11.99} sm={12} xs={12}>
                                        <Label >{("payment_note")} </Label>
                                        <TextArea
                                            app="true"
                                            type="text"
                                            name="payment_notes"
                                            placeholder={("ph_payment_notes")}
                                            value={values.payment_notes || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.payment_notes && touched.payment_notes ? <ErrLabel>{errors.payment_notes}</ErrLabel> : null
                                        }
                                    </Flex>
                                </Flex> 
                                <CardHeaderButton top="10px">
                                    <AlertButton
                                        type="reset"
                                        onClick={resetForm}
                                    >
                                        {("Reset")}
                                    </AlertButton>
                                    <PrimaryButton
                                        type="submit"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid) || disabled}
                                    >
                                        {("Submit")}
                                    </PrimaryButton>
                                </CardHeaderButton> 
                            </form>

                        </div>
                    );
                }}
            </Formik>


        </Modal>
    </>
    );
};
