import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deletesmsconfigdata } from "./smsConfig_slice";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { useEffect } from "react";
import { Flex } from "../../component/style/styled_flex";



export const SMSConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const smsConfig = useSelector((state) => state.smsconfigdata);
    const { t, i18n } = useTranslation();
    function deleteSMSConfig(e) {
        e.preventDefault();
        dispatch(deletesmsconfigdata(data)); 
    }

    useEffect(() => {
        if (smsConfig.addUpdateLoading == "succeeded") {
            setTimeout(() => {setOpen(false);}, 4000);
        }  
    }, [smsConfig.addUpdateLoading]);

    return <Modal   title={t("del_sms_config")} xs={4} open={open} onClose={() => {setOpen(false); }} outsideclick>
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
            <AlertButton onClick={deleteSMSConfig}>
            {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}