import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { useEffect } from "react";
import { deleteTimeSetup } from "./ad_time_setup_slice";

 

export const ADTimeDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const adtimedata = useSelector((state) => state.adtimedata);

    useEffect(() => {
        if (adtimedata.addUpdateLoading == "succeeded") { 
            setTimeout(() => {setOpen(false);}, 3000);
        }  
    }, [adtimedata.addUpdateLoading]);

    
    function deleteItem(e) {
        e.preventDefault(); 
        dispatch(deleteTimeSetup(data)); 
    }
    return <Modal  title={t("del_time")} xs={4} open={open} onClose={() => {
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
            <AlertButton onClick={deleteItem}>
            {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}