
import { useDispatch, useSelector } from "react-redux";
import { deleteInvPayment } from "./inv_payment_Slice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";

export const InvPaymentDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const invpayment = useSelector((state) => state.invpayment);
    const [disabled, set_disabled] = useState(false);

    function deletePayment(e) {
        e.preventDefault();
        dispatch(deleteInvPayment(data));
        set_disabled(true);
    }

    useEffect(() => {
        if (invpayment.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 4000);
        }  
    }, [invpayment.addUpdateLoading]);



    return <Modal  title={t("delete_payment_info")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         <Flex row ="row">
            <Flex md={12}>  {t("del_msg")}</Flex>
        </Flex>
        <CardHeaderButton>
             <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("cancel")}
            </SecondaryButton>
            <AlertButton onClick={deletePayment} disabled={disabled}>
            {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}