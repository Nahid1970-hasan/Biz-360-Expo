
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { numberWithCommas, PaySTATUSLIST } from "../../utils/helper";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Typography } from "../../component/style/styled_typography";
import { SizeBox } from "../../component/style/styled_sizebox";
import { updatePaymentLookup } from "./payment_lookup_Slice";

export const UpdatePaymentStatusModal = ({ open, setOpen = () => { }, data }) => {
    const paymentData = useSelector((state) => state.paymentLookup);
    const userD = useSelector((state) => state.user);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState({
        status: "",
    });
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData({ status: data?.payment_status || "" })
    }, [data]);

    const validate = (values) => {
        let errors = {};
        if (!values.status) {
            errors.status = t("err_status");
        }
        return errors;
    };

    const submitForm = () => {
        var datad = {
            "payment_id": data.payment_id,
            "fullname": userD.fullname,
            "invoice_no": data.invoice_no,
            "payment_status": "Approved",
            "amount": data.amount
        };
        dispatch(updatePaymentLookup(datad));
        set_disabled(true)
    };


    useEffect(() => {
        if (paymentData.addUpdateLoading == "succeeded") { 
            setTimeout(() => { set_disabled(false), setOpen(false); }, 4000);
        } else if (paymentData.addUpdateLoading == "failed") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [paymentData.addUpdateLoading]);


    return (
        <>
            <Modal
                md={4}
                sm={8}
                xs={11}
                title={t("update_payment_info")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex row="row">
                    <Flex md={12}>  {t("inv_approval_msg")}</Flex>
                </Flex>
                <CardHeaderButton>
                    <SecondaryButton
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        {t("cancel")}
                    </SecondaryButton>
                    <PrimaryButton
                        className={disabled ? "disabled-btn" : ""}
                        disabled={disabled}
                        onClick={()=>{submitForm()}}
                    >
                        {t("approve")}
                    </PrimaryButton>
                </CardHeaderButton>
            </Modal>
        </>
    );
};
