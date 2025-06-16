import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import { Typography } from "../../component/style/styled_typography";
import { Label } from "../../component/style/styled_label";
import { formatGridDate, numberWithCommas } from "../../utils/helper";
import { Chip } from "../../component/Chip";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { t } from "i18next";


export const InvPaymentViewModal = ({ open, setOpen = () => { }, data }) => {
    
    return <Modal title={t("view_payment_info")} md={6} sm={8} xs={11} open={open} onClose={() => {
        setOpen(false);
    }}>
        <Flex row="row">
            <Flex md={6} sm={6} xs={12} padding="0">
                <Typography txtalign="left" fntsize="bodyTitleFontSize"> {t("package")} {":"} {data?.sn_name_value || "---"}</Typography>
            </Flex>
            <Flex md={6} sm={6} xs={12} padding="0">
                <InlineDiv justifycontent="start"><Typography txtalign="left" fntsize="bodyTitleFontSize"> {t("status")} {":"}</Typography>
                <Chip label={data.status} color={(data?.status == "Paid"||data?.status == "Approved") ? "success" : "error"} /></InlineDiv>
            </Flex>
        </Flex>
        <Flex row="row">
            <Flex md={6} sm={6} xs={12}> 
                <Typography txtalign="left">{t("invoice_no")} {":"} {data.invoice_no || "---"}</Typography> 
                <Typography txtalign="left">{t("invoice_date")} {":"} {data.invoice_date? formatGridDate(data?.invoice_date): "---"}</Typography> 
                <Typography txtalign="left">{t("amount")} {":"} {t("tk")} {numberWithCommas(data?.net_amount||0) || "---"}</Typography> 
                <Typography txtalign="left">{t("due_amount")} {":"} {t("tk")} {numberWithCommas(data?.due_amount||0) || "---"}</Typography>

            </Flex>
            <Flex md={6} sm={6} xs={12}> 
                <Typography txtalign="left">{t("payment_method")} {":"} {data.payment_method || "---"}</Typography> 
                <Typography txtalign="left">{t("account_no")} {":"} {data.account_no || "---"}</Typography> 
                <Typography txtalign="left">{t("paid_amount")} {":"} {t("tk")}  {numberWithCommas(data?.paid_amount||0) || "---"}</Typography> 
                <Typography txtalign="left">{t("payment_date")} {":"}  {data?.payment_date ? formatGridDate(data.payment_date) : "---"}</Typography>
                <Typography txtalign="left">{t("transaction_id")}{":"} {data.transaction_no || "---"}</Typography>
            </Flex>
            <Flex padding="0 10px !important" md={11.99} sm={12} xs={12}> 
                <Typography txtalign="left" ><p>{t("payment_note")} {":"}</p> {data.payment_notes || "---"}</Typography>
            </Flex>
        </Flex>
        
    </Modal>
}