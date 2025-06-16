
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Formik } from "formik";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { formatGridDate, numberWithCommas, PaySTATUSLIST } from "../../utils/helper";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Typography } from "../../component/style/styled_typography";
import { SizeBox } from "../../component/style/styled_sizebox";
import { updatePaymentLookup } from "./payment_lookup_Slice";
import { Chip } from "../../component/Chip";

export const PaymentViewDataModalPage = ({ open, setOpen = () => { }, data }) => {
    const paymentData = useSelector((state) => state.paymentLookup);
    const userD = useSelector((state) => state.user);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(data)
    }, [data]);

    return (
        <>
            <Modal
                md={6}
                sm={8}
                xs={11}
                title={t("view_payment_info")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex row="row">
                    <Flex md={6} sm={6} xs={12} padding={"0 !important"}>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("invoice_for")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{data.invoice_for || ""}</Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("invoice_no")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{data.invoice_no || ""}</Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("account_no")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{data.account_no || ""}</Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("amount")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{numberWithCommas(data.amount || "0")} {t("tk")}</Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("payment_date")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{data.payment_date?formatGridDate(data.payment_date):""}</Typography>
                            </Flex>
                        </Flex>
                    </Flex>
                     <Flex md={6} sm={6} xs={12} padding={"0 !important"}>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("status")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                 <Chip label={data.payment_status||""} color={data.payment_status=="Approved"?"success":"error"} />
                              </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("update_by")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{data.approved_by || ""}</Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={5} sm={4} xs={4} padding="0">
                                <InlineFlex>
                                    <Label margin="0" >
                                        {t("update_date")}
                                    </Label>
                                    {":"}
                                </InlineFlex>
                            </Flex>
                            <Flex md={7} sm={8} xs={8} padding="0">
                                <Typography fntweight="bold" txtalign="left" fntsize="bodySubtitleFontSize">{data.approved_date?formatGridDate(data.approved_date||""):""}</Typography>
                            </Flex>
                        </Flex>
                        
                    </Flex>
                </Flex>

            </Modal>
        </>
    );
};
