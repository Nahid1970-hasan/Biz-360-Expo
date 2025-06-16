
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { useEffect } from "react";
import {  DeleteFaqGroup } from "./faq_Slice";

export const FaqGroupDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const faqData = useSelector((state) => state.faqData);

    useEffect(() => {
        if (faqData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [faqData.addUpdateLoading]);

    function deletedata(e) {
        e.preventDefault();
        dispatch(DeleteFaqGroup(data));
    }
    return <Modal title={t("del_faq_group")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
        <Flex row="row">
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
            <AlertButton onClick={deletedata}>
                {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}