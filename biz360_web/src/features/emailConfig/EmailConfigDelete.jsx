
import { useDispatch, useSelector } from "react-redux";
import { deleteEmailConfig } from "./email_config_slice";
import { useTranslation } from "react-i18next";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { useEffect } from "react";



export const EmailConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const emailConfig = useSelector((state) => state.emailconfigdata);

    useEffect(() => {
        if (emailConfig.addUpdateLoading == "succeeded") {
            setTimeout(() => {setOpen(false);}, 4000);
        }  
    }, [emailConfig.addUpdateLoading]);

    function deleteEmail(e) {
        e.preventDefault();
        dispatch(deleteEmailConfig(data)); 
    }
    return <Modal  title={t("del_email_config")} xs={4} open={open} onClose={() => {
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
            <AlertButton onClick={deleteEmail}>
            {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}